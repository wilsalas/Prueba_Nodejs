'use strict'

const mongoose = require('mongoose'),
    TeacherShema = mongoose.Schema({
        identificacion: {
            type: String,
            require: true
        },
        nombres: {
            type: String,
            require: true
        },
        apellidos: {
            type: String,
            require: true
        },
        genero: {
            type: String,
            enum: ['Masculino', 'Femenino', 'Otros'],
            require: true
        }
    });

var Teachers = mongoose.model('teachers', TeacherShema);

function GetAllTeachers(condition, callback) {
    Teachers.find(condition, callback).limit(100).sort({ _id: 1 })
    .select({'identificacion':1,'nombres':1,'apellidos':1,'genero':1});
}
function NewTeacher(object, callback) {
    let teachers = new Teachers(object)
    teachers.save(callback);
}
function UpdateTeacher(id, object, callback) {
    Teachers.findByIdAndUpdate(id, object, callback);
}
function DeleteTeacher(id, callback) {
    Teachers.findByIdAndRemove(id, callback);
}

module.exports = {
    Teachers,
    GetAllTeachers,
    NewTeacher,
    UpdateTeacher,
    DeleteTeacher
}