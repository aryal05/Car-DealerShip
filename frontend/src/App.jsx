import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import VehicleDetail from "./pages/VehicleDetail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Finance from "./pages/Finance";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import BannerManager from "./pages/BannerManager";
import AddVehicle from "./pages/AddVehicle";
import BulkUpload from "./pages/BulkUpload";
import AdminVehicleList from "./pages/AdminVehicleList";
import EditVehicle from "./pages/EditVehicle";
import TestDriveRequests from "./pages/TestDriveRequests";
import "./index.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes (No Navbar/Footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/banners" element={<BannerManager />} />
        <Route path="/admin/vehicles" element={<AdminVehicleList />} />
        <Route path="/admin/vehicles/add" element={<AddVehicle />} />
        <Route path="/admin/vehicles/bulk" element={<BulkUpload />} />
        <Route path="/admin/vehicles/edit/:id" element={<EditVehicle />} />
        <Route path="/admin/test-drives" element={<TestDriveRequests />} />

        {/* Public Routes (With Navbar/Footer) */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/vehicle/:id" element={<VehicleDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/finance" element={<Finance />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
