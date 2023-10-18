const { ValidationError } = require('express-validation');

const errorHandler = (err, req, res, next) => {
  const errorMap = {
    password_and_confirm_password_do_not_match: {
      code: 'password_and_confirm_password_do_not_match',
      message: 'Password and confirm password do not match',
      statusCode: 400,
    },
    user_not_found: {
      code: 'user_not_found',
      message: 'User not found',
      statusCode: 404,
    },
    incorrect_password: {
      code: 'incorrect_password',
      message: 'Incorrect password',
      statusCode: 401,
    },
    authentication_failed: {
      code: 'authentication_failed',
      message: 'Authentication failed',
      statusCode: 500,
    },
    user_has_not_login: {
      code: 'user_has_not_login',
      message: 'User has not login',
      statusCode: 400,
    },
    logout_failed: {
      code: 'logout_failed',
      message: 'Logout failed',
      statusCode: 500,
    },
    user_already_exists: {
      code: 'user_already_exists',
      message: 'User already exists',
      statusCode: 409,
    },
    failed_to_register_user: {
      code: 'failed_to_register_user',
      message: 'Failed to register user',
      statusCode: 500,
    },
    invalid_token: {
      code: 'invalid_token',
      message: 'Invalid token',
      statusCode: 401,
    },
    invalid_verification: {
      code: 'invalid_verification',
      message: 'Invalid verification',
      statusCode: 401,
    },
    new_email_must_be_different_from_current_email: {
      code: 'new_email_must_be_different_from_current_email',
      message: 'New email must be different from current email',
      statusCode: 400,
    },
    email_already_used: {
      code: 'email_already_used',
      message: 'Email already used by another user',
      statusCode: 409,
    },
    new_password_same_as_old_password: {
      code: 'new_password_same_as_old_password',
      message: 'New password cannot be the same as the old password',
      statusCode: 400,
    },
    failed_to_send_email: {
      code: 'failed_to_send_email',
      message: 'Failed to send email',
      statusCode: 500,
    },
    add_course_failed: {
      code: 'add_course_failed',
      message: 'Failed to add course',
      statusCode: 500,
    },
    fetch_courses_failed: {
      code: 'fetch_courses_failed',
      message: 'Failed to fetch courses',
      statusCode: 500,
    },
    update_course_failed: {
      code: 'update_course_failed',
      message: 'Failed to update course',
      statusCode: 500,
    },
    delete_course_failed: {
      code: 'delete_course_failed',
      message: 'Failed to delete course',
      statusCode: 500,
    },
    course_already_exist: {
      code: 'course_already_exist',
      message: 'course already exists for the user',
      statusCode: 409,
    },
    course_not_found: {
      code: 'course_not_found',
      message: 'course not found',
      statusCode: 404,
    },
    course_not_authorized: {
      code: 'course_not_authorized',
      message: 'You are not authorized to update or delete this course',
      statusCode: 403,
    },
    cart_not_found: {
      code: 'cart_not_found',
      message: 'Cart not found',
      statusCode: 404,
    },
    fetch_cart_failed: {
      code: 'fetch_cart_failed',
      message: 'Failed to fetch cart',
      statusCode: 500,
    },
    increase_quantity_failed: {
      code: 'increase_quantity_failed',
      message: 'Failed to increase quantity',
      statusCode: 500,
    },
    decrease_quantity_failed: {
      code: 'decrease_quantity_failed',
      message: 'Failed to decrease quantity',
      statusCode: 500,
    },
    delete_course_from_cart_failed: {
      code: 'delete_course_from_cart_failed',
      message: 'Failed to delete course from cart',
      statusCode: 500,
    },
    empty_cart_failed: {
      code: 'empty_cart_failed',
      message: 'Failed to empty cart',
      statusCode: 500,
    },
    empty_cart: {
      code: 'empty_cart',
      message: 'Cart is empty',
      statusCode: 400,
    },
    invalid_category_id: {
      code: 'invalid_category_id',
      message: 'Invalid category ID',
      statusCode: 400,
    },
    category_not_found: {
      code: 'category_not_found',
      message: 'Category not found',
      statusCode: 404,
    },
    invalid_search_string: {
      code: 'invalid_search_string',
      message: 'Invalid search string',
      statusCode: 400,
    },
  };

  const customError = errorMap[err.message];
  console.error(err);

  const statusCode = customError ? customError.statusCode : err.statusCode;

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  res.status(statusCode).json({
    error: {
      code: customError ? customError.code : err.code,
      message: customError ? customError.message : err.message,
    },
  });
};

module.exports = { errorHandler };