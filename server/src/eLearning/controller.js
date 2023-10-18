const Course = require('../models/courses');
const Category = require('../models/categories');
const Enrollment = require('../models/enrollments');

const addCourse = async (req, res, next) => {
  try {
    const existingCourse = await Course.findOne({ title: req.body.title, createdBy: req.user.id });
    if (existingCourse) {
      throw new Error('course_already_exist');
    }

    const categoryTitle = req.body.category;

    let categoryId;

    const category = await Category.findOne({ title: categoryTitle });
    if (category) {
      categoryId = category._id;
    } else {
      const newCategory = new Category({ title: categoryTitle });
      await newCategory.save();
      categoryId = newCategory._id;
    }

    const course = new Course({
      title: req.body.title,
      description: req.body.description,
      categoryId,
      createdBy: req.user.id,
      modifiedBy: req.user.id,
      duration: req.body.duration,
      createdAt: new Date(),
      modifiedAt: new Date(),
      totalEnrollments: 0,
    });

    await course.save();

    res.status(201).json({ code: 'course_added', message: 'Course added successfully' });
  } catch (error) {
    next(error);
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findOne({ _id: req.params.courseId });
    if (course) {
      res.status(200).json(course);
    } else {
      throw new Error('course_not_found');
    }
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const {
      title, description, duration,
    } = req.body;

    const course = await Course.findOne({ _id: courseId });

    if (!course) {
      throw new Error('course_not_found');
    }

    if (course.createdBy.toString() !== req.user.id.toString()) {
      throw new Error('course_not_authorized');
    }

    course.title = title;
    course.description = description;
    course.duration = duration;
    course.modifiedBy = req.user.id;
    course.modifiedAt = new Date();

    await course.save();

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findOne({ _id: courseId });

    if (!course) {
      throw new Error('course_not_found');
    }

    if (course.createdBy.toString() !== req.user.id.toString()) {
      throw new Error('course_not_authorized');
    }

    await Course.findOneAndDelete({ _id: courseId });

    res.status(200).json({ code: 'course_deleted', message: 'Course deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const enrollInCourse = async (req, res, next) => {
  try {
    const alreadyEnrolled = await Enrollment.findOne({ $and: [ { userId: req.user.id }, { courseId: req.params.courseId } ]})

    if (alreadyEnrolled) {
      throw new Error('already_enrolled');
    }

    const enrollmentDate = new Date();
    const courseDuration = (await Course.findOne( { _id: req.params.courseId } )).duration;

    const weeksMatch = courseDuration.match(/^(\d+) weeks$/);

    const numWeeks = parseInt(weeksMatch[1], 10);

    const dueDate = new Date(enrollmentDate.getTime() + numWeeks * 7 * 24 * 60 * 60 * 1000);

    const enrollment = new Enrollment({
      userId: req.user.id,
      courseId: req.params.courseId,
      enrollmentDate,
      dueDate,
    });

    await enrollment.save();

    res.status(201).json({ code: 'course_enrolled', message: 'Course enrolled successfully' });

  } catch (error) {
    next(error);
  }
};

const getCoursesOfUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userEnrollments = await Enrollment.find({ user: userId });

    res.status(200).json(userEnrollments);
  } catch (error) {
      next(error);
  }
};

const searchCourse = async (req, res, next) => {
  try {
    const searchString = req.query.searchString;
    const courses = await Course.find({
        $or: [
            { title: { $regex: searchString, $options: 'i' } },
            { description: { $regex: searchString, $options: 'i' } },
        ],
    });

    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

const getCourseByCategory = async (req, res, next) => {
  try {
    const category = req.query.category;
    const categoryId = await Category.findOne({ title: category });

    const courses = await Course.find({ categoryId: categoryId._id });

    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

const applyFilters = async (req, res, next) => {
  try {
    const query = {};

    if (req.query.category) {
      const category = await Category.findOne({ title: req.query.category });
      query.categoryId = category._id;
    }

    if (req.query.minPrice && req.query.maxPrice) {
      query.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
    } else if (req.query.minPrice) {
      query.price = { $gte: req.query.minPrice };
    } else if (req.query.maxPrice) {
      query.price = { $lte: req.query.maxPrice };
    }

    const courses = await Course.find(query);
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  searchCourse,
  getCoursesOfUser,
  getCourseByCategory,
  applyFilters,
  enrollInCourse,
};
