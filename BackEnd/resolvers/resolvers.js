const User = require('../models/User');
const { generateToken, hashPassword, comparePassword } = require('../utils/auth');

const checkRole = (user, role) => {
  if (user.role !== role) {
    throw new Error(`Unauthorized, must be a ${role}`);
  }
};

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    // Add queries that require user authentication and role checking
  },
  Mutation: {
    registerUser: async (_, { email, password, role }) => {
      const hashedPassword = await hashPassword(password);
      const user = await User.create({ email, password: hashedPassword, role });
      const token = generateToken(user);

      return {
        token,
        user,
      };
    },
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const token = generateToken(user);

      return {
        token,
        user,
      };
    },
  },
};

module.exports = resolvers;
