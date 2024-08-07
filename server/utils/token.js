import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.email,
      role: user.role, 
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

export default generateToken;
