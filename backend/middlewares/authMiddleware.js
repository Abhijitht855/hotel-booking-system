import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded data to the request
    console.log('Decoded User:', req.user); // Log the decoded user object
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};


export const authorizeAdmin = (req, res, next) => {
   if (req.user?.role == 'user') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

 
 
 
