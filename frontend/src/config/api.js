/**
 * API Configuration
 * 
 * Centralized configuration for all API endpoints.
 * Automatically switches between local and production based on environment.
 */

// Determine if we're in development or production
const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost';

// Local development URLs
const LOCAL_API_URL = 'http://localhost:5000/api';
const LOCAL_UPLOAD_URL = 'http://localhost:5000/uploads';

// Production Railway URLs
const PRODUCTION_API_URL = 'https://car-dealership-production-3c2c.up.railway.app/api';
const PRODUCTION_UPLOAD_URL = 'https://car-dealership-production-3c2c.up.railway.app/uploads';

// Base URL for API requests - auto-switches based on environment
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (isDevelopment ? LOCAL_API_URL : PRODUCTION_API_URL);

// Base URL for uploaded images - auto-switches based on environment
export const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL || 
  (isDevelopment ? LOCAL_UPLOAD_URL : PRODUCTION_UPLOAD_URL);
