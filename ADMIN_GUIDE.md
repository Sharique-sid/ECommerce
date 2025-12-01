# Admin Panel & Authentication Guide

## ✅ Authentication is Now Active!

The Admin Panel now requires:
1. **Login** - You must be logged in
2. **Admin Role** - Your account must have `ADMIN` role

---

## 🔍 How to See Your Account in MySQL Workbench

### Method 1: Using MySQL Workbench (Visual)

1. **Open MySQL Workbench**
2. **Connect** to your database (localhost, user: `Sharique_sid`)
3. **Expand** `ecommerce_db` → `Tables` → `users`
4. **Right-click** on `users` table
5. **Select** "Select Rows - Limit 1000"
6. You'll see all registered users!

### Method 2: Using SQL Query

```sql
-- View all users
SELECT * FROM ecommerce_db.users;

-- View specific user
SELECT * FROM ecommerce_db.users WHERE email = 'clashgod1607@gmail.com';

-- View users with their roles
SELECT id, email, first_name, last_name, role, created_at 
FROM ecommerce_db.users 
ORDER BY created_at DESC;
```

---

## 👤 Your Current Account Status

✅ **Email:** clashgod1607@gmail.com  
✅ **Role:** ADMIN  
✅ **Status:** Can access Admin Panel

---

## 🔐 How Authentication Works Now

### For Regular Users (CUSTOMER role):
- ✅ Can browse products
- ✅ Can add to cart
- ✅ Can place orders
- ❌ **Cannot** access Admin Panel

### For Admin Users (ADMIN role):
- ✅ All customer features
- ✅ **Can** access Admin Panel
- ✅ Can add/edit/delete products
- ✅ Can view statistics

---

## 🛠️ How to Make a User an Admin

### Option 1: Via MySQL Workbench

```sql
-- Make a user admin by email
UPDATE ecommerce_db.users 
SET role = 'ADMIN' 
WHERE email = 'user@example.com';

-- Verify the change
SELECT email, role FROM ecommerce_db.users WHERE email = 'user@example.com';
```

### Option 2: Via Command Line

```powershell
mysql -u Sharique_sid -p"Sharique@16" -e "UPDATE ecommerce_db.users SET role = 'ADMIN' WHERE email = 'user@example.com';"
```

---

## 📋 User Roles Available

| Role | Description | Access |
|------|-------------|--------|
| **CUSTOMER** | Regular user | Browse, Cart, Orders |
| **ADMIN** | Administrator | Everything + Admin Panel |

---

## 🚀 Testing Authentication

1. **Logout** from your account
2. **Try to access** `/admin` - You'll be redirected to login
3. **Login** with a regular account (CUSTOMER role)
4. **Try to access** `/admin` - You'll see "Access Denied"
5. **Login** with your admin account
6. **Access** `/admin` - You'll see the Admin Panel! ✅

---

## 💡 Quick Commands

```sql
-- See all users and their roles
SELECT id, email, first_name, role, created_at FROM ecommerce_db.users;

-- Count users by role
SELECT role, COUNT(*) as count FROM ecommerce_db.users GROUP BY role;

-- Find all admins
SELECT * FROM ecommerce_db.users WHERE role = 'ADMIN';

-- Change user back to customer
UPDATE ecommerce_db.users SET role = 'CUSTOMER' WHERE email = 'user@example.com';
```

---

## ⚠️ Important Notes

- **After changing role in MySQL**, the user needs to **logout and login again** for the change to take effect
- The role is stored in the JWT token, so a new login is required
- Always verify role changes by checking the database

---

## 🎯 Next Steps

1. **Logout** from your current session
2. **Login** again with `clashgod1607@gmail.com`
3. **Access** the Admin Panel - It should work now! 🎉

