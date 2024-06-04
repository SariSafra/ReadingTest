import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,  // Assuming you have a role field
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

export default generateToken;
