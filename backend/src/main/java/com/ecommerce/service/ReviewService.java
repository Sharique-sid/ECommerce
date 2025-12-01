package com.ecommerce.service;

import com.ecommerce.entity.Review;
import com.ecommerce.entity.Product;
import com.ecommerce.repository.ReviewRepository;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    public Review addReview(Review review) {
        Review savedReview = reviewRepository.save(review);
        
        // Update product rating
        updateProductRating(review.getProduct().getId());
        log.info("Review added for product: {}", review.getProduct().getId());
        return savedReview;
    }

    public List<Review> getProductReviews(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    public List<Review> getUserReviews(Long userId) {
        return reviewRepository.findByUserId(userId);
    }

    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        reviewRepository.deleteById(reviewId);
        updateProductRating(review.getProduct().getId());
    }

    private void updateProductRating(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        List<Review> reviews = reviewRepository.findByProductId(productId);
        
        if (reviews.isEmpty()) {
            product.setRating(0.0);
            product.setReviewCount(0);
        } else {
            double averageRating = reviews.stream()
                    .mapToInt(Review::getRating)
                    .average()
                    .orElse(0.0);
            
            product.setRating(averageRating);
            product.setReviewCount(reviews.size());
        }
        
        productRepository.save(product);
    }
}
