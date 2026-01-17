# Aryals Dealer - Car Dealership Website

A professional, full-stack car dealership website built with React, Node.js, Express, and MySQL.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS and Framer Motion animations
- **Vehicle Inventory**: Browse, search, and filter vehicles with advanced options
- **Detailed Vehicle Pages**: Comprehensive vehicle information with specifications
- **Real-time Search**: Instant search across models, colors, and locations
- **Advanced Filters**: Filter by model, status, price range, autopilot, and more
- **RESTful API**: Full CRUD operations for vehicle management
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MySQL** database
- **CORS** enabled
- **RESTful API** architecture

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MySQL** (v8.0 or higher)

## 🔧 Installation

### 1. Clone or Navigate to Project Directory

```bash
cd CAR-DEALERSHIP
```

### 2. Database Setup

#### Create MySQL Database

1. Open MySQL command line or MySQL Workbench
2. Run the following commands:

```sql
CREATE DATABASE IF NOT EXISTS aryals_dealer;
USE aryals_dealer;
```

3. Import the schema:

```bash
cd backend
mysql -u root -p aryals_dealer < config/schema.sql
```

Or manually execute the SQL from `backend/config/schema.sql`

#### Configure Database Connection

Edit `backend/.env` file with your MySQL credentials:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=aryals_dealer
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### 4. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🚀 Running the Application

1. **Start MySQL** service
2. **Start Backend**: `cd backend && npm run dev`
3. **Start Frontend**: `cd frontend && npm run dev`
4. **Open Browser**: Navigate to `http://localhost:3000`

## 📡 API Endpoints

### Vehicles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vehicles` | Get all vehicles (with filters) |
| GET | `/api/vehicles/:id` | Get single vehicle |
| POST | `/api/vehicles` | Create new vehicle |
| PUT | `/api/vehicles/:id` | Update vehicle |
| DELETE | `/api/vehicles/:id` | Delete vehicle |
| GET | `/api/vehicles/filters` | Get filter options |
| GET | `/api/vehicles/stats` | Get statistics |

### Query Parameters for GET `/api/vehicles`

- `model` - Filter by vehicle model
- `status` - Filter by status (new/used/demo)
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `color` - Filter by exterior color
- `autopilot` - Filter by autopilot (true/false)
- `wheels` - Filter by wheel type
- `search` - Search across multiple fields
- `sort` - Sort field (price, created_at, mileage, range_epa)
- `order` - Sort order (ASC/DESC)

## 🎨 Features Breakdown

### Home Page
- Hero section with animations
- Feature highlights
- Premium brands showcase
- Call-to-action sections

### Inventory Page
- Grid layout with vehicle cards
- Advanced filtering system
- Real-time search
- Sort options
- Responsive design

### Vehicle Detail Page
- Large hero image
- Comprehensive specifications
- Key features display
- Contact options
- Call-to-action buttons

### Contact Page
- Contact form
- Business information
- Social media links
- Operating hours

## 🎯 Default Sample Data

The database comes pre-populated with sample vehicles including:
- Tesla Model Y variants
- Tesla Model S
- Tesla Model 3
- Tesla Model X

All with detailed specifications, pricing, and features.

## 📱 Responsive Design

- **Desktop**: Full-featured layout with sidebar filters
- **Tablet**: Optimized grid layouts
- **Mobile**: Collapsible menus and stacked layouts

## 🎨 Animations

Built with Framer Motion:
- Page transitions
- Scroll animations
- Hover effects
- Loading states
- Smooth interactions

## 🔒 Environment Variables

### Backend (.env)
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=aryals_dealer
```

### Frontend (optional)
Create `frontend/.env` for custom API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

## 🛠️ Development Commands

### Backend
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📦 Production Build

### Frontend
```bash
cd frontend
npm run build
```

The build files will be in `frontend/dist`

### Backend
The backend runs as-is in production. Make sure to:
1. Set `NODE_ENV=production`
2. Use proper MySQL credentials
3. Enable SSL for database connections
4. Set up proper CORS origins

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check credentials in `.env`
- Ensure database exists
- Check firewall settings

### Port Already in Use
- Change PORT in backend `.env`
- Update proxy in frontend `vite.config.js`

### Module Not Found Errors
- Delete `node_modules`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## 📄 Project Structure

```
CAR-DEALERSHIP/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── schema.sql
│   ├── controllers/
│   │   └── vehicleController.js
│   ├── routes/
│   │   └── vehicleRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── VehicleDetail.jsx
│   │   │   └── Contact.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize for your needs.

## 📝 License

MIT License - feel free to use for personal or commercial projects.

## 👨‍💻 Author

**Aryals Dealer Development Team**

## 🙏 Acknowledgments

- React Team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Lucide for beautiful icons

---

**Enjoy building with Aryals Dealer! 🚗✨**
