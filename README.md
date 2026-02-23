# 🛒 ShopHub - Full-Stack E-Commerce Platform

A modern, production-ready e-commerce platform built with **React.js** and **Spring Boot**, featuring complete user authentication, product management, seller onboarding system, comprehensive admin panel, and AI-powered search with autocomplete.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.5-green) ![MySQL](https://img.shields.io/badge/MySQL-8.0-orange) ![Java](https://img.shields.io/badge/Java-21-red)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [User Roles & Access Control](#-user-roles--access-control)
- [Deployment](#-deployment)
- [Resume Project Description](#-resume-project-description)

---

## ✨ Features

### 🔐 Authentication & User Management
- JWT-based user authentication and authorization
- User registration with email/phone validation
- Password strength validation with real-time feedback
- Duplicate email/phone detection
- Three-tier role-based access control (Customer, Admin, Seller)
- User profile management
- Session persistence

### 🛍️ E-Commerce Features
- **Advanced Search**: Real-time autocomplete with product suggestions
- **Enhanced Search**: Searches across product name, brand, description, and category
- Product catalog with filtering and sorting
- Product detail pages with ratings and reviews
- Shopping cart with persistent state
- Wishlist functionality
- Multi-step checkout process
- Order tracking with timeline visualization
- Customer service pages (FAQ, Contact, Shipping, Returns, Terms, Privacy, Cookies)

### 👨‍💼 Seller Management
- Seller application system with business information collection
- Admin approval workflow for seller applications
- Seller product listing with approval system
- Business information collection (GST, business type, address)
- Seller dashboard (separate from admin panel)

### 🎛️ Admin Panel
- Product management (CRUD operations)
- Pending approvals dashboard
- Seller application review
- Product approval system
- Statistics dashboard
- Search and filter capabilities
- Full control over all products and seller applications

### 🎨 UI/UX
- Modern ChatGPT-inspired dark theme
- Smooth page transitions and animations
- Fully responsive design (mobile, tablet, desktop)
- Glassmorphism effects
- Real-time form validation
- Toast notifications with error info buttons
- Loading states and skeleton screens
- Comprehensive error handling with informative tooltips

### 🔍 Error Handling System
- Error info buttons on all error pages
- Tooltip/modal with detailed error explanations
- Error boundary for React errors
- Enhanced error toast notifications
- User-friendly error messages

---

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router DOM** - Routing
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Context API** - State management
- **React Toastify** - Notifications
- **React Icons** - Icon library

### Backend
- **Java 21** - Programming language
- **Spring Boot 3.1.5** - Framework
- **Spring Security** - Authentication
- **Spring Data JPA** - Data access
- **JWT** - Token authentication
- **BCrypt** - Password encryption
- **Maven** - Build tool
- **Lombok** - Boilerplate reduction

### Database
- **MySQL 8.0** - Primary database (persistent storage)
- **JPA/Hibernate** - ORM

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java 21** or higher ([Download](https://www.oracle.com/java/technologies/downloads/))
- **Node.js 18+** and npm ([Download](https://nodejs.org/))
- **MySQL 8.0+** ([Download](https://dev.mysql.com/downloads/mysql/))
- **Maven 3.6+** (usually comes with Java projects)

---

## 🚀 Quick Start

### Step 1: Database Setup

1. **Start MySQL Server**

2. **Create Database**:
```sql
mysql -u root -p
CREATE DATABASE ecommerce_db;
USE ecommerce_db;
```

3. **Update Database Credentials** in `backend/src/main/resources/application-dev.properties`:
```properties
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

The tables will be created automatically when the backend starts (ddl-auto=update).

### Step 2: Start Backend Server

Open a terminal and navigate to the backend directory:

```bash
cd backend
mvn clean install
mvn spring-boot:run "-Dspring-boot.run.profiles=dev"
```

**Wait for:** `Started ECommerceApplication in X seconds`

✅ Backend will be running at: **http://localhost:8081**

**Test Backend:** Open `http://localhost:8081/api/products` in browser to see JSON response.

### Step 3: Start Frontend Server

Open a **NEW** terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

**Wait for:** `Local: http://localhost:5173` (or similar port)

✅ Frontend will be running at: **http://localhost:5173** (or **http://localhost:3002**)

### Step 4: Open Application

Once **BOTH** servers are running, open your browser and go to:

```
http://localhost:5173
```

---

## 📁 Project Structure

```
ECommerce/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── ErrorInfoButton.jsx
│   │   │   ├── ErrorToast.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── ...
│   │   ├── context/             # State management
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── api/                 # API client
│   │   │   └── client.js
│   │   ├── utils/               # Utility functions
│   │   │   └── errorUtils.js
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── src/main/java/com/ecommerce/
│   │   ├── controller/          # REST controllers
│   │   │   ├── ProductController.java
│   │   │   ├── AuthController.java
│   │   │   └── SellerApplicationController.java
│   │   ├── service/             # Business logic
│   │   │   ├── ProductService.java
│   │   │   ├── AuthService.java
│   │   │   └── SellerApplicationService.java
│   │   ├── repository/          # Data access
│   │   │   ├── ProductRepository.java
│   │   │   └── UserRepository.java
│   │   ├── entity/              # JPA entities
│   │   │   ├── Product.java
│   │   │   ├── User.java
│   │   │   └── SellerApplication.java
│   │   ├── dto/                 # Data transfer objects
│   │   ├── config/              # Configuration
│   │   │   ├── SecurityConfig.java
│   │   │   └── DataInitializer.java
│   │   └── security/            # Security components
│   │       └── JwtTokenProvider.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── application-dev.properties
│   └── pom.xml
├── database/
│   └── schema.sql               # Database schema
└── README.md                    # This file
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
  - Body: `{ firstName, lastName, email, phoneNumber, password }`
- `POST /api/auth/login` - User login
  - Body: `{ email, password }`
- `GET /api/auth/user/{userId}` - Get user information

### Products
- `GET /api/products` - Get all approved products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/search?keyword={keyword}` - Search products (name, brand, description, category)
- `GET /api/products/search/suggestions?keyword={keyword}` - Get search suggestions (autocomplete)
- `POST /api/products?userId={userId}` - Create product (Admin/Seller)
- `PUT /api/products/{id}?userId={userId}` - Update product (Admin/Seller)
- `DELETE /api/products/{id}?userId={userId}` - Delete product (Admin/Seller)
- `GET /api/products/pending?userId={userId}` - Get pending products (Admin only)
- `PUT /api/products/{id}/approve?adminId={adminId}` - Approve product (Admin only)
- `PUT /api/products/{id}/reject?adminId={adminId}` - Reject product (Admin only)
- `GET /api/products/seller/{sellerId}?userId={userId}` - Get seller's products

### Seller Applications
- `POST /api/seller-applications?userId={userId}` - Submit seller application
  - Body: `{ businessName, businessType, gstNumber, businessAddress }`
- `GET /api/seller-applications` - Get all applications (Admin only)
- `GET /api/seller-applications/pending` - Get pending applications (Admin only)
- `PUT /api/seller-applications/{id}/approve?adminId={adminId}&notes={notes}` - Approve application (Admin only)
- `PUT /api/seller-applications/{id}/reject?adminId={adminId}&notes={notes}` - Reject application (Admin only)

---

## 👥 User Roles & Access Control

### Customer (Default Role)
- ✅ Browse products
- ✅ Search products
- ✅ Add to cart and wishlist
- ✅ Place orders
- ✅ View profile
- ❌ Cannot access admin panel
- ❌ Cannot list products

### Seller Role
- ✅ All Customer privileges
- ✅ Access Seller Dashboard
- ✅ List products (pending admin approval)
- ✅ Edit/Delete own products only
- ✅ View own products statistics
- ❌ Cannot approve products
- ❌ Cannot approve seller applications
- ❌ Cannot modify other sellers' products

### Admin Role
- ✅ All Seller privileges
- ✅ Full access to Admin Panel
- ✅ Manage all products (CRUD)
- ✅ Approve/Reject seller applications
- ✅ Approve/Reject seller-listed products
- ✅ View all statistics and analytics
- ✅ Full control over the platform

**Authorization Rules:**
- Sellers can only create, update, delete, and view their own products
- Admins have full control over all products and seller applications
- Customers cannot perform any product management actions

---

## 🔍 Search Functionality

### Features
- **Real-time Autocomplete**: Product suggestions as you type (after 2+ characters)
- **Multi-field Search**: Searches across product name, brand, description, and category
- **Backend-powered**: All search queries are processed server-side
- **Debounced API Calls**: Optimized to prevent excessive requests
- **Suggestion Dropdown**: Shows product images, names, brands, and prices

### Usage
1. Type in the search bar (Header or Products page)
2. See suggestions appear automatically
3. Click a suggestion or press Enter to search
4. View results on Products page

---

## 🛡️ Error Handling System

### Error Info Buttons
- Every error page and error message includes an "i" info button
- Hover or click to see detailed error explanations
- User-friendly messages explaining what went wrong

### Error Types Covered
- **Authorization Errors**: Role-based access denied messages
- **Validation Errors**: Form validation with inline error info
- **API Errors**: Network errors, 404, 500, etc.
- **404 Not Found**: Page not found with helpful suggestions
- **Error Boundary**: Catches unexpected React errors

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the project**:
```bash
cd frontend
npm run build
```

2. **Deploy**:
   - Vercel: Connect GitHub repo and deploy
   - Netlify: Drag & drop the `dist` folder

3. **Environment Variables**:
   - Set `VITE_API_URL` to your backend API URL

### Backend Deployment (Heroku/Railway/AWS)

1. **Update database configuration** for production
2. **Set environment variables**:
   - Database credentials
   - JWT secret key
   - Server port
3. **Build and deploy**:
```bash
cd backend
mvn clean package
# Deploy the JAR file
```

### MySQL Database Setup

1. Create database on production server
2. Run migration scripts if needed
3. Update connection string in production properties

---

## 📄 Resume Project Description

### Short Version (2-3 lines)
**ShopHub - Full-Stack E-Commerce Platform**
Built a production-ready e-commerce platform using React.js and Spring Boot with JWT authentication, role-based access control (Customer/Seller/Admin), seller onboarding system, product approval workflow, advanced search with autocomplete, and comprehensive error handling. Features MySQL database, RESTful APIs, responsive dark-themed UI, and real-time form validation.

### Detailed Version

**Project Title:** ShopHub - Full-Stack E-Commerce Platform with Multi-Role Access Control

**Technologies Used:**
- **Frontend:** React.js 18, Vite, Tailwind CSS, React Router, Axios, Framer Motion, React Toastify
- **Backend:** Java 21, Spring Boot 3.1.5, Spring Security, Spring Data JPA, JWT, Maven
- **Database:** MySQL 8.0
- **Tools:** Git, GitHub, Postman

**Key Features Implemented:**

1. **Three-Tier Role-Based Access Control System**
   - Implemented Customer, Seller, and Admin roles with granular permissions
   - Sellers can only manage their own products; Admins have full system control
   - JWT-based authentication with secure token management

2. **Seller Onboarding & Approval Workflow**
   - Built complete seller application system with business information collection
   - Admin approval workflow for seller applications
   - Product approval system where seller-listed products require admin approval

3. **Advanced Search System**
   - Real-time autocomplete with product suggestions
   - Multi-field search (name, brand, description, category)
   - Backend-powered search with optimized queries
   - Debounced API calls for performance

4. **Comprehensive Error Handling**
   - Error info buttons on all error pages with detailed explanations
   - Error boundary for React error catching
   - Enhanced toast notifications with contextual error messages
   - User-friendly error messages with actionable guidance

5. **Product Management System**
   - Full CRUD operations for products
   - Category-based filtering and sorting
   - Product approval workflow for seller-listed items
   - Statistics dashboard with inventory tracking

6. **User Experience Features**
   - Modern ChatGPT-inspired dark theme with smooth animations
   - Fully responsive design (mobile, tablet, desktop)
   - Real-time form validation with inline error messages
   - Shopping cart, wishlist, and checkout functionality

**Technical Achievements:**
- Implemented RESTful API architecture following industry best practices
- Designed normalized database schema with proper relationships and constraints
- Built secure authentication system with password encryption (BCrypt)
- Optimized database queries with proper indexing
- Created reusable components following DRY principles
- Implemented proper error handling and validation at both frontend and backend

**Project Impact:**
- Demonstrates full-stack development capabilities
- Showcases understanding of modern web technologies
- Highlights security best practices (JWT, role-based access, input validation)
- Proves ability to build production-ready applications with proper architecture

---

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test  # If tests are configured
```

### Manual Testing Checklist
- ✅ User registration and login
- ✅ Product browsing and search
- ✅ Add to cart and checkout
- ✅ Seller application submission
- ✅ Admin product approval
- ✅ Seller product listing
- ✅ Error handling on all pages

---

## 🔧 Configuration

### Backend Configuration

**Development Profile** (`application-dev.properties`):
- Server Port: `8081`
- Database: MySQL (`ecommerce_db`)
- JWT Secret: Configured (64+ characters for HS512)

**Update Database Credentials:**
```properties
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

### Frontend Configuration

**API URL** (`src/api/client.js`):
- Default: `http://localhost:8081/api`
- Can be overridden with environment variable: `VITE_API_URL`

**Create `.env` file** (optional):
```
VITE_API_URL=http://localhost:8081/api
```

---

## 🐛 Troubleshooting

### Backend Not Starting
- ✅ Check if MySQL is running
- ✅ Verify database credentials
- ✅ Check if port 8081 is available
- ✅ Review console for error messages

### Frontend Not Loading
- ✅ Ensure backend is running first
- ✅ Check browser console (F12) for errors
- ✅ Verify API URL configuration
- ✅ Clear browser cache

### Search Not Working
- ✅ Verify backend is running on port 8081
- ✅ Check browser console for API errors
- ✅ Ensure database has products
- ✅ Test API directly: `http://localhost:8081/api/products/search?keyword=laptop`

### Authentication Issues
- ✅ Check JWT token in localStorage
- ✅ Verify backend is running
- ✅ Clear browser cache and cookies
- ✅ Try logging out and logging back in

---

## 📚 Additional Resources

### Key Files to Review
- `backend/src/main/java/com/ecommerce/config/SecurityConfig.java` - Security configuration
- `backend/src/main/java/com/ecommerce/service/ProductService.java` - Product business logic
- `frontend/src/components/SearchBar.jsx` - Search with autocomplete
- `frontend/src/components/ErrorInfoButton.jsx` - Error handling component

### Database Schema
- See `database/schema.sql` for complete database structure
- Tables: users, products, orders, order_items, reviews, seller_applications

---

## 🤝 Contributing

This is a portfolio project. If you'd like to contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- React.js community for excellent documentation
- Spring Boot team for the amazing framework
- All open-source contributors whose libraries made this possible

---

## ⭐ Show Your Support

If you like this project, please give it a star on GitHub!

---

**Last Updated:** December 2024  
**Version:** 1.0.0

---

## 🎯 Quick Links

- **Application URL**: `http://localhost:5173`
- **Backend API**: `http://localhost:8081/api`
- **API Test**: `http://localhost:8081/api/products`
- **Admin Panel**: `http://localhost:5173/admin` (requires admin login)

---

**Happy Coding! 🚀**
