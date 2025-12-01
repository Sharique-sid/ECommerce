package com.ecommerce.repository;

import com.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByBrand(String brand);
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByApprovalStatus(Product.ProductApprovalStatus status);
    List<Product> findBySellerId(Long sellerId);
    
    @Query("SELECT p FROM Product p WHERE p.quantity > 0 AND p.approvalStatus = 'APPROVED' ORDER BY p.rating DESC")
    List<Product> findTopRatedProducts();
}
