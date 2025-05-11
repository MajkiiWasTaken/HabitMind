const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Register request received:', { username, email, password });

  try {
    // Kontrola duplicity
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hashování hesla
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // Najdi posledního uživatele (dle nejvyššího indexu)
    const lastUser = await User.findOne().sort({ index: -1 });

    // Ověř a nastav další index bezpečně
    const lastIndex = lastUser && typeof lastUser.index === 'number' && !isNaN(lastUser.index)
      ? lastUser.index
      : 0;

    const nextIndex = lastIndex + 1;

    // Vytvoř uživatele
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      index: nextIndex
    });

    await newUser.save();
    console.log('User created successfully:', newUser);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        index: newUser.index
      }
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body; // Changed to 'username'
  try {
    const user = await User.findOne({ username }); // Find user by username
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        index: user.index
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
