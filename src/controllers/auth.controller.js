import { registerUser, loginUser } from '../services/auth.service.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const trimmedEmail = email.trim().toLowerCase();

    const user = await registerUser(trimmedEmail, password);
    return res.status(201).json({
      message: 'User registered successfully',
      user
    });
  } catch (error) {
    if (error.message.includes('Unique constraint')) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Set response headers to prevent caching of sensitive auth data
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');

    const result = await loginUser(trimmedEmail, password);
    
    return res.status(200).json({
      message: 'Login successful',
      token: result.token,
      user: result.user
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
