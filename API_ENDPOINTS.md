# API Endpoints Reference

## Base URL
```
http://localhost:8080/api
```

## Authentication Endpoints

### POST /auth/login
**Description**: User login with email and password

**Request**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "address": "123 Main St",
    "city": "New York",
    "postalCode": "10001",
    "country": "USA",
    "role": "CUSTOMER"
  }
}
```

**Error** (401 Unauthorized):
```json
{
  "message": "Invalid credentials"
}
```

---

### POST /auth/register
**Description**: Create new user account

**Query Parameters**:
- `password` (required): User password

**Request**:
```json
{
  "email": "newuser@example.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "phoneNumber": "+1987654321",
  "address": "456 Oak Ave",
  "city": "Los Angeles",
  "postalCode": "90001",
  "country": "USA"
}
```

**Response** (201 Created):
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 2,
    "email": "newuser@example.com",
    "firstName": "Jane",
    ...
  }
}
```

**Error** (400 Bad Request):
```json
{
  "message": "Email already exists"
}
```

---

## Product Endpoints

### GET /products
**Description**: Get all products

**Query Parameters**: None

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones...",
    "price": 79.99,
    "quantity": 50,
    "category": "Electronics",
    "brand": "AudioPro",
    "imageUrl": "https://example.com/image.jpg",
    "rating": 4.5,
    "reviewCount": 120,
    "aiRecommendationScore": null
  },
  ...
]
```

---

### GET /products/{id}
**Description**: Get single product by ID

**URL Parameters**:
- `id` (required): Product ID

**Response** (200 OK):
```json
{
  "id": 1,
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones...",
  "price": 79.99,
  ...
}
```

**Error** (404 Not Found):
```json
{
  "message": "Product not found"
}
```

---

### GET /products/search
**Description**: Search products by keyword

**Query Parameters**:
- `keyword` (required): Search term

**Example**:
```
GET /products/search?keyword=wireless
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    ...
  }
]
```

---

### GET /products/category/{category}
**Description**: Get products by category

**URL Parameters**:
- `category` (required): Category name

**Example**:
```
GET /products/category/Electronics
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "category": "Electronics",
    ...
  }
]
```

---

### GET /products/trending/top-rated
**Description**: Get top-rated products

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "rating": 4.5,
    "reviewCount": 120,
    ...
  }
]
```

---

### GET /products/recommendations/{userId}
**Description**: Get AI-powered product recommendations for user

**URL Parameters**:
- `userId` (required): User ID

**Headers**:
- `Authorization: Bearer {token}` (required)

**Example**:
```
GET /products/recommendations/1
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

**Response** (200 OK):
```json
[
  {
    "id": 3,
    "name": "Phone Case",
    "price": 24.99,
    "aiRecommendationScore": 0.87,
    "rating": 4.7,
    ...
  },
  {
    "id": 2,
    "name": "USB-C Cable",
    "price": 14.99,
    "aiRecommendationScore": 0.79,
    ...
  }
]
```

---

### POST /products
**Description**: Create new product (Admin only)

**Headers**:
- `Authorization: Bearer {token}` (required)
- `Content-Type: application/json`

**Request**:
```json
{
  "name": "Bluetooth Speaker",
  "description": "Portable wireless speaker...",
  "price": 49.99,
  "quantity": 100,
  "category": "Electronics",
  "brand": "SoundPro",
  "imageUrl": "https://example.com/speaker.jpg"
}
```

**Response** (201 Created):
```json
{
  "id": 6,
  "name": "Bluetooth Speaker",
  ...
}
```

---

### PUT /products/{id}
**Description**: Update product (Admin only)

**URL Parameters**:
- `id` (required): Product ID

**Headers**:
- `Authorization: Bearer {token}` (required)

**Request**:
```json
{
  "name": "Updated Product Name",
  "price": 59.99,
  ...
}
```

**Response** (200 OK):
```json
{
  "id": 6,
  "name": "Updated Product Name",
  ...
}
```

---

### DELETE /products/{id}
**Description**: Delete product (Admin only)

**URL Parameters**:
- `id` (required): Product ID

**Headers**:
- `Authorization: Bearer {token}` (required)

**Response** (204 No Content)

---

## Testing with cURL

### Get All Products
```bash
curl http://localhost:8080/api/products
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Recommendations (with token)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:8080/api/products/recommendations/1
```

### Search Products
```bash
curl "http://localhost:8080/api/products/search?keyword=wireless"
```

### Get Products by Category
```bash
curl http://localhost:8080/api/products/category/Electronics
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid input",
  "status": 400
}
```

### 401 Unauthorized
```json
{
  "message": "Token expired or invalid",
  "status": 401
}
```

### 403 Forbidden
```json
{
  "message": "Access denied - Admin role required",
  "status": 403
}
```

### 404 Not Found
```json
{
  "message": "Resource not found",
  "status": 404
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error occurred",
  "status": 500
}
```

---

## Response Headers

All responses include:
```
Content-Type: application/json
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

---

## Pagination (Future)

Currently, endpoints return all data. To add pagination:

```bash
GET /api/products?page=0&size=10&sort=rating,desc
```

---

## Rate Limiting (Future)

Recommended rate limits:
- Public endpoints: 100 requests/minute
- Authenticated endpoints: 300 requests/minute
- Admin endpoints: 50 requests/minute

---

## API Versioning (Future)

```
/api/v1/products  # Current version
/api/v2/products  # Future version with breaking changes
```

---

## WebSocket Support (Future)

```
ws://localhost:8080/api/notifications
```

For real-time inventory updates and order status changes.

---

## GraphQL API (Future Alternative)

```graphql
query GetProducts {
  products {
    id
    name
    price
    rating
  }
}

query GetRecommendations($userId: ID!) {
  recommendations(userId: $userId) {
    id
    name
    score
  }
}
```

---

## Status Codes Reference

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 204 | No Content - Successful with no body |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Token invalid/expired |
| 403 | Forbidden - Permission denied |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Duplicate resource |
| 500 | Server Error - Internal error |

---

## Implementation Tips

1. **Always include Authorization header** for protected endpoints
2. **Handle token expiration** and refresh tokens
3. **Implement retry logic** for network failures
4. **Cache recommendations** to reduce server load
5. **Validate input** on both client and server
6. **Log API calls** for debugging and monitoring

---

Last Updated: November 2025
