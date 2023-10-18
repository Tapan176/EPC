var express = require('express');
var router = express.Router();

const authRoutes = require('../src/auth/route');
const eLearningRoutes = require('../src/eLearning/route');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.use('/auth', authRoutes);
router.use('/eLearning', eLearningRoutes);

module.exports = router;
