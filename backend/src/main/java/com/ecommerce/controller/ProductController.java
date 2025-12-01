package com.ecommerce.controller;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.getProductsByCategory(category));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> searchProducts(@RequestParam String keyword) {
        return ResponseEntity.ok(productService.searchProducts(keyword));
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
        return ResponseEntity.status(201).body(productService.createProduct(productDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(productService.updateProduct(id, productDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pending")
    public ResponseEntity<List<ProductDTO>> getPendingProducts() {
        return ResponseEntity.ok(productService.getPendingProducts());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<ProductDTO> approveProduct(
            @PathVariable Long id,
            @RequestParam Long adminId) {
        return ResponseEntity.ok(productService.approveProduct(id, adminId));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<ProductDTO> rejectProduct(
            @PathVariable Long id,
            @RequestParam Long adminId) {
        return ResponseEntity.ok(productService.rejectProduct(id, adminId));
    }
}
