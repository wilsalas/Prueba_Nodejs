'use strict'

const StudentModel = require('../models/StudentModel');

function GetAllStudents(req, res) {
    StudentModel.GetAllStudents({}, (err, result) => {
        err ? res.status(500).send({ message: `Error loading information ${err}` }) : res.status(200).send(result)
    })
}
function NewStudent(req, res) {
    if (info(req).nombres !== '' && info(req).apellidos !== '' && info(req).genero !== '' && info(req).identificacion !== '') {
        StudentModel.NewStudent(info(req), (err, result) => {
            err ? res.status(500).send({ message: `Error when saving ${err}` }) : res.status(200).send({ message: `Successfully saved` })
        })
    } else {
        res.send({ message: '' })
    }
}
function UpdateStudent(req, res) {
    if (info(req).nombres !== '' && info(req).apellidos !== '' && info(req).genero !== '' && info(req).identificacion !== '') {
        StudentModel.UpdateStudent(req.body.id, info(req), (err, result) => {
            err ? res.status(500).send({ message: `Error when updating ${err}` }) : res.status(200).send({ message: `Successfully updated` })
        })
    } else {
        res.send({ message: '' })
    }
}
function DeleteStudent(req, res) {
    if (req.body.id !== '') {
        StudentModel.DeleteStudent(req.body.id, (err, result) => {
            err ? res.status(500).send({ message: `Error when removing ${err}` }) : res.status(200).send({ message: `Successfully removed` })
        })
    } else {
        res.send({ message: '' })
    }
}

function info(req) {
    let students = {
        identificacion: req.body.identificacion,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        genero: req.body.genero
    }
    return students;
}

module.exports = {
    GetAllStudents,
    NewStudent,
    UpdateStudent,
    DeleteStudent
}