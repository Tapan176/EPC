const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const helper = require('../utils/helper');

const signUp = async (req, res, next) => {
  try {
    const {
      firstName, lastName, email, password, confirmPassword,
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
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ isSignUpSuccessfull: true });
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
      req.session.user = { id: user._id.toString(), email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role };
      res.status(200).json({ isLoginSuccessfull: true });
    } else {
      throw new Error('incorrect_password');
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    if (req.user) {
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
    const emailSubject = `Reset password link for you EPC account.`;

    const linkToSend = `http://localhost:${process.env.CLIENT_SERVER_PORT}/reset-password?token=${resetToken}`;
    const emailbody = `Here is your reset password link ${linkToSend}.\nIf you haven't changed your password please report it to our customer service as soon as possible.`;
    
    await helper.sendEmail(email, emailSubject, emailbody, linkToSend);

    res.status(200).json({ code: 'reset_token_sent_successfully', message: 'Reset token sent successfully', isEmailSent: true });
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

    res.status(200).json({ code: 'password_reset_successful', message: 'Password reset successful', ispasswordReseted: true });
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