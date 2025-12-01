# Project Structure Overview

## 📁 Complete Directory Layout

```
ECommerce/
│
├── backend/                          # Spring Boot Backend (Java)
│   ├── pom.xml                      # Maven build configuration
│   ├── .gitignore
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/ecommerce/
│   │   │   │   ├── ECommerceApplication.java    # Main application class
│   │   │   │   │
│   │   │   │   ├── controller/
│   │   │   │   │   ├── ProductController.java   # Product REST endpoints
│   │   │   │   │   └── AuthController.java      # Authentication endpoints
│   │   │   │   │
│   │   │   │   ├── service/
│   │   │   │   │   ├── ProductService.java      # Product business logic
│   │   │   │   │   ├── AuthService.java         # Authentication logic
│   │   │   │   │   ├── RecommendationService.java  # AI recommendations
│   │   │   │   │   ├── OrderService.java        # Order management
│   │   │   │   │   └── ReviewService.java       # Review management
│   │   │   │   │
│   │   │   │   ├── repository/
│   │   │   │   │   ├── UserRepository.java
│   │   │   │   │   ├── ProductRepository.java
│   │   │   │   │   ├── OrderRepository.java
│   │   │   │   │   ├── OrderItemRepository.java
│   │   │   │   │   └── ReviewRepository.java
│   │   │   │   │
│   │   │   │   ├── entity/
│   │   │   │   │   ├── User.java               # User entity with JPA mapping
│   │   │   │   │   ├── Product.java            # Product entity
│   │   │   │   │   ├── Order.java              # Order entity
│   │   │   │   │   ├── OrderItem.java          # Order details entity
│   │   │   │   │   └── Review.java             # Product review entity
│   │   │   │   │
│   │   │   │   ├── dto/
│   │   │   │   │   ├── ProductDTO.java         # Product data transfer object
│   │   │   │   │   ├── UserDTO.java            # User DTO
│   │   │   │   │   ├── LoginRequest.java       # Login request DTO
│   │   │   │   │   └── LoginResponse.java      # Login response DTO
│   │   │   │   │
│   │   │   │   ├── security/
│   │   │   │   │   └── JwtTokenProvider.java   # JWT token generation/validation
│   │   │   │   │
│   │   │   │   └── config/
│   │   │   │       └── (CorsConfig, SecurityConfig, etc.)
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties      # Spring Boot configuration
│   │   │
│   │   └── test/
│   │       └── (Unit tests)
│   │
│   └── target/                                 # Build output (generated)
│
├── frontend/                         # React Frontend (JavaScript/JSX)
│   ├── package.json                 # npm dependencies
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── index.html                  # Entry HTML file
│   ├── .gitignore
│   │
│   └── src/
│       ├── main.jsx                 # React entry point
│       ├── App.jsx                  # Root App component
│       ├── index.css                # Global styles
│       │
│       ├── api/
│       │   └── client.js            # Axios API client
│       │
│       ├── components/
│       │   ├── Navbar.jsx           # Navigation component
│       │   └── ProductCard.jsx      # Product display component
│       │
│       ├── pages/
│       │   ├── Home.jsx             # Homepage
│       │   ├── Login.jsx            # Login page
│       │   └── Products.jsx         # Products listing page
│       │
│       ├── context/
│       │   └── AuthContext.jsx      # Authentication context (State management)
│       │
│       └── assets/                  # Images, icons, etc.
│           └── (placeholder)
│
├── database/
│   └── schema.sql                  # MySQL database schema
│
├── README.md                        # Project documentation
├── QUICKSTART.md                    # Quick start guide
└── .gitignore                       # Root gitignore
```

---

## 🔑 Key Files Explained

### Backend Core Files

#### `ECommerceApplication.java`
- Entry point for Spring Boot application
- Initializes password encoder bean
- Starts Tomcat server on port 8080

#### `ProductController.java`
- REST endpoints for product operations
- `/api/products` - GET/POST
- `/api/products/{id}` - GET/PUT/DELETE
- `/api/products/recommendations/{userId}` - AI recommendations

#### `RecommendationService.java`
- **Core AI Feature** - implements recommendation algorithm
- Calculates scores based on: rating, reviews, stock, popularity
- Returns top 10 recommended products

#### `JwtTokenProvider.java`
- Generates JWT tokens for authentication
- Validates token signatures
- Extracts email from token claims

#### `application.properties`
- Database connection string
- JWT secret key
- CORS configuration
- Port settings

### Frontend Core Files

#### `api/client.js`
- Axios instance with base URL configuration
- API method definitions for all endpoints
- Automatically adds JWT token to headers

#### `context/AuthContext.jsx`
- Global authentication state
- Manages user and token persistence
- Login/logout functionality

#### `App.jsx`
- Root component with routing
- Wraps app with AuthProvider
- Defines all routes

#### `pages/Products.jsx`
- Main product display page
- Search and filtering logic
- Fetches from backend API

### Database Files

#### `schema.sql`
- MySQL database structure
- 5 tables: users, products, orders, order_items, reviews
- Indexes for performance optimization
- Sample product data

---

## 🔗 Component Relationships

```
Frontend (React)
├── App.jsx (Routes)
├── AuthContext (Global State)
│   └── Login/Register pages
├── Navbar Component
└── Product Pages
    └── api/client.js (HTTP calls)

         ↓ (HTTP/REST)

Backend (Spring Boot)
├── AuthController
│   └── AuthService
│       └── JwtTokenProvider
├── ProductController
│   └── ProductService
│       └── RecommendationService (AI)
├── OrderController
│   └── OrderService
└── ReviewController
    └── ReviewService

         ↓ (JPA/SQL)

Database (MySQL)
├── users table
├── products table
├── orders table
├── order_items table
└── reviews table
```

---

## 📊 Data Flow Example: Get Product Recommendations

```
1. User clicks "Recommendations" on frontend
   ↓
2. React sends: GET /api/products/recommendations/123
   ├── Header: Authorization: Bearer {JWT_TOKEN}
   ↓
3. ProductController receives request
   ├── Validates JWT token
   ├── Calls ProductService.getRecommendedProducts(123)
   ↓
4. ProductService calls RecommendationService.getRecommendedProducts(123)
   ├── Fetches all products from database
   ├── Calculates AI score for each product
   ├── Filters products with score > 0.5
   ├── Sorts by score (descending)
   ├── Returns top 10
   ↓
5. RecommendationService returns scored products
   ↓
6. ProductService maps to ProductDTO
   ↓
7. ProductController returns JSON response
   ↓
8. Frontend receives and displays products with AI scores
```

---

## 📦 Technology Stack Summary

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React | 18.2 | UI framework |
| | Vite | 4.4 | Build tool |
| | Tailwind CSS | 3.3 | Styling |
| | Axios | 1.5 | HTTP client |
| **Backend** | Spring Boot | 3.1.5 | Web framework |
| | Maven | 3.8+ | Build tool |
| | Spring Security | 3.1 | Authentication |
| | Spring Data JPA | 3.1 | ORM |
| **Database** | MySQL | 8.0+ | Relational DB |
| | JDBC | Latest | Database driver |
| **Security** | JWT (JJWT) | 0.11.5 | Token auth |
| | BCrypt | Built-in | Password hashing |

---

## 🚀 Build & Run Summary

### Development Mode

```bash
# Terminal 1: Backend
cd backend
mvn spring-boot:run

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

### Production Build

```bash
# Backend JAR
cd backend
mvn clean package -DskipTests
java -jar target/ecommerce-platform-1.0.0.jar

# Frontend Build
cd frontend
npm run build
# Deploy dist/ folder to CDN or static server
```

---

## 📝 File Count & Size Summary

- **Backend Java Files**: ~8 main classes + repositories
- **Frontend React Files**: ~10 components
- **Database Schema**: 1 SQL file with 5 tables
- **Configuration Files**: pom.xml, vite.config.js, application.properties, etc.
- **Documentation**: README.md, QUICKSTART.md

---

## 🔧 Extension Points

### To Add More Features:

1. **Add New Entity** → Create entity class in `entity/` → Create DTO in `dto/` → Create Repository → Create Service → Create Controller

2. **Add New Frontend Page** → Create component in `pages/` → Add route in `App.jsx` → Add API method in `api/client.js`

3. **Add Authentication** → Extend `JwtTokenProvider` → Update `ProductController` with security annotations

4. **Add Database Operations** → Extend repository with custom queries → Add service logic → Call from controller

---

## 📚 Next Steps

1. Review the backend entity relationships
2. Understand the JWT authentication flow
3. Explore the AI recommendation algorithm
4. Set up the database schema
5. Start the backend and frontend
6. Test all API endpoints
7. Extend with additional features

Happy Coding! 🎉
