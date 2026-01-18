# Test Drive Feature Setup Guide

## Overview
This feature allows customers to schedule test drives from vehicle detail pages and provides an admin panel to manage these requests.

## What Was Added

### Backend
1. **Database Schema** (`backend/config/test_drives_schema.sql`)
   - New `test_drives` table to store customer requests
   
2. **Controller** (`backend/controllers/testDriveController.js`)
   - Submit test drive requests
   - Get all test drives with filtering and sorting
   - Update request status
   - Delete requests
   - Get statistics

3. **Routes** (`backend/routes/testDriveRoutes.js`)
   - POST `/api/test-drives` - Submit new request
   - GET `/api/test-drives` - Get all requests (with filters)
   - GET `/api/test-drives/stats` - Get statistics
   - GET `/api/test-drives/:id` - Get single request
   - PUT `/api/test-drives/:id/status` - Update status
   - DELETE `/api/test-drives/:id` - Delete request

### Frontend
1. **Test Drive Form Component** (`frontend/src/components/TestDriveForm.jsx`)
   - Modal form with calendar date picker
   - Time slot selection
   - Customer information fields (name, email, phone, address)
   - Form validation and error handling

2. **Admin Test Drives Page** (`frontend/src/pages/TestDriveRequests.jsx`)
   - Statistics dashboard
   - Filtering by status (pending, confirmed, completed, cancelled)
   - Sorting options (latest, oldest, by date)
   - Search functionality
   - Expandable card view with full customer details
   - Status update buttons (Confirm, Complete, Cancel)
   - Delete functionality

3. **Updated Pages**
   - `VehicleDetail.jsx` - Added "Schedule Test Drive" button with modal
   - `AdminDashboard.jsx` - Added "Test Drives" quick action card
   - `App.jsx` - Added route for `/admin/test-drives`

## Setup Instructions

### 1. Database Setup
Run the following command to create the test_drives table:

```bash
cd backend
node scripts/setup-test-drives.js
```

Or manually run the SQL from `backend/config/test_drives_schema.sql` in your database.

### 2. Start the Backend Server
```bash
cd backend
npm run dev
```

The API will be available at `http://localhost:5000`

### 3. Start the Frontend
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Usage

### Customer Side
1. Go to any vehicle detail page
2. Click "Schedule Test Drive" button
3. Fill in the form:
   - Full Name
   - Email
   - Phone Number
   - Address
   - Preferred Date (calendar picker)
   - Preferred Time (dropdown with time slots)
   - Optional message
4. Submit the form
5. Receive confirmation message

### Admin Side
1. Login to admin panel at `/admin/login`
2. From dashboard, click "Test Drives" card
3. View all test drive requests with:
   - Total statistics
   - Status breakdown (pending, confirmed, completed, cancelled)
4. Use filters:
   - Search by customer name, email, or vehicle
   - Filter by status
   - Sort by date (latest/oldest/by appointment date)
5. Click on any request to expand and see:
   - Full customer contact information
   - Vehicle details
   - Preferred schedule
   - Additional messages
6. Take actions:
   - **Confirm** - Mark as confirmed
   - **Complete** - Mark as completed
   - **Cancel** - Mark as cancelled
   - **Delete** - Remove the request

## Features

### Form Features
- ✅ Calendar date picker (prevents past dates)
- ✅ Time slot dropdown (9 AM - 5 PM)
- ✅ Full form validation
- ✅ Success/error messages
- ✅ Responsive design
- ✅ Animated modal

### Admin Features
- ✅ Real-time statistics
- ✅ Multi-filter support
- ✅ Search functionality
- ✅ Expandable card view
- ✅ Status management
- ✅ Date sorting
- ✅ Delete functionality
- ✅ Responsive design

## API Endpoints

### Public Endpoints
- `POST /api/test-drives` - Submit test drive request
  ```json
  {
    "vehicle_id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "address": "123 Main St, City, State",
    "preferred_date": "2026-02-01",
    "preferred_time": "10:00 AM",
    "message": "Optional message"
  }
  ```

### Admin Endpoints
- `GET /api/test-drives?status=pending&sort=latest` - Get all requests
- `GET /api/test-drives/stats` - Get statistics
- `GET /api/test-drives/:id` - Get single request
- `PUT /api/test-drives/:id/status` - Update status
  ```json
  {
    "status": "confirmed" // pending, confirmed, completed, cancelled
  }
  ```
- `DELETE /api/test-drives/:id` - Delete request

## Database Schema

```sql
test_drives (
  id INT PRIMARY KEY AUTO_INCREMENT,
  vehicle_id INT NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time VARCHAR(50) NOT NULL,
  message TEXT,
  status ENUM('pending', 'confirmed', 'completed', 'cancelled'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
)
```

## Troubleshooting

### Database Connection Error
Make sure your database is running and the connection settings in `.env` are correct:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=car_dealership
```

### Table Creation Failed
If the setup script fails, manually run the SQL from:
`backend/config/test_drives_schema.sql`

### Form Not Submitting
1. Check if backend server is running
2. Check browser console for errors
3. Verify API_BASE_URL in `frontend/src/config/api.js`

### Admin Panel Not Loading
1. Make sure you're logged in as admin
2. Check if the route is added in `App.jsx`
3. Verify the backend API is responding

## Next Steps

You can enhance this feature with:
- Email notifications to customers when status changes
- SMS notifications
- Calendar integration
- Automated reminders
- Availability checking to prevent double bookings
- Google Maps integration for directions
- Export to CSV functionality
- Analytics and reporting
