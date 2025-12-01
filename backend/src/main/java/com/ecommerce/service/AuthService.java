package com.ecommerce.service;

import com.ecommerce.dto.LoginRequest;
import com.ecommerce.dto.LoginResponse;
import com.ecommerce.dto.UserDTO;
import com.ecommerce.entity.User;
import com.ecommerce.entity.UserRole;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtTokenProvider.generateToken(user.getEmail());
        return LoginResponse.builder()
                .token(token)
                .user(convertToDTO(user))
                .build();
    }

    public LoginResponse register(UserDTO userDTO, String password) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        // Check phone number if provided
        if (userDTO.getPhoneNumber() != null && !userDTO.getPhoneNumber().isEmpty()) {
            if (userRepository.existsByPhoneNumber(userDTO.getPhoneNumber())) {
                throw new RuntimeException("Phone number already registered");
            }
        }

        // Handle optional fields with defaults
        String firstName = userDTO.getFirstName();
        String lastName = userDTO.getLastName();
        
        // If firstName is empty but we have a full name, split it
        if ((firstName == null || firstName.isEmpty()) && userDTO.getEmail() != null) {
            String namePart = userDTO.getEmail().split("@")[0];
            firstName = namePart;
            lastName = "";
        }

        User user = User.builder()
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(password))
                .firstName(firstName != null ? firstName : "")
                .lastName(lastName != null ? lastName : "")
                .phoneNumber(userDTO.getPhoneNumber() != null ? userDTO.getPhoneNumber() : "")
                .address(userDTO.getAddress() != null ? userDTO.getAddress() : "")
                .city(userDTO.getCity() != null ? userDTO.getCity() : "Delhi")
                .postalCode(userDTO.getPostalCode() != null ? userDTO.getPostalCode() : "")
                .country(userDTO.getCountry() != null ? userDTO.getCountry() : "India")
                .role(UserRole.CUSTOMER)
                .build();

        User savedUser = userRepository.save(user);
        String token = jwtTokenProvider.generateToken(savedUser.getEmail());

        return LoginResponse.builder()
                .token(token)
                .user(convertToDTO(savedUser))
                .build();
    }

    private UserDTO convertToDTO(User user) {
        return new UserDTO(
            user.getId(),
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getPhoneNumber(),
            user.getAddress(),
            user.getCity(),
            user.getPostalCode(),
            user.getCountry(),
            user.getRole()
        );
    }
}
