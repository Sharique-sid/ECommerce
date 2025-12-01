package com.ecommerce.dto;

import com.ecommerce.entity.SellerApplication;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SellerApplicationDTO {
    private Long id;
    private Long userId;
    private String businessName;
    private String businessType;
    private String gstNumber;
    private String businessAddress;
    private SellerApplication.ApplicationStatus status;
    private String adminNotes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

