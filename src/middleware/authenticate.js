const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Ambil token dari header Authorization
  
    if (!token) {
      return res.status(403).json({ message: 'Token tidak disertakan' });
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token tidak valid', error: err });
      }
  
      // Periksa apakah token memiliki data user yang valid
      if (!decoded || !decoded.user) {
        return res.status(403).json({ message: 'Token tidak mengandung data user yang valid' });
      }
  
      req.user = decoded.user; // Menyimpan data user di req.user
      next(); // Lanjutkan ke route handler
    });
  };
  
  
module.exports = authenticate;
