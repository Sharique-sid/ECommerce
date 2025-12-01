package com.ecommerce.repository;

import com.ecommerce.entity.SellerApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SellerApplicationRepository extends JpaRepository<SellerApplication, Long> {
    Optional<SellerApplication> findByUserId(Long userId);
    List<SellerApplication> findByStatus(SellerApplication.ApplicationStatus status);
    boolean existsByUserId(Long userId);
}

