# Aryals Dealer - Admin Panel

## Admin Access

**Login URL:** http://localhost:3000/admin/login

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

## Admin Features

### 1. Dashboard (`/admin/dashboard`)
- Overview statistics (total vehicles, available, sold, total value)
- Quick action buttons
- Recent activity log

### 2. Banner Manager (`/admin/banners`)
- Manage banner images for different routes (Home, About, Finance, Contact)
- Add new banner images
- Reorder banners via drag & drop
- Delete banners
- Preview banners

### 3. Vehicle Management

#### Add Single Vehicle (`/admin/vehicles/add`)
- Add one vehicle at a time with all details:
  - Basic Info: Model, Variant, Price, Status
  - Specifications: Mileage, Range, Top Speed, Acceleration
  - Colors & Features: Exterior/Interior colors, Wheels, Autopilot, Seat Layout
  - Multiple Images: Add multiple images with primary image selection
  - Additional Features: Text area for extra details

#### Bulk Upload (`/admin/vehicles/bulk`)
- Add multiple vehicles simultaneously
- Each vehicle can have:
  - All vehicle details
  - Multiple images per vehicle
  - Quick form with essential fields
- Add more vehicles dynamically with "+ Add Another Vehicle" button
- Efficient for large inventory updates

#### Vehicle List (`/admin/vehicles`)
- View all vehicles in a table format
- Search vehicles by model or variant
- View vehicle details
- Delete vehicles
- Shows vehicle image, price, status, location

## Public Features

### Vehicle Detail Page
- **Image Gallery:**
  - Primary large image display
  - Auto-scrolling carousel with arrows
  - Thumbnail gallery below main image
  - Click thumbnails to select specific images
  - Image counter (e.g., "3 / 7")
  - Smooth transitions between images

## Database Schema

### Tables Created:
1. **admin_users** - Admin authentication
2. **vehicle_images** - Multiple images per vehicle
3. **banner_images** - Route-specific banner images
4. **vehicles** - Main vehicle data (existing)

### Key Features:
- Foreign key constraints for data integrity
- Primary image selection for each vehicle
- Display order for both vehicle images and banners
- Active/inactive flags for banners

## API Endpoints

### Admin Routes:
- POST `/api/admin/login` - Admin authentication
- GET `/api/admin/banners?route=home` - Get banners by route
- POST `/api/admin/banners` - Add banner
- PUT `/api/admin/banners/order` - Update banner order
- DELETE `/api/admin/banners/:id` - Delete banner
- GET `/api/admin/vehicles/:vehicleId/images` - Get vehicle images
- POST `/api/admin/vehicles/images` - Add vehicle images
- DELETE `/api/admin/vehicles/images/:id` - Delete image
- POST `/api/admin/vehicles/bulk` - Bulk create vehicles

### Enhanced Vehicle Routes:
- GET `/api/vehicles/:id` - Now includes images array

## Usage Instructions

### Adding a Vehicle with Multiple Images:
1. Navigate to `/admin/vehicles/add`
2. Fill in all vehicle details
3. Add multiple image URLs (first image is primary by default)
4. Click "+ Add Image" to add more images
5. Submit the form

### Bulk Uploading Vehicles:
1. Navigate to `/admin/vehicles/bulk`
2. Fill in details for first vehicle
3. Click "+ Add Another Vehicle" to add more
4. Add images for each vehicle
5. Submit to upload all vehicles at once

### Managing Banners:
1. Navigate to `/admin/banners`
2. Select route (Home, About, Finance, Contact)
3. Add new banners with image URLs
4. Drag banners to reorder
5. Delete unwanted banners

### Viewing Vehicle with Multiple Images:
1. Go to any vehicle detail page
2. Use arrow buttons or thumbnail gallery to browse images
3. Images transition smoothly with animations
4. Mobile-friendly touch gestures supported

## Security Notes

⚠️ **For Production:**
- Change default admin password immediately
- Implement proper password hashing (bcrypt)
- Add JWT authentication
- Add role-based access control
- Implement file upload for images instead of URLs
- Add image size/format validation
- Add CSRF protection
- Use HTTPS only

## Technologies Used

### Backend:
- Node.js + Express
- MySQL with connection pooling
- RESTful API design

### Frontend:
- React 18 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API calls
- React Router for navigation

## Development

### Start Backend:
```bash
cd backend
npm start
```

### Start Frontend:
```bash
cd frontend
npm run dev
```

### Access Points:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Admin: http://localhost:3000/admin/login

## Future Enhancements

- [ ] Actual file upload instead of URL input
- [ ] Image compression and optimization
- [ ] Bulk image upload
- [ ] Vehicle editing functionality
- [ ] Analytics dashboard
- [ ] Customer inquiries management
- [ ] Test drive scheduling
- [ ] Sales tracking
- [ ] Inventory alerts
- [ ] Multi-admin support with roles
