package com.ecommerce.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.ecommerce.dto.SellerApplicationDTO;
import com.ecommerce.security.AuthenticatedUserProvider;
import com.ecommerce.service.SellerApplicationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/seller-applications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class SellerApplicationController {
    private final SellerApplicationService applicationService;
    private final AuthenticatedUserProvider authProvider;

    @PostMapping
    public ResponseEntity<SellerApplicationDTO> createApplication(@RequestBody SellerApplicationDTO dto) {
        // Get userId from JWT token instead of query param
        Long userId = authProvider.getCurrentUserId();
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }
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
            @RequestParam(required = false) String notes) {
        // Get adminId from JWT token instead of query param
        Long adminId = authProvider.getCurrentUserId();
        if (adminId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }
        return ResponseEntity.ok(applicationService.approveApplication(id, adminId, notes));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<SellerApplicationDTO> rejectApplication(
            @PathVariable Long id,
            @RequestParam(required = false) String notes) {
        // Get adminId from JWT token instead of query param
        Long adminId = authProvider.getCurrentUserId();
        if (adminId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }
        return ResponseEntity.ok(applicationService.rejectApplication(id, adminId, notes));
    }
}

