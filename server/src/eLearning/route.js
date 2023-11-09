const express = require('express');
const router = express.Router();
const courseController = require('./controller'); // Import the controller

const { authenticate } = require('../middleware/authentication');
// ... (other imports, authentication, validation, and Swagger definitions)

// Define your course routes using the courseController methods
router.get('/courses', courseController.getAllCourses);
router.post('/courses', authenticate, courseController.addCourse);
router.post('/courses/enroll', authenticate, courseController.enrollInCourse);
router.get('/courses/search', courseController.searchCourse);
router.get('/courses/myCourses', authenticate, courseController.getCoursesOfUser);
router.get('/courses/:courseId', courseController.getCourseById);
router.put('/courses/:courseId', authenticate, courseController.updateCourse);
router.post('/courses/:courseId/enroll', authenticate, courseController.enrollInCourse);
router.delete('/courses/:courseId', authenticate, courseController.deleteCourse);
router.get('/category/courses', courseController.getCourseByCategory);
router.get('/courses/filter', courseController.applyFilters);

module.exports = router;
