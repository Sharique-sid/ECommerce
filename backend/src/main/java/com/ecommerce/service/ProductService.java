package com.ecommerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.entity.Product;
import com.ecommerce.repository.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    private final ProductRepository productRepository;
    private final RecommendationService recommendationService;

    public List<ProductDTO> getAllProducts() {
        // Only show approved products to customers
        return productRepository.findAll()
                .stream()
                .filter(p -> p.getApprovalStatus() == null || 
                           p.getApprovalStatus() == Product.ProductApprovalStatus.APPROVED)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return convertToDTO(product);
    }

    public List<ProductDTO> getProductsByCategory(String category) {
        return productRepository.findByCategory(category)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getTopRatedProducts() {
        return productRepository.findTopRatedProducts()
                .stream()
                .limit(10)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getRecommendedProducts(Long userId) {
        return recommendationService.getRecommendedProducts(userId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setQuantity(productDTO.getQuantity());
        product.setCategory(productDTO.getCategory());
        product.setBrand(productDTO.getBrand());
        product.setImageUrl(productDTO.getImageUrl());
        product.setRating(productDTO.getRating() != null ? productDTO.getRating() : 0.0);
        product.setReviewCount(productDTO.getReviewCount() != null ? productDTO.getReviewCount() : 0);
        
        // Set seller ID if provided (for seller-listed products)
        if (productDTO.getSellerId() != null) {
            product.setSellerId(productDTO.getSellerId());
            product.setApprovalStatus(Product.ProductApprovalStatus.PENDING);
        } else {
            // Admin-added products are auto-approved
            product.setApprovalStatus(Product.ProductApprovalStatus.APPROVED);
        }

        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setQuantity(productDTO.getQuantity());
        product.setCategory(productDTO.getCategory());
        product.setBrand(productDTO.getBrand());
        product.setImageUrl(productDTO.getImageUrl());

        Product updatedProduct = productRepository.save(product);
        return convertToDTO(updatedProduct);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<ProductDTO> getPendingProducts() {
        return productRepository.findByApprovalStatus(Product.ProductApprovalStatus.PENDING)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO approveProduct(Long productId, Long adminId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        product.setApprovalStatus(Product.ProductApprovalStatus.APPROVED);
        product.setApprovedBy(adminId);
        product.setApprovedAt(java.time.LocalDateTime.now());
        
        Product saved = productRepository.save(product);
        return convertToDTO(saved);
    }

    public ProductDTO rejectProduct(Long productId, Long adminId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        product.setApprovalStatus(Product.ProductApprovalStatus.REJECTED);
        product.setApprovedBy(adminId);
        product.setApprovedAt(java.time.LocalDateTime.now());
        
        Product saved = productRepository.save(product);
        return convertToDTO(saved);
    }

    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO(
            product.getId(),
            product.getName(),
            product.getDescription(),
            product.getPrice(),
            product.getQuantity(),
            product.getCategory(),
            product.getBrand(),
            product.getImageUrl(),
            product.getRating(),
            product.getReviewCount(),
            product.getAiRecommendationScore()
        );
        dto.setSellerId(product.getSellerId());
        if (product.getApprovalStatus() != null) {
            dto.setApprovalStatus(product.getApprovalStatus().name());
        }
        return dto;
    }
}
