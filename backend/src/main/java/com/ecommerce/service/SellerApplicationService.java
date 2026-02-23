package com.ecommerce.service;

import com.ecommerce.dto.SellerApplicationDTO;
import com.ecommerce.entity.SellerApplication;
import com.ecommerce.entity.User;
import com.ecommerce.entity.UserRole;
import com.ecommerce.repository.SellerApplicationRepository;
import com.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SellerApplicationService {
    private final SellerApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    public SellerApplicationDTO createApplication(Long userId, SellerApplicationDTO dto) {
        // Check if user already has an application
        if (applicationRepository.existsByUserId(userId)) {
            throw new RuntimeException("You already have a pending seller application");
        }

        SellerApplication application = SellerApplication.builder()
                .userId(userId)
                .businessName(dto.getBusinessName())
                .businessType(dto.getBusinessType())
                .gstNumber(dto.getGstNumber())
                .businessAddress(dto.getBusinessAddress())
                .status(SellerApplication.ApplicationStatus.PENDING)
                .build();

        SellerApplication saved = applicationRepository.save(application);
        return convertToDTO(saved);
    }

    public List<SellerApplicationDTO> getAllApplications() {
        return applicationRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<SellerApplicationDTO> getPendingApplications() {
        return applicationRepository.findByStatus(SellerApplication.ApplicationStatus.PENDING).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public SellerApplicationDTO approveApplication(Long applicationId, Long adminId, String notes) {
        SellerApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(SellerApplication.ApplicationStatus.APPROVED);
        application.setAdminNotes(notes);

        // Update user role to SELLER
        User user = userRepository.findById(application.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(UserRole.SELLER);
        userRepository.save(user);

        SellerApplication saved = applicationRepository.save(application);
        return convertToDTO(saved);
    }

    @Transactional
    public SellerApplicationDTO rejectApplication(Long applicationId, Long adminId, String notes) {
        SellerApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(SellerApplication.ApplicationStatus.REJECTED);
        application.setAdminNotes(notes);

        SellerApplication saved = applicationRepository.save(application);
        return convertToDTO(saved);
    }

    private SellerApplicationDTO convertToDTO(SellerApplication application) {
        return SellerApplicationDTO.builder()
                .id(application.getId())
                .userId(application.getUserId())
                .businessName(application.getBusinessName())
                .businessType(application.getBusinessType())
                .gstNumber(application.getGstNumber())
                .businessAddress(application.getBusinessAddress())
                .status(application.getStatus())
                .adminNotes(application.getAdminNotes())
                .createdAt(application.getCreatedAt())
                .updatedAt(application.getUpdatedAt())
                .build();
    }
}

