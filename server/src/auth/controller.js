const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const helper = require('../utils/helper');

const signUp = async (req, res, next) => {
  try {
    const {
      name, email, password, confirmPassword, address,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error('user_already_exists');
    }

    if (password !== confirmPassword) {
      throw new Error('password_and_confirm_password_do_not_match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      address,
    });

    await user.save();

    res.status(201).json();
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('user_not_found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      req.session.user = { id: user._id.toString(), email: user.email, name: user.name };
      res.status(204).json();
    } else {
      throw new Error('incorrect_password');
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    if (req.session.user) {
      req.session.destroy((error) => {
        if (error) {
          throw new Error('logout_failed');
        } else {
          res.status(204).json();
        }
      });
    } else {
      throw new Error('user_has_not_login');
    }
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error('user_not_found');
    }

    const resetToken = helper.generateToken({ email });
    const linkToSend = `http://localhost:${process.env.SERVER_PORT}/resetpassword?token=${resetToken}`;

    await helper.sendEmail(email, linkToSend);

    res.status(200).json({ code: 'reset_token_sent_successfully', message: 'Reset token sent successfully' });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { newPassword, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email: decoded.email });

    if (!existingUser) {
      throw new Error('user_not_found');
    }

    if (newPassword !== confirmPassword) {
      throw new Error('password_and_confirm_password_do_not_match');
    }

    const passwordMatch = await bcrypt.compare(newPassword, existingUser.password);

    if (passwordMatch) {
      throw new Error('new_password_same_as_old_password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    existingUser.password = hashedPassword;
    existingUser.updatedAt = new Date();
    await existingUser.save();

    res.status(200).json({ code: 'password_reset_successful', message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
};