import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined");
}

// Generate key
const generateJWT = (name, role, expiresIn = "1h") => {
  return jwt.sign(
    {
      data: {
        name: name,
        role: role,
      },
    },
    SECRET_KEY,
    { expiresIn: expiresIn },
  );
};

// Verify key
const verifyJWT = token => {
  return jwt.verify(token, SECRET_KEY);
};
export { generateJWT, verifyJWT };
