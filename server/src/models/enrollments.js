const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dueDate: {
    type: Date,
    default: function() {
      const dueDate = Date.now.getTime() + 8 * 7 * 24 * 60 * 60 * 1000;
      return dueDate;
    },
    required: true,
  },
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
