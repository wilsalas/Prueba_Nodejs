'use strict'

const mongoose = require('mongoose'),
    CourseShema = mongoose.Schema({
        codigo: {
            type: String,
            require: true
        },
        nombre: {
            type: String,
            require: true
        },
        observaciones: {
            type: String,
            require: true
        }
    });

var Courses = mongoose.model('courses', CourseShema);

function GetAllCourses(condition, callback) {
    Courses.find(condition, callback).limit(100).sort({ _id: 1 })
    .select({'codigo':1,'nombre':1,'observaciones':1});
}
function NewCourse(object, callback) {
    let courses = new Courses(object)
    courses.save(callback);
}
function UpdateCourse(id, object, callback) {
    Courses.findByIdAndUpdate(id, object, callback);
}
function DeleteCourse(id, callback) {
    Courses.findByIdAndRemove(id, callback);
}

module.exports = {
    Courses,
    GetAllCourses,
    NewCourse,
    UpdateCourse,
    DeleteCourse
}