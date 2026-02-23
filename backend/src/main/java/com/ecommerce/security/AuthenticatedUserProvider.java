package com.ecommerce.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.ecommerce.entity.User;

@Component
public class AuthenticatedUserProvider {

    /**
     * Get the currently authenticated user from the security context.
     * @return the authenticated User, or null if not authenticated
     */
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        
        Object principal = authentication.getPrincipal();
        
        if (principal instanceof UserPrincipal) {
            return ((UserPrincipal) principal).getUser();
        }
        
        return null;
    }

    /**
     * Get the currently authenticated user's ID.
     * @return the user ID, or null if not authenticated
     */
    public Long getCurrentUserId() {
        User user = getCurrentUser();
        return user != null ? user.getId() : null;
    }

    /**
     * Check if there is an authenticated user.
     * @return true if authenticated, false otherwise
     */
    public boolean isAuthenticated() {
        return getCurrentUser() != null;
    }
}
