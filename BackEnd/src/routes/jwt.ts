import express = require('express');
import jwt from 'jsonwebtoken';

const router = express.Router();

const SECRET = process.env.SECRET || 'secret';

router.post('/', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || '';
    jwt.verify(token, SECRET);

    return res.status(200).json(true);
  } catch (error) {
    return res.status(401).json(false);
  }
});

export default router;
