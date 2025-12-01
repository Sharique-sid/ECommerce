package com.ecommerce.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@SuppressWarnings("unused")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String brand;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    @Column(nullable = false)
    private Double rating;

    @Column(nullable = false)
    private Integer reviewCount;

    @Column(name = "ai_recommendation_score")
    private Double aiRecommendationScore;

    @Column(name = "seller_id")
    private Long sellerId;

    @Enumerated(EnumType.STRING)
    @Column(name = "approval_status")
    private ProductApprovalStatus approvalStatus;

    @Column(name = "approved_by")
    private Long approvedBy;

    @Column(name = "approved_at")
    private LocalDateTime approvedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.approvalStatus == null) {
            // If sellerId is set, product needs approval, otherwise auto-approved (admin added)
            this.approvalStatus = this.sellerId != null ? ProductApprovalStatus.PENDING : ProductApprovalStatus.APPROVED;
        }
    }

    public enum ProductApprovalStatus {
        PENDING, APPROVED, REJECTED
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Explicit constructors, getters and setters to avoid Lombok dependency for IDE diagnostics
    public Product() {
        this.orderItems = new ArrayList<>();
        this.reviews = new ArrayList<>();
    }

    public Product(Long id, String name, String description, BigDecimal price, Integer quantity, String category, String brand, String imageUrl, Double rating, Integer reviewCount, Double aiRecommendationScore, LocalDateTime createdAt, LocalDateTime updatedAt, List<OrderItem> orderItems, List<Review> reviews) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.category = category;
        this.brand = brand;
        this.imageUrl = imageUrl;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.aiRecommendationScore = aiRecommendationScore;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.orderItems = orderItems != null ? orderItems : new ArrayList<>();
        this.reviews = reviews != null ? reviews : new ArrayList<>();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }
    public Double getAiRecommendationScore() { return aiRecommendationScore; }
    public void setAiRecommendationScore(Double aiRecommendationScore) { this.aiRecommendationScore = aiRecommendationScore; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public List<OrderItem> getOrderItems() { return orderItems; }
    public void setOrderItems(List<OrderItem> orderItems) { this.orderItems = orderItems; }
    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }
    public Long getSellerId() { return sellerId; }
    public void setSellerId(Long sellerId) { this.sellerId = sellerId; }
    public ProductApprovalStatus getApprovalStatus() { return approvalStatus; }
    public void setApprovalStatus(ProductApprovalStatus approvalStatus) { this.approvalStatus = approvalStatus; }
    public Long getApprovedBy() { return approvedBy; }
    public void setApprovedBy(Long approvedBy) { this.approvedBy = approvedBy; }
    public LocalDateTime getApprovedAt() { return approvedAt; }
    public void setApprovedAt(LocalDateTime approvedAt) { this.approvedAt = approvedAt; }
}
