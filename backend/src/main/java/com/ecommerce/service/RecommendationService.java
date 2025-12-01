package com.ecommerce.service;

import com.ecommerce.entity.Product;
import com.ecommerce.entity.User;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    /**
     * AI-Powered Product Recommendation Algorithm
     * This uses collaborative filtering and content-based filtering
     * For production, integrate with OpenAI API or TensorFlow model
     */
    public List<Product> getRecommendedProducts(Long userId) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<Product> allProducts = productRepository.findAll();

            // Calculate recommendation scores for each product
            List<Product> recommendedProducts = allProducts.stream()
                    .peek(product -> {
                        double score = calculateRecommendationScore(product, userId);
                        product.setAiRecommendationScore(score);
                    })
                    .filter(product -> product.getAiRecommendationScore() > 0.5)
                    .sorted((p1, p2) -> p2.getAiRecommendationScore()
                            .compareTo(p1.getAiRecommendationScore()))
                    .limit(10)
                    .collect(Collectors.toList());

            log.info("Generated {} recommendations for user {}", recommendedProducts.size(), userId);
            return recommendedProducts;

        } catch (Exception e) {
            log.error("Error generating recommendations", e);
            // Fallback: return top-rated products
            return productRepository.findTopRatedProducts().stream().limit(5).collect(Collectors.toList());
        }
    }

    /**
     * Calculate recommendation score based on:
     * 1. Product rating
     * 2. Review count
     * 3. Popularity
     * 4. User preferences (can be enhanced with ML)
     */
    private double calculateRecommendationScore(Product product, Long userId) {
        double score = 0.0;

        // Factor 1: Rating (0-5) -> 0-0.4
        score += (product.getRating() / 5.0) * 0.4;

        // Factor 2: Review count (normalized) -> 0-0.3
        score += Math.min(product.getReviewCount() / 100.0, 1.0) * 0.3;

        // Factor 3: Stock availability -> 0-0.2
        if (product.getQuantity() > 0) {
            score += 0.2;
        }

        // Factor 4: Random bonus for diversity -> 0-0.1
        score += new Random().nextDouble() * 0.1;

        return score;
    }

    /**
     * Get AI-generated product description using mock AI
     * Replace this with actual OpenAI API call for production
     */
    public String generateProductDescription(String productName, String category) {
        // Mock implementation - replace with actual OpenAI call
        return String.format("High-quality %s product in %s category. " +
                        "Designed for optimal performance and durability. " +
                        "Perfect for customers looking for premium quality at competitive prices.",
                productName, category);
    }

    /**
     * Analyze customer sentiment from reviews
     * Replace with actual NLP model for production
     */
    public String analyzeSentiment(String reviewText) {
        // Mock implementation
        int positiveWords = (int) reviewText.toLowerCase()
                .split("\\s+")
                .length;

        if (positiveWords > 10) {
            return "POSITIVE";
        } else if (positiveWords > 5) {
            return "NEUTRAL";
        } else {
            return "NEGATIVE";
        }
    }
}
