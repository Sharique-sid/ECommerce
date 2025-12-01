package com.ecommerce.controller;

import com.ecommerce.dto.SellerApplicationDTO;
import com.ecommerce.service.SellerApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seller-applications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class SellerApplicationController {
    private final SellerApplicationService applicationService;

    @PostMapping
    public ResponseEntity<SellerApplicationDTO> createApplication(
            @RequestParam Long userId,
            @RequestBody SellerApplicationDTO dto) {
        return ResponseEntity.ok(applicationService.createApplication(userId, dto));
    }

    @GetMapping
    public ResponseEntity<List<SellerApplicationDTO>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<SellerApplicationDTO>> getPendingApplications() {
        return ResponseEntity.ok(applicationService.getPendingApplications());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<SellerApplicationDTO> approveApplication(
            @PathVariable Long id,
            @RequestParam Long adminId,
            @RequestParam(required = false) String notes) {
        return ResponseEntity.ok(applicationService.approveApplication(id, adminId, notes));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<SellerApplicationDTO> rejectApplication(
            @PathVariable Long id,
            @RequestParam Long adminId,
            @RequestParam(required = false) String notes) {
        return ResponseEntity.ok(applicationService.rejectApplication(id, adminId, notes));
    }
}

