import pool from '../config/database.js';

// Submit a test drive request
export const submitTestDrive = async (req, res) => {
  try {
    const {
      vehicle_id,
      full_name,
      email,
      phone,
      address,
      preferred_date,
      preferred_time,
      message
    } = req.body;

    // Validate required fields
    if (!vehicle_id || !full_name || !email || !phone || !address || !preferred_date || !preferred_time) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Insert test drive request
    const [result] = await pool.query(
      `INSERT INTO test_drives 
       (vehicle_id, full_name, email, phone, address, preferred_date, preferred_time, message, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [vehicle_id, full_name, email, phone, address, preferred_date, preferred_time, message || null]
    );

    res.status(201).json({
      success: true,
      message: 'Test drive request submitted successfully',
      data: {
        id: result.insertId
      }
    });
  } catch (error) {
    console.error('Error submitting test drive:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting test drive request',
      error: error.message
    });
  }
};

// Get all test drive requests with vehicle details
export const getAllTestDrives = async (req, res) => {
  try {
    const { status, sort = 'latest', startDate, endDate } = req.query;

    let query = `
      SELECT 
        td.*,
        v.model,
        v.variant,
        v.image_url,
        v.price
      FROM test_drives td
      LEFT JOIN vehicles v ON td.vehicle_id = v.id
      WHERE 1=1
    `;

    const params = [];

    // Filter by status
    if (status && status !== 'all') {
      query += ' AND td.status = ?';
      params.push(status);
    }

    // Filter by date range
    if (startDate && endDate) {
      query += ' AND td.preferred_date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }

    // Sorting
    if (sort === 'latest') {
      query += ' ORDER BY td.created_at DESC';
    } else if (sort === 'oldest') {
      query += ' ORDER BY td.created_at ASC';
    } else if (sort === 'date_asc') {
      query += ' ORDER BY td.preferred_date ASC';
    } else if (sort === 'date_desc') {
      query += ' ORDER BY td.preferred_date DESC';
    }

    const [testDrives] = await pool.query(query, params);

    res.json({
      success: true,
      data: testDrives,
      count: testDrives.length
    });
  } catch (error) {
    console.error('Error fetching test drives:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching test drive requests',
      error: error.message
    });
  }
};

// Get single test drive by ID
export const getTestDriveById = async (req, res) => {
  try {
    const { id } = req.params;

    const [testDrives] = await pool.query(
      `SELECT 
        td.*,
        v.model,
        v.variant,
        v.image_url,
        v.price
      FROM test_drives td
      LEFT JOIN vehicles v ON td.vehicle_id = v.id
      WHERE td.id = ?`,
      [id]
    );

    if (testDrives.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Test drive request not found'
      });
    }

    res.json({
      success: true,
      data: testDrives[0]
    });
  } catch (error) {
    console.error('Error fetching test drive:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching test drive request',
      error: error.message
    });
  }
};

// Update test drive status
export const updateTestDriveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const [result] = await pool.query(
      'UPDATE test_drives SET status = ? WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Test drive request not found'
      });
    }

    res.json({
      success: true,
      message: 'Test drive status updated successfully'
    });
  } catch (error) {
    console.error('Error updating test drive status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating test drive status',
      error: error.message
    });
  }
};

// Delete test drive request
export const deleteTestDrive = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query('DELETE FROM test_drives WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Test drive request not found'
      });
    }

    res.json({
      success: true,
      message: 'Test drive request deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting test drive:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting test drive request',
      error: error.message
    });
  }
};

// Get test drive statistics
export const getTestDriveStats = async (req, res) => {
  try {
    const [stats] = await pool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled
      FROM test_drives
    `);

    res.json({
      success: true,
      data: stats[0]
    });
  } catch (error) {
    console.error('Error fetching test drive stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};
