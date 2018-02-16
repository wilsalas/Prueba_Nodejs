'use strict'

const mongoose = require('mongoose'),
    StudentShema = mongoose.Schema({
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

var StudentModel = mongoose.model('students', StudentShema);

function GetAllStudents(condition, callback) {
    StudentModel.find(condition, callback).limit(100).sort({ _id: 1 })
    .select({'identificacion':1,'nombres':1,'apellidos':1,'genero':1});
}
function NewStudent(object, callback) {
    let students = new StudentModel(object)
    students.save(callback);
}
function UpdateStudent(id, object, callback) {
    StudentModel.findByIdAndUpdate(id, object, callback);
}
function DeleteStudent(id, callback) {
    StudentModel.findByIdAndRemove(id, callback);
}

module.exports = {
    StudentModel,
    GetAllStudents,
    NewStudent,
    UpdateStudent,
    DeleteStudent
}