/**
 * API Configuration
 * 
 * Centralized configuration for all API endpoints.
 * Uses environment variables for production deployment.
 */

// Base URL for API requests
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://car-dealership-production-3c2c.up.railway.app/api';

// Base URL for uploaded images
export const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL || 'https://car-dealership-production-3c2c.up.railway.app/uploads';
