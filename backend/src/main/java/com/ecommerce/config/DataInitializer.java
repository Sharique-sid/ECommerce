package com.ecommerce.config;

import com.ecommerce.entity.Product;
import com.ecommerce.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(ProductRepository productRepository) {
        return args -> {
            if (productRepository.count() == 0) {
                List<Product> products = Arrays.asList(
                    createProduct("iPhone 15 Pro Max", "Latest Apple smartphone with A17 Pro chip, titanium design, and advanced camera system", 
                        new BigDecimal("1199.99"), 50, "Electronics", "Apple", 
                        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500", 4.8, 2450),
                    
                    createProduct("Samsung Galaxy S24 Ultra", "Premium Android smartphone with AI features, S Pen, and 200MP camera", 
                        new BigDecimal("1099.99"), 45, "Electronics", "Samsung", 
                        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500", 4.7, 1890),
                    
                    createProduct("Sony WH-1000XM5", "Industry-leading noise canceling wireless headphones with exceptional sound quality", 
                        new BigDecimal("349.99"), 100, "Electronics", "Sony", 
                        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500", 4.9, 3200),
                    
                    createProduct("MacBook Pro 16-inch M3", "Powerful laptop with M3 Pro chip, stunning Liquid Retina XDR display", 
                        new BigDecimal("2499.99"), 30, "Electronics", "Apple", 
                        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500", 4.9, 1560),
                    
                    createProduct("Nike Air Max 270", "Comfortable lifestyle sneakers with Max Air unit for all-day cushioning", 
                        new BigDecimal("149.99"), 200, "Fashion", "Nike", 
                        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", 4.5, 4500),
                    
                    createProduct("Levi's 501 Original Jeans", "Classic straight fit jeans with authentic vintage style", 
                        new BigDecimal("79.99"), 150, "Fashion", "Levi's", 
                        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500", 4.4, 2800),
                    
                    createProduct("Ray-Ban Aviator Classic", "Iconic sunglasses with gold metal frame and green G-15 lenses", 
                        new BigDecimal("169.99"), 80, "Accessories", "Ray-Ban", 
                        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500", 4.6, 1950),
                    
                    createProduct("Dyson V15 Detect", "Advanced cordless vacuum with laser dust detection technology", 
                        new BigDecimal("749.99"), 40, "Home", "Dyson", 
                        "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500", 4.7, 890),
                    
                    createProduct("Instant Pot Duo Plus", "9-in-1 electric pressure cooker for fast and easy meals", 
                        new BigDecimal("119.99"), 120, "Home", "Instant Pot", 
                        "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500", 4.8, 5600),
                    
                    createProduct("Kindle Paperwhite", "Waterproof e-reader with 6.8-inch display and adjustable warm light", 
                        new BigDecimal("139.99"), 90, "Electronics", "Amazon", 
                        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500", 4.6, 7800),
                    
                    createProduct("Adidas Ultraboost 23", "Premium running shoes with responsive BOOST midsole", 
                        new BigDecimal("189.99"), 85, "Fashion", "Adidas", 
                        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500", 4.7, 3400),
                    
                    createProduct("JBL Flip 6", "Portable Bluetooth speaker with powerful sound and IP67 waterproof rating", 
                        new BigDecimal("129.99"), 150, "Electronics", "JBL", 
                        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500", 4.5, 2100),
                    
                    createProduct("Fitbit Charge 6", "Advanced fitness tracker with built-in GPS and heart rate monitoring", 
                        new BigDecimal("159.99"), 70, "Electronics", "Fitbit", 
                        "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500", 4.4, 1650),
                    
                    createProduct("The North Face Puffer Jacket", "Warm and lightweight insulated jacket for cold weather", 
                        new BigDecimal("249.99"), 60, "Fashion", "The North Face", 
                        "https://images.unsplash.com/photo-1544923246-77307dd628b8?w=500", 4.6, 980),
                    
                    createProduct("Philips Hue Starter Kit", "Smart LED bulbs with millions of colors and voice control", 
                        new BigDecimal("199.99"), 55, "Home", "Philips", 
                        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500", 4.5, 1420),
                    
                    createProduct("Logitech MX Master 3S", "Advanced wireless mouse with ultra-fast scrolling and ergonomic design", 
                        new BigDecimal("99.99"), 110, "Accessories", "Logitech", 
                        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500", 4.8, 2890),
                    
                    createProduct("Nintendo Switch OLED", "Gaming console with vibrant 7-inch OLED screen", 
                        new BigDecimal("349.99"), 40, "Electronics", "Nintendo", 
                        "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500", 4.9, 4200),
                    
                    createProduct("Nespresso Vertuo Next", "Premium coffee machine for espresso and regular coffee", 
                        new BigDecimal("179.99"), 65, "Home", "Nespresso", 
                        "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500", 4.3, 1890),
                    
                    createProduct("Apple Watch Series 9", "Advanced smartwatch with health monitoring and fitness tracking", 
                        new BigDecimal("399.99"), 75, "Electronics", "Apple", 
                        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500", 4.7, 3560),
                    
                    createProduct("Bose QuietComfort Earbuds II", "True wireless earbuds with world-class noise cancellation", 
                        new BigDecimal("279.99"), 95, "Electronics", "Bose", 
                        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500", 4.6, 1780)
                );
                
                productRepository.saveAll(products);
                System.out.println("✅ Database initialized with " + products.size() + " sample products");
            }
        };
    }
    
    private Product createProduct(String name, String description, BigDecimal price, 
            int quantity, String category, String brand, String imageUrl, double rating, int reviewCount) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setQuantity(quantity);
        product.setCategory(category);
        product.setBrand(brand);
        product.setImageUrl(imageUrl);
        product.setRating(rating);
        product.setReviewCount(reviewCount);
        return product;
    }
}

