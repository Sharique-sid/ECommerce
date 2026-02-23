package com.ecommerce.repository;

import com.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
    
    // Enhanced search query that searches by name, brand, description, and category
    @Query("SELECT DISTINCT p FROM Product p WHERE " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
           "(p.approvalStatus IS NULL OR p.approvalStatus = 'APPROVED')")
    List<Product> searchProducts(@Param("keyword") String keyword);
    
    // Search for autocomplete suggestions (only name and brand, limited results)
    @Query("SELECT DISTINCT p FROM Product p WHERE " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
           "(p.approvalStatus IS NULL OR p.approvalStatus = 'APPROVED') " +
           "ORDER BY p.name ASC")
    List<Product> findSuggestions(@Param("keyword") String keyword);
}
