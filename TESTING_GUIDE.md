# Admin Panel Testing Guide

## Quick Start

1. **Access Admin Login:**
   - URL: http://localhost:3000/admin/login
   - Username: `admin`
   - Password: `admin123`

## Test Scenarios

### 1. Admin Login
- ✅ Navigate to `/admin/login`
- ✅ Enter credentials: admin / admin123
- ✅ Should redirect to `/admin/dashboard`
- ✅ Dashboard shows stats and quick actions

### 2. Banner Management
**Steps:**
1. Click "Manage Banners" from dashboard
2. Select a route (Home/About/Finance/Contact)
3. Click "+ Add Banner"
4. Enter image URL: `https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920`
5. Set display order
6. Click "Add Banner"
7. Try dragging banners to reorder
8. Click delete (X) to remove a banner

**Expected Results:**
- Banners display in grid layout
- Drag & drop reordering works
- New banners appear immediately
- Delete confirmation appears

### 3. Add Single Vehicle
**Steps:**
1. Click "Add Vehicle" from dashboard
2. Fill in vehicle details:
   - Model: `Tesla Model Y`
   - Variant: `Long Range AWD`
   - Price: `52990`
   - Range: `330 miles`
   - Top Speed: `135 mph`
   - 0-60: `4.8 seconds`
3. Add multiple images:
   - Click "+ Add Image"
   - Enter image URLs (3-5 images)
   - Check "Primary" for first image
4. Click "Add Vehicle"

**Expected Results:**
- Form validation works
- Multiple image inputs appear
- Success message on submission
- Redirects to vehicle list

### 4. Bulk Upload Vehicles
**Steps:**
1. Click "Bulk Upload" from dashboard
2. Fill in first vehicle details
3. Click "+ Add Another Vehicle"
4. Fill in second vehicle
5. Add images to each vehicle
6. Click "Upload X Vehicles"

**Test Data:**
```
Vehicle 1:
- Model: Porsche 911
- Variant: Carrera S
- Price: 113300
- Top Speed: 191 mph
- 0-60: 3.3 seconds
- Images: 3 URLs

Vehicle 2:
- Model: Audi e-tron GT
- Variant: RS
- Price: 142400
- Range: 238 miles
- 0-60: 3.1 seconds
- Images: 4 URLs
```

**Expected Results:**
- Can add unlimited vehicles
- Each vehicle has independent image list
- All vehicles created in single transaction
- Shows success count

### 5. Vehicle List Management
**Steps:**
1. Click "Vehicle List" from dashboard
2. Use search box to filter vehicles
3. Click eye icon to view vehicle details
4. Click trash icon to delete vehicle

**Expected Results:**
- All vehicles display in table
- Search filters in real-time
- View redirects to public detail page
- Delete shows confirmation dialog

### 6. Vehicle Detail Page (Public)
**Steps:**
1. Go to any vehicle from inventory
2. Observe image gallery
3. Click left/right arrows
4. Click thumbnail images
5. View image counter

**Test Vehicles with Multiple Images:**
- Vehicle ID 1, 2, 3 (Tesla models with 7 images each)
- Any newly added vehicles

**Expected Results:**
- Main image displays prominently
- Arrow buttons appear on hover
- Thumbnails show below main image
- Active thumbnail has blue ring
- Smooth transitions between images
- Image counter shows "X / Y"
- Works on mobile (swipe gestures)

## Sample Image URLs for Testing

### Car Images:
```
https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800
https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800
https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800
https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800
https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800
https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800
https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800
```

### Banner Images:
```
https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80
https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&q=80
https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1920&q=80
https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1920&q=80
```

## Database Verification

### Check Images for a Vehicle:
```sql
SELECT * FROM vehicle_images WHERE vehicle_id = 1 ORDER BY display_order;
```

### Check Banner Images:
```sql
SELECT * FROM banner_images WHERE route = 'home' ORDER BY display_order;
```

### Check Admin User:
```sql
SELECT * FROM admin_users;
```

## Common Issues & Solutions

### Issue: Admin login fails
**Solution:** 
- Verify admin_users table exists
- Check password is exactly `admin123`
- Clear browser localStorage

### Issue: Images not loading
**Solution:**
- Check image URLs are valid
- Verify vehicle_images table has data
- Check browser console for errors

### Issue: Banners not appearing
**Solution:**
- Verify banner_images table
- Check is_active = true
- Verify route name matches exactly

### Issue: Bulk upload fails
**Solution:**
- Ensure all required fields filled
- Check at least one image per vehicle
- Verify database connection

## Performance Testing

### Load Test:
1. Upload 50 vehicles via bulk upload
2. Check page load time
3. Test search performance
4. Test image gallery with 10+ images

### Expected Performance:
- Dashboard loads < 1 second
- Vehicle list with 100+ vehicles < 2 seconds
- Image gallery smooth 60fps transitions
- Search filters instant (< 100ms)

## Mobile Testing

### Responsive Design:
- ✅ Admin login works on mobile
- ✅ Dashboard cards stack vertically
- ✅ Vehicle forms scroll properly
- ✅ Image gallery supports touch swipe
- ✅ Thumbnails scroll horizontally

## Browser Compatibility

Test in:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Features Demonstrated

### Multi-Image Gallery:
- [x] Multiple images per vehicle
- [x] Primary image selection
- [x] Display order management
- [x] Arrow navigation
- [x] Thumbnail selection
- [x] Smooth transitions
- [x] Image counter
- [x] Responsive layout

### Admin Panel:
- [x] Secure login
- [x] Dashboard with stats
- [x] Banner management
- [x] Single vehicle add
- [x] Bulk vehicle upload
- [x] Vehicle list & search
- [x] Delete functionality

### Banner System:
- [x] Route-specific banners
- [x] Drag & drop ordering
- [x] Add/delete banners
- [x] Preview capability
- [x] Display order control

## Security Checklist

Before deploying to production:
- [ ] Change admin password
- [ ] Implement JWT tokens
- [ ] Add password hashing (bcrypt)
- [ ] Add rate limiting
- [ ] Implement CORS properly
- [ ] Add input validation
- [ ] Sanitize user inputs
- [ ] Use prepared statements (already done)
- [ ] Add HTTPS
- [ ] Implement image upload (not URLs)

## Success Criteria

All tests pass if:
1. ✅ Admin login works
2. ✅ Dashboard displays stats
3. ✅ Can add single vehicle with multiple images
4. ✅ Can bulk upload vehicles
5. ✅ Can manage banners
6. ✅ Vehicle detail shows image gallery
7. ✅ Can navigate images with arrows
8. ✅ Can select images via thumbnails
9. ✅ Search and delete work
10. ✅ No console errors

## Next Steps

After testing:
1. Deploy to production server
2. Set up image CDN
3. Implement actual file uploads
4. Add more admin features
5. Create user documentation
6. Set up monitoring/analytics
