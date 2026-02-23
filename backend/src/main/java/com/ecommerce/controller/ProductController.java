package com.ecommerce.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.security.AuthenticatedUserProvider;
import com.ecommerce.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProductController {
    private final ProductService productService;
    private final AuthenticatedUserProvider authProvider;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok()
                .header("Cache-Control", "no-cache, no-store, must-revalidate")
                .header("Pragma", "no-cache")
                .header("Expires", "0")
                .body(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok()
                .header("Cache-Control", "no-cache, no-store, must-revalidate")
                .header("Pragma", "no-cache")
                .header("Expires", "0")
                .body(productService.getProductById(id));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.getProductsByCategory(category));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> searchProducts(@RequestParam String keyword) {
        return ResponseEntity.ok(productService.searchProducts(keyword));
    }

    @GetMapping("/search/suggestions")
    public ResponseEntity<List<ProductDTO>> getSearchSuggestions(@RequestParam String keyword) {
        return ResponseEntity.ok(productService.getSearchSuggestions(keyword));
    }

    @GetMapping("/trending/top-rated")
    public ResponseEntity<List<ProductDTO>> getTopRatedProducts() {
        return ResponseEntity.ok(productService.getTopRatedProducts());
    }

    @GetMapping("/recommendations/{userId}")
    public ResponseEntity<List<ProductDTO>> getRecommendedProducts(@PathVariable Long userId) {
        return ResponseEntity.ok(productService.getRecommendedProducts(userId));
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        // Get userId from JWT token instead of query param
        Long userId = authProvider.getCurrentUserId();
        if (userId != null && productDTO.getSellerId() == null) {
            productDTO.setSellerId(userId);
        }
        return ResponseEntity.status(201).body(productService.createProduct(productDTO, userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductDTO productDTO) {
        // Get userId from JWT token instead of query param
        Long userId = authProvider.getCurrentUserId();
        return ResponseEntity.ok(productService.updateProduct(id, productDTO, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        // Get userId from JWT token instead of query param
        Long userId = authProvider.getCurrentUserId();
        productService.deleteProduct(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<ProductDTO>> getSellerProducts(@PathVariable Long sellerId) {
        // Get userId from JWT token for authorization
        Long userId = authProvider.getCurrentUserId();
        return ResponseEntity.ok(productService.getSellerProducts(sellerId, userId));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<ProductDTO>> getPendingProducts() {
        // Get userId from JWT token - only ADMIN can see pending products
        Long userId = authProvider.getCurrentUserId();
        return ResponseEntity.ok(productService.getPendingProducts(userId));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<ProductDTO> approveProduct(@PathVariable Long id) {
        // Get adminId from JWT token instead of query param
        Long adminId = authProvider.getCurrentUserId();
        return ResponseEntity.ok(productService.approveProduct(id, adminId));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<ProductDTO> rejectProduct(@PathVariable Long id) {
        // Get adminId from JWT token instead of query param
        Long adminId = authProvider.getCurrentUserId();
        return ResponseEntity.ok(productService.rejectProduct(id, adminId));
    }
}
