'use strict'

const express = require('express'),
    router = express.Router(),
    StudentController = require('../controllers/StudentController'),
    TeacherController = require('../controllers/TeacherController'),
    CourseController = require('../controllers/CourseController');

var path = {
    urlView: {
        normal:'/',
        home:'/home'
    },
    student: {
        normal: '/students',
        id: '/students/:id'
    },
    teacher: {
        normal: '/teachers',
        id: '/teachers/:id'
    },
    course: {
        normal: '/courses',
        id: '/courses/:id'
    }
};
/*Routes for Views */
router.get(path.urlView.normal, (req, res) => {
    res.render('home');
})

router.post(path.urlView.home, (req, res) => {
    if (req.body.email === "admin@mail.com" && req.body.password === "admin") {
        res.send({ message: `Welcome ${req.body.email}`, login: 'success' });
    } else {
        res.send({ message: "User Or Password Invalid", login: '' });
    }
})
/*Routes for Students */
router.get(path.student.normal, StudentController.GetAllStudents);
router.post(path.student.normal, StudentController.NewStudent);
router.put(path.student.id, StudentController.UpdateStudent);
router.delete(path.student.id, StudentController.DeleteStudent);
/*Routes for Teachers */
router.get(path.teacher.normal, TeacherController.GetAllTeachers);
router.post(path.teacher.normal, TeacherController.NewTeacher);
router.put(path.teacher.id, TeacherController.UpdateTeacher);
router.delete(path.teacher.id, TeacherController.DeleteTeacher);
/*Routes for Courses */
router.get(path.course.normal, CourseController.GetAllCourses);
router.post(path.course.normal, CourseController.NewCourse);
router.put(path.course.id, CourseController.UpdateCourse);
router.delete(path.course.id, CourseController.DeleteCourse);

module.exports = router;