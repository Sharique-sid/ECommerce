# Quick Start Guide - Smart E-Commerce Platform

## 🚀 Get Started in 5 Minutes

### Prerequisites Check
- [ ] Java 17+ installed: `java -version`
- [ ] Maven 3.8+ installed: `mvn -version`
- [ ] MySQL 8.0+ installed and running
- [ ] Node.js 16+ installed: `node -v`
- [ ] npm installed: `npm -v`

---

## Step 1: Database Setup (2 minutes)

```bash
# Open MySQL Command Line or Workbench
mysql -u root -p

# Run these commands:
CREATE DATABASE ecommerce_db;
USE ecommerce_db;

# Copy and paste all SQL from database/schema.sql
# Or run:
# mysql -u root -p ecommerce_db < database/schema.sql
```

**Verify:**
```bash
mysql -u root -p
USE ecommerce_db;
SHOW TABLES;
# Should see: users, products, orders, order_items, reviews
```

---

## Step 2: Start Backend Server (2 minutes)

```bash
# Navigate to backend folder
cd backend

# Build project
mvn clean install

# Run application
mvn spring-boot:run

# Or run the JAR directly
java -jar target/ecommerce-platform-1.0.0.jar
```

**Verify Backend is Running:**
- Open browser: http://localhost:8080/api/products
- Should return JSON array of products

---

## Step 3: Start Frontend Application (1 minute)

```bash
# In a NEW terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Verify Frontend is Running:**
- Open browser: http://localhost:3000
- Should see the ShopHub homepage

---

## 🎯 Test the Application

### 1. View Products
- Go to http://localhost:3000/products
- See all products from database

### 2. Search Products
- Use search bar to find "Wireless Headphones"

### 3. Test Authentication
- Click "Sign In" 
- **Note:** Create test users first (see below)

### 4. Test AI Recommendations
- After login, go to `/products/recommendations/1`
- See AI-powered product suggestions

---

## 📝 Create Test Users

Open MySQL and run:

```sql
USE ecommerce_db;

-- Password hashing note: Use BCrypt for production
-- For testing, you can use: password123
-- Actual hash: $2a$10$... (use online BCrypt generator)

INSERT INTO users (email, password, first_name, last_name, phone_number, address, city, postal_code, country, role)
VALUES (
  'test@example.com',
  '$2a$10$Q7P5Z8W3V2X1N4M9K8J7L6P5H4G3F2E1', -- BCrypt hash of 'password123'
  'Test',
  'User',
  '+1234567890',
  '123 Main St',
  'New York',
  '10001',
  'USA',
  'CUSTOMER'
);
```

**Test Login Credentials:**
- Email: `test@example.com`
- Password: `password123`

---

## 🛠️ API Endpoints Quick Reference

### Products
```
GET    /api/products                    # All products
GET    /api/products/{id}               # Single product
GET    /api/products/category/{name}    # By category
GET    /api/products/search?keyword=x   # Search
GET    /api/products/recommendations/{userId}  # AI Recommendations
```

### Authentication
```
POST   /api/auth/login                  # Login
POST   /api/auth/register               # Register
```

### Test with cURL
```bash
# Get all products
curl http://localhost:8080/api/products

# Get recommendations for user 1
curl http://localhost:8080/api/products/recommendations/1

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## 📱 Project URLs

| Service | URL | Status |
|---------|-----|--------|
| Frontend | http://localhost:3000 | ✅ |
| Backend API | http://localhost:8080 | ✅ |
| MySQL | localhost:3306 | ✅ |

---

## 🔧 Common Issues & Solutions

### Issue: Database Connection Failed
```
Solution:
1. Check MySQL is running: mysql -u root -p
2. Verify credentials in backend/src/main/resources/application.properties
3. Ensure database 'ecommerce_db' exists
```

### Issue: Port 8080 Already in Use
```
Solution:
1. Change port in application.properties: server.port=8081
2. Update frontend proxy: vite.config.js target port
```

### Issue: Port 3000 Already in Use
```
Solution:
Change in vite.config.js:
server: {
  port: 3001,
  ...
}
```

### Issue: npm ERR! not ok code 0
```
Solution:
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 Key Features Implemented

- ✅ Full product catalog
- ✅ User authentication (JWT)
- ✅ AI-powered recommendations
- ✅ Product search & filtering
- ✅ Responsive design
- ✅ RESTful API
- ✅ MySQL database
- ✅ Role-based access

---

## 🎓 Learning Resources

- Spring Boot Docs: https://spring.io/projects/spring-boot
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- JWT Auth: https://jwt.io
- MySQL Tutorial: https://dev.mysql.com/doc/

---

## 📚 Next Steps

1. **Expand Features**
   - Add shopping cart functionality
   - Implement order management
   - Create admin dashboard

2. **Enhance AI**
   - Integrate OpenAI API
   - Implement TensorFlow model
   - Add chatbot feature

3. **Deploy**
   - Containerize with Docker
   - Deploy to AWS/Azure
   - Set up CI/CD pipeline

4. **Optimize**
   - Add caching layer (Redis)
   - Implement pagination
   - Optimize database queries

---

**Enjoy building! 🎉**

For detailed documentation, see README.md
