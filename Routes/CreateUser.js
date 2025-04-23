const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


router.post('/createuser', [
  body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    
    console.log("Encrypted password to be saved:", secPassword);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword,
      location: req.body.location
    });

    res.json({ success: true });

  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});



router.post('/loginuser', [
  body('email').isEmail(),
  body('password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: "Please enter valid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(400).json({ errors: "Please enter valid credentials" });
    }

    return res.json({ success: true });

  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

module.exports = router;
