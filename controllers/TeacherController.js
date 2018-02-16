'use strict'

const TeacherModel = require('../models/TeacherModel');

function GetAllTeachers(req, res) {
    TeacherModel.GetAllTeachers({}, (err, result) => {
        err ? res.status(500).send({ message: `Error loading information ${err}` }) : res.status(200).send(result)
    })
}
function NewTeacher(req, res) {
    if (info(req).nombres !== '' && info(req).apellidos !== '' && info(req).genero !== '' && info(req).identificacion !== '') {
        TeacherModel.NewTeacher(info(req), (err, result) => {
            err ? res.status(500).send({ message: `Error when saving ${err}` }) : res.status(200).send({ message: `Successfully saved` })
        })
    } else {
        res.send({ message: '' })
    }
}
function UpdateTeacher(req, res) {
    if (info(req).nombres !== '' && info(req).apellidos !== '' && info(req).genero !== '' && info(req).identificacion !== '') {
        TeacherModel.UpdateTeacher(req.body.id, info(req), (err, result) => {
            err ? res.status(500).send({ message: `Error when updating ${err}` }) : res.status(200).send({ message: `Successfully updated` })
        })
    } else {
        res.send({ message: '' })
    }
}
function DeleteTeacher(req, res) {
    if (req.body.id !== '') {
        TeacherModel.DeleteTeacher(req.body.id, (err, result) => {
            err ? res.status(500).send({ message: `Error when removing ${err}` }) : res.status(200).send({ message: `Successfully removed` })
        })
    } else {
        res.send({ message: '' })
    }
}

function info(req) {
    let teachers = {
        identificacion: req.body.identificacion,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        genero: req.body.genero
    }
    return teachers;
}

module.exports = {
    GetAllTeachers,
    NewTeacher,
    UpdateTeacher,
    DeleteTeacher
}