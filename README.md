# 🛒 ShopHub - Full-Stack E-Commerce Platform

A modern, production-ready e-commerce platform built with **React.js** and **Spring Boot**, featuring complete user authentication, product management, seller onboarding system, and comprehensive admin panel.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.5-green) ![MySQL](https://img.shields.io/badge/MySQL-8.0-orange) ![Java](https://img.shields.io/badge/Java-21-red)

## ✨ Features

### 🔐 Authentication & User Management
- JWT-based user authentication and authorization
- User registration with email/phone validation
- Password strength validation with real-time feedback
- Duplicate email/phone detection
- Role-based access control (Customer, Admin, Seller)
- User profile management

### 🛍️ E-Commerce Features
- Product catalog with search and filtering
- Product detail pages with ratings and reviews
- Shopping cart with persistent state
- Wishlist functionality
- Multi-step checkout process
- Order tracking with timeline visualization
- Customer service pages (FAQ, Contact, Shipping, Returns)

### 👨‍💼 Seller Management
- Seller application system
- Admin approval workflow for seller applications
- Seller product listing with approval system
- Business information collection (GST, business type)

### 🎛️ Admin Panel
- Product management (CRUD operations)
- Pending approvals dashboard
- Seller application review
- Product approval system
- Statistics dashboard
- Search and filter capabilities

### 🎨 UI/UX
- Modern ChatGPT-inspired dark theme
- Smooth page transitions and animations
- Fully responsive design (mobile, tablet, desktop)
- Glassmorphism effects
- Real-time form validation
- Toast notifications
- Loading states and skeleton screens

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router DOM** - Routing
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **Zustand** - State management
- **React Toastify** - Notifications

### Backend
- **Java 21** - Programming language
- **Spring Boot 3.1.5** - Framework
- **Spring Security** - Authentication
- **Spring Data JPA** - Data access
- **JWT** - Token authentication
- **Maven** - Build tool

### Database
- **MySQL 8.0** - Primary database
- **H2** - Development database (optional)

## 📋 Prerequisites

- Java 21 or higher
- Node.js 18+ and npm
- MySQL 8.0+
- Maven 3.6+

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-platform.git
cd ecommerce-platform
```

### 2. Database Setup

Create MySQL database:
```sql
CREATE DATABASE ecommerce_db;
```

Update database credentials in `backend/src/main/resources/application-dev.properties`:
```properties
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

### 3. Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

Backend will run on `http://localhost:8081`

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000` (or next available port)

## 📁 Project Structure

```
ECommerce/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # State management
│   │   ├── api/            # API client
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── src/main/java/
│   │   ├── controller/     # REST controllers
│   │   ├── service/        # Business logic
│   │   ├── repository/    # Data access
│   │   ├── entity/         # JPA entities
│   │   ├── dto/            # Data transfer objects
│   │   └── config/         # Configuration
│   └── pom.xml
└── database/               # SQL scripts
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)
- `GET /api/products/pending` - Get pending products (Admin)

### Seller Applications
- `POST /api/seller-applications` - Submit seller application
- `GET /api/seller-applications/pending` - Get pending applications (Admin)
- `PUT /api/seller-applications/{id}/approve` - Approve application (Admin)
- `PUT /api/seller-applications/{id}/reject` - Reject application (Admin)

## 🎯 Key Features in Detail

### User Roles
- **Customer**: Browse products, add to cart, place orders
- **Seller**: Apply to become seller, list products (pending approval)
- **Admin**: Manage products, approve sellers and products, view statistics

### Product Approval Workflow
1. Seller lists a product → Status: PENDING
2. Admin reviews product → Approve or Reject
3. Approved products appear in catalog
4. Rejected products are hidden

### Seller Onboarding
1. User applies to become seller
2. Admin reviews application
3. Approved users get ADMIN role
4. Can now list products

## 📸 Screenshots

[Add screenshots of your application here]

## 🔒 Security Features

- JWT token-based authentication
- Password encryption (BCrypt)
- CORS configuration
- Role-based access control
- Input validation
- SQL injection prevention (JPA)

## 🧪 Testing

```bash
# Backend tests
cd backend
mvn test

# Frontend tests (if configured)
cd frontend
npm test
```

## 📝 Environment Variables

Create `.env` file in frontend:
```
VITE_API_URL=http://localhost:8081/api
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React.js community
- Spring Boot team
- All open-source contributors

---

⭐ If you like this project, please give it a star!
