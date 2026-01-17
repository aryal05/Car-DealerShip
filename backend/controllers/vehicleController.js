import pool from '../config/database.js';

// Get all vehicles with filters
export const getVehicles = async (req, res) => {
  try {
    const { 
      model, 
      status, 
      minPrice, 
      maxPrice, 
      color, 
      autopilot,
      wheels,
      search,
      sort = 'created_at',
      order = 'DESC'
    } = req.query;

    let query = 'SELECT * FROM vehicles WHERE 1=1';
    const params = [];

    if (model) {
      query += ' AND model LIKE ?';
      params.push(`%${model}%`);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (minPrice) {
      query += ' AND price >= ?';
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      query += ' AND price <= ?';
      params.push(parseFloat(maxPrice));
    }

    if (color) {
      query += ' AND exterior_color LIKE ?';
      params.push(`%${color}%`);
    }

    if (autopilot !== undefined) {
      query += ' AND autopilot = ?';
      params.push(autopilot === 'true' ? 1 : 0);
    }

    if (wheels) {
      query += ' AND wheels LIKE ?';
      params.push(`%${wheels}%`);
    }

    if (search) {
      query += ' AND (model LIKE ? OR variant LIKE ? OR exterior_color LIKE ? OR location LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    // Add sorting
    const allowedSortFields = ['price', 'created_at', 'mileage', 'range_epa'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    query += ` ORDER BY ${sortField} ${sortOrder}`;

    const [vehicles] = await pool.query(query, params);
    res.json({ success: true, count: vehicles.length, data: vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single vehicle
export const getVehicle = async (req, res) => {
  try {
    const [vehicles] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [req.params.id]);
    
    if (vehicles.length === 0) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    // Get vehicle images
    const [images] = await pool.query(
      'SELECT image_url FROM vehicle_images WHERE vehicle_id = ? ORDER BY is_primary DESC, display_order ASC',
      [req.params.id]
    );

    const vehicle = vehicles[0];
    vehicle.image_urls = images.map(img => img.image_url);

    res.json({ 
      success: true, 
      data: vehicle
    });
  } catch (error) {
    console.error('Get vehicle error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create vehicle
export const createVehicle = async (req, res) => {
  try {
    const {
      model, variant, price, original_price, after_tax_credit, mileage,
      range_epa, top_speed, acceleration, exterior_color, interior_color,
      wheels, autopilot, seat_layout, additional_features, image_url,
      status, inventory_type, location
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO vehicles (model, variant, price, original_price, after_tax_credit, 
       mileage, range_epa, top_speed, acceleration, exterior_color, interior_color, 
       wheels, autopilot, seat_layout, additional_features, image_url, status, 
       inventory_type, location) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [model, variant, price, original_price, after_tax_credit, mileage,
       range_epa, top_speed, acceleration, exterior_color, interior_color,
       wheels, autopilot, seat_layout, additional_features, image_url,
       status, inventory_type, location]
    );

    res.status(201).json({ 
      success: true, 
      message: 'Vehicle created successfully',
      data: { id: result.insertId }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update vehicle
export const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      model, variant, price, original_price, after_tax_credit, mileage,
      range_epa, top_speed, acceleration, exterior_color, interior_color,
      wheels, autopilot, seat_layout, additional_features, image_url,
      status, inventory_type, location
    } = req.body;

    const [result] = await pool.query(
      `UPDATE vehicles SET 
       model = ?, variant = ?, price = ?, original_price = ?, after_tax_credit = ?, 
       mileage = ?, range_epa = ?, top_speed = ?, acceleration = ?, 
       exterior_color = ?, interior_color = ?, wheels = ?, autopilot = ?, 
       seat_layout = ?, additional_features = ?, image_url = ?, status = ?, 
       inventory_type = ?, location = ?, updated_at = NOW()
       WHERE id = ?`,
      [model, variant, price, original_price, after_tax_credit, mileage,
       range_epa, top_speed, acceleration, exterior_color, interior_color,
       wheels, autopilot, seat_layout, additional_features, image_url,
       status, inventory_type, location, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    res.json({ success: true, message: 'Vehicle updated successfully' });
  } catch (error) {
    console.error('Update vehicle error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM vehicles WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    res.json({ success: true, message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get filter options
export const getFilterOptions = async (req, res) => {
  try {
    const [models] = await pool.query('SELECT DISTINCT model FROM vehicles ORDER BY model');
    const [colors] = await pool.query('SELECT DISTINCT exterior_color FROM vehicles WHERE exterior_color IS NOT NULL ORDER BY exterior_color');
    const [wheelsOptions] = await pool.query('SELECT DISTINCT wheels FROM vehicles WHERE wheels IS NOT NULL ORDER BY wheels');
    const [statuses] = await pool.query('SELECT DISTINCT status FROM vehicles ORDER BY status');

    res.json({
      success: true,
      data: {
        models: models.map(m => m.model),
        colors: colors.map(c => c.exterior_color),
        wheels: wheelsOptions.map(w => w.wheels),
        statuses: statuses.map(s => s.status)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get statistics
export const getStats = async (req, res) => {
  try {
    const [totalCount] = await pool.query('SELECT COUNT(*) as total FROM vehicles');
    const [availableCount] = await pool.query('SELECT COUNT(*) as count FROM vehicles WHERE status = "Available"');
    const [soldCount] = await pool.query('SELECT COUNT(*) as count FROM vehicles WHERE status = "Sold Out"');
    const [totalValue] = await pool.query('SELECT SUM(price) as total FROM vehicles');

    res.json({
      success: true,
      data: {
        totalVehicles: totalCount[0].total,
        availableVehicles: availableCount[0].count,
        soldVehicles: soldCount[0].count,
        totalValue: totalValue[0].total || 0
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
