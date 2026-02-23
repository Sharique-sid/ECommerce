package com.ecommerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.UserRole;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    private final ProductRepository productRepository;
    private final RecommendationService recommendationService;
    private final UserRepository userRepository;

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
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllProducts();
        }
        // Use enhanced search that searches by name, brand, description, and category
        return productRepository.searchProducts(keyword.trim())
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<ProductDTO> getSearchSuggestions(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return List.of();
        }
        // Get limited suggestions for autocomplete (max 10)
        return productRepository.findSuggestions(keyword.trim())
                .stream()
                .limit(10)
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

    public ProductDTO createProduct(ProductDTO productDTO, Long userId) {
        // Authorization check: require userId and verify user has permission
        if (userId == null) {
            throw new RuntimeException("User authentication required");
        }

        var user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Only ADMIN and SELLER can create products
        if (user.getRole() != UserRole.ADMIN && user.getRole() != UserRole.SELLER) {
            throw new RuntimeException("You do not have permission to create products");
        }

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
            // Verify that the sellerId matches the userId (sellers can only create products for themselves)
            if (user.getRole() == UserRole.SELLER && !productDTO.getSellerId().equals(userId)) {
                throw new RuntimeException("Sellers can only create products for themselves");
            }
            product.setSellerId(productDTO.getSellerId());
            product.setApprovalStatus(Product.ProductApprovalStatus.PENDING);
        } else {
            // Admin-added products are auto-approved
            if (user.getRole() == UserRole.ADMIN) {
                product.setApprovalStatus(Product.ProductApprovalStatus.APPROVED);
            } else {
                // If seller doesn't provide sellerId, set it automatically
                product.setSellerId(userId);
                product.setApprovalStatus(Product.ProductApprovalStatus.PENDING);
            }
        }

        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    public ProductDTO updateProduct(Long id, ProductDTO productDTO, Long userId) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Authorization check: require userId for all operations
        if (userId == null) {
            throw new RuntimeException("User authentication required");
        }

        var user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Sellers can only update their own products, admins can update any product
        if (user.getRole() == UserRole.SELLER) {
            // Check if product belongs to this seller
            if (product.getSellerId() == null || !product.getSellerId().equals(userId)) {
                throw new RuntimeException("You can only update your own products");
            }
        } else if (user.getRole() != UserRole.ADMIN) {
            // Only ADMIN and SELLER roles can update products
            throw new RuntimeException("You do not have permission to update products");
        }
        // ADMIN can update any product, no additional check needed

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

    public void deleteProduct(Long id, Long userId) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Authorization check: require userId for all operations
        if (userId == null) {
            throw new RuntimeException("User authentication required");
        }

        var user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Sellers can only delete their own products, admins can delete any product
        if (user.getRole() == UserRole.SELLER) {
            // Check if product belongs to this seller
            if (product.getSellerId() == null || !product.getSellerId().equals(userId)) {
                throw new RuntimeException("You can only delete your own products");
            }
        } else if (user.getRole() != UserRole.ADMIN) {
            // Only ADMIN and SELLER roles can delete products
            throw new RuntimeException("You do not have permission to delete products");
        }
        // ADMIN can delete any product, no additional check needed

        productRepository.deleteById(id);
    }

    public List<ProductDTO> getPendingProducts(Long userId) {
        // Only ADMIN can see pending products
        if (userId != null) {
            var user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            if (user.getRole() != UserRole.ADMIN) {
                throw new RuntimeException("Only admins can view pending products");
            }
        }
        return productRepository.findByApprovalStatus(Product.ProductApprovalStatus.PENDING)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO approveProduct(Long productId, Long adminId) {
        // Verify admin
        var admin = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        if (admin.getRole() != UserRole.ADMIN) {
            throw new RuntimeException("Only admins can approve products");
        }
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        product.setApprovalStatus(Product.ProductApprovalStatus.APPROVED);
        product.setApprovedBy(adminId);
        product.setApprovedAt(java.time.LocalDateTime.now());
        
        Product saved = productRepository.save(product);
        return convertToDTO(saved);
    }

    public ProductDTO rejectProduct(Long productId, Long adminId) {
        // Verify admin
        var admin = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        if (admin.getRole() != UserRole.ADMIN) {
            throw new RuntimeException("Only admins can reject products");
        }
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        product.setApprovalStatus(Product.ProductApprovalStatus.REJECTED);
        product.setApprovedBy(adminId);
        product.setApprovedAt(java.time.LocalDateTime.now());
        
        Product saved = productRepository.save(product);
        return convertToDTO(saved);
    }

    public List<ProductDTO> getSellerProducts(Long sellerId, Long userId) {
        // Authorization check: sellers can only view their own products, admins can view any seller's products
        if (userId != null) {
            var user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            if (user.getRole() == UserRole.SELLER && !sellerId.equals(userId)) {
                throw new RuntimeException("You can only view your own products");
            }
            // ADMIN can view any seller's products, no additional check needed
        }
        
        return productRepository.findBySellerId(sellerId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
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
