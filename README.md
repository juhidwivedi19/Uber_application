# Uber Backend API Documentation

## User Registration Endpoint

### Overview
The `/users/register` endpoint allows new users to create an account in the Uber application. It validates user input, hashes the password for security, and returns an authentication token upon successful registration.

---

## Endpoint Details

### Route
```
POST /users/register
```

### Description
Creates a new user account with the provided information. The password is securely hashed using bcrypt, and a JWT authentication token is generated for the newly registered user.

---

## Request Format

### Method
`POST`

### Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "securePassword123"
}
```

### Required Fields

| Field | Type | Description | Validation Rules |
|-------|------|-------------|------------------|
| `email` | String | User's email address | Must be a valid email format |
| `fullname.firstname` | String | User's first name | Minimum 3 characters |
| `fullname.lastname` | String | User's last name | Minimum 3 characters (optional but recommended) |
| `password` | String | User's password | Minimum 6 characters |

---

## Response Codes

### Success Response

#### Status Code: `201 Created`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

### Error Responses

#### Status Code: `400 Bad Request`
**Cause:** Validation errors in the request body
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### Status Code: `500 Internal Server Error`
**Cause:** Server error or database issue (e.g., duplicate email, missing required fields from service validation)
```json
{
  "error": "All fields are required"
}
```

---

## Response Examples

### Example 1: Successful Registration

**Request:**
```bash
POST /users/register
Content-Type: application/json

{
  "email": "john.doe@gmail.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "securePass123"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTA0YzJhNGY4ZjdmZjAwMDEyYzNkNDUiLCJpYXQiOjE2OTQ4NDIxODZ9.1xK9J0L6mP2qR3sT4uV5wX6yZ7aB8cD9eF0gH1iJ2k",
  "user": {
    "_id": "6504c2a4f8f7ff00012c3d45",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@gmail.com",
    "socketId": null,
    "__v": 0
  }
}
```

---

### Example 2: Invalid Email Format

**Request:**
```bash
POST /users/register
Content-Type: application/json

{
  "email": "invalid-email",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "password": "securePass456"
}
```

**Response (400 Bad Request):**
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

### Example 3: First Name Too Short

**Request:**
```bash
POST /users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "fullname": {
    "firstname": "Jo",
    "lastname": "Smith"
  },
  "password": "securePass789"
}
```

**Response (400 Bad Request):**
```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

### Example 4: Password Too Short

**Request:**
```bash
POST /users/register
Content-Type: application/json

{
  "email": "alex@example.com",
  "fullname": {
    "firstname": "Alex",
    "lastname": "Johnson"
  },
  "password": "pass1"
}
```

**Response (400 Bad Request):**
```json
{
  "errors": [
    {
      "msg": "password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

### Example 5: Multiple Validation Errors

**Request:**
```bash
POST /users/register
Content-Type: application/json

{
  "email": "not-an-email",
  "fullname": {
    "firstname": "Ab",
    "lastname": "S"
  },
  "password": "short"
}
```

**Response (400 Bad Request):**
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

### Example 6: Duplicate Email (Database Error)

**Request:**
```bash
POST /users/register
Content-Type: application/json

{
  "email": "john.doe@gmail.com",
  "fullname": {
    "firstname": "Another",
    "lastname": "John"
  },
  "password": "anotherPass123"
}
```

**Response (500 Internal Server Error):**
```json
{
  "error": "Email already exists"
}
```

---

## Example Usage

### cURL
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "password": "securePassword123"
  }'
```

### JavaScript (Fetch API)
```javascript
const response = await fetch('http://localhost:3000/users/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john@example.com',
    fullname: {
      firstname: 'John',
      lastname: 'Doe'
    },
    password: 'securePassword123'
  })
});

const data = await response.json();
console.log(data);
```

### Python (Requests)
```python
import requests

url = 'http://localhost:3000/users/register'
payload = {
    'email': 'john@example.com',
    'fullname': {
        'firstname': 'John',
        'lastname': 'Doe'
    },
    'password': 'securePassword123'
}

response = requests.post(url, json=payload)
print(response.json())
```

---

## Security Notes

- **Password Hashing:** Passwords are hashed using bcrypt with a salt of 10 rounds before storage.
- **JWT Token:** A JSON Web Token is generated and returned for authentication purposes.
- **Password Not Returned:** The password field is marked as `select: false` in the schema and is never returned in responses.
- **Email Uniqueness:** Email addresses must be unique in the database; attempting to register with an existing email will result in a database error.

---

## Important Validations

1. **Email Validation:** Must be a valid email format
2. **First Name:** Minimum 3 characters required
3. **Password:** Minimum 6 characters required
4. **Database Constraints:** 
   - Email must be unique
   - First name minimum 3 characters at schema level
   - Last name minimum 3 characters at schema level

---

## Token Usage

After successful registration, use the returned token in subsequent API requests by including it in the Authorization header:

```
Authorization: Bearer <token>
```

---
