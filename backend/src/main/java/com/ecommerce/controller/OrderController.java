package com.ecommerce.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
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
import org.springframework.web.server.ResponseStatusException;

import com.ecommerce.dto.OrderDTO;
import com.ecommerce.dto.OrderItemDTO;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.OrderItem;
import com.ecommerce.entity.OrderStatus;
import com.ecommerce.entity.User;
import com.ecommerce.entity.UserRole;
import com.ecommerce.security.AuthenticatedUserProvider;
import com.ecommerce.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrderController {

    private final OrderService orderService;
    private final AuthenticatedUserProvider authProvider;

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO orderDTO) {
        User currentUser = authProvider.getCurrentUser();
        if (currentUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }

        Order order = new Order();
        order.setUser(currentUser);
        order.setTotalAmount(orderDTO.getTotalAmount());
        order.setTaxAmount(orderDTO.getTaxAmount());
        order.setShippingCost(orderDTO.getShippingCost());
        order.setShippingAddress(orderDTO.getShippingAddress());
        order.setPaymentMethod(orderDTO.getPaymentMethod());

        Order savedOrder = orderService.createOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedOrder));
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getMyOrders() {
        User currentUser = authProvider.getCurrentUser();
        if (currentUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }

        List<Order> orders = orderService.getUserOrders(currentUser.getId());
        return ResponseEntity.ok(orders.stream().map(this::convertToDTO).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
        User currentUser = authProvider.getCurrentUser();
        if (currentUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }

        Order order = orderService.getOrderById(id);
        
        // Users can only view their own orders, admins can view any
        if (!order.getUser().getId().equals(currentUser.getId()) && 
            currentUser.getRole() != UserRole.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        return ResponseEntity.ok(convertToDTO(order));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDTO>> getUserOrders(@PathVariable Long userId) {
        User currentUser = authProvider.getCurrentUser();
        if (currentUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }

        // Users can only view their own orders, admins can view any user's orders
        if (!userId.equals(currentUser.getId()) && currentUser.getRole() != UserRole.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        List<Order> orders = orderService.getUserOrders(userId);
        return ResponseEntity.ok(orders.stream().map(this::convertToDTO).collect(Collectors.toList()));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status) {
        User currentUser = authProvider.getCurrentUser();
        if (currentUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }

        // Only admin can update order status
        if (currentUser.getRole() != UserRole.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Admin access required");
        }

        Order updatedOrder = orderService.updateOrderStatus(id, status);
        return ResponseEntity.ok(convertToDTO(updatedOrder));
    }

    @PostMapping("/{orderId}/items")
    public ResponseEntity<Void> addItemToOrder(
            @PathVariable Long orderId,
            @RequestParam Long productId,
            @RequestParam Integer quantity) {
        User currentUser = authProvider.getCurrentUser();
        if (currentUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }

        Order order = orderService.getOrderById(orderId);
        if (!order.getUser().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        orderService.addItemToOrder(orderId, productId, quantity);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/items/{orderItemId}")
    public ResponseEntity<Void> removeItemFromOrder(@PathVariable Long orderItemId) {
        User currentUser = authProvider.getCurrentUser();
        if (currentUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }

        // Note: In production, you'd verify the item belongs to the user's order
        orderService.removeItemFromOrder(orderItemId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/track/{orderNumber}")
    public ResponseEntity<OrderDTO> trackOrder(@PathVariable String orderNumber) {
        // Public endpoint - anyone with order number can track
        Order order = orderService.getOrderByOrderNumber(orderNumber);
        if (order == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found");
        }
        return ResponseEntity.ok(convertToDTO(order));
    }

    private OrderDTO convertToDTO(Order order) {
        List<OrderItemDTO> itemDTOs = null;
        if (order.getOrderItems() != null) {
            itemDTOs = order.getOrderItems().stream()
                .map(this::convertItemToDTO)
                .collect(Collectors.toList());
        }

        return new OrderDTO(
            order.getId(),
            order.getOrderNumber(),
            order.getStatus(),
            order.getTotalAmount(),
            order.getTaxAmount(),
            order.getShippingCost(),
            order.getShippingAddress(),
            order.getPaymentMethod(),
            order.getCreatedAt(),
            order.getUpdatedAt(),
            itemDTOs
        );
    }

    private OrderItemDTO convertItemToDTO(OrderItem item) {
        return new OrderItemDTO(
            item.getId(),
            item.getProduct().getId(),
            item.getProduct().getName(),
            item.getProduct().getImageUrl(),
            item.getQuantity(),
            item.getUnitPrice(),
            item.getTotalPrice()
        );
    }
}
