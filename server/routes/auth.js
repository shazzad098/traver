const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST /api/auth/signup
// @desc    Register user
router.post('/signup', async (req, res) => {
  const { name, email, password, role, adminSecret } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // ✅ Decide role safely (backend decides, not frontend)
    let finalRole = 'user';

    // Option 1: First user becomes admin automatically
    const usersCount = await User.countDocuments();
    if (usersCount === 0) {
      finalRole = 'admin';
    }

    // Option 2: Admin secret can promote to admin
    // (This allows creating another admin later, only if secret matches)
    if (
      role === 'admin' &&
      adminSecret &&
      process.env.ADMIN_SECRET &&
      adminSecret === process.env.ADMIN_SECRET
    ) {
      finalRole = 'admin';
    }

    user = new User({
      name,
      email,
      password,
      role: finalRole,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '30d' },
      (err, token) => {
        if (err) throw err;
        const { password, ...userWithoutPassword } = user.toObject();
        res.json({ token, user: userWithoutPassword });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '30d' },
            (err, token) => {
                if (err) throw err;
                const { password, ...userWithoutPassword } = user.toObject();
                res.json({ token, user: userWithoutPassword });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
