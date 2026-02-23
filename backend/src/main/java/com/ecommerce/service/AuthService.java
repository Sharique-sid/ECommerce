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
    private final com.ecommerce.repository.PasswordResetTokenRepository tokenRepository;
    private final EmailService emailService;

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
                user.getRole());
    }

    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = java.util.UUID.randomUUID().toString();

        com.ecommerce.entity.PasswordResetToken resetToken = new com.ecommerce.entity.PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(java.time.LocalDateTime.now().plusHours(24));

        // Remove existing token if any
        tokenRepository.findByUser(user).ifPresent(tokenRepository::delete);

        tokenRepository.save(resetToken);

        String resetLink = "http://localhost:3000/reset-password/" + token;
        String emailBody = "To reset your password, click the link below:\n" + resetLink;

        emailService.sendEmail(user.getEmail(), "Password Reset Request", emailBody);
    }

    public void resetPassword(String token, String newPassword) {
        com.ecommerce.entity.PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (resetToken.isExpired()) {
            throw new RuntimeException("Token expired");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        tokenRepository.delete(resetToken);
    }
}
