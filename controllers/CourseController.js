'use strict'

const CourseModel = require('../models/CourseModel');

function GetAllCourses(req, res) {
    CourseModel.GetAllCourses({}, (err, result) => {
        err ? res.status(500).send({ message: `Error loading information ${err}` }) : res.status(200).send(result)
    })
}
function NewCourse(req, res) {
    if (info(req).codigo !== '' && info(req).nombre !== '' && info(req).observaciones !== '') {
        CourseModel.NewCourse(info(req), (err, result) => {
            err ? res.status(500).send({ message: `Error when saving ${err}` }) : res.status(200).send({ message: `Successfully saved` })
        })
    } else {
        res.send({ message: '' })
    }
}
function UpdateCourse(req, res) {
    if (info(req).codigo !== '' && info(req).nombre !== '' && info(req).observaciones !== '') {
        CourseModel.UpdateCourse(req.body.id, info(req), (err, result) => {
            err ? res.status(500).send({ message: `Error when updating ${err}` }) : res.status(200).send({ message: `Successfully updated` })
        })
    } else {
        res.send({ message: '' })
    }
}
function DeleteCourse(req, res) {
    if (req.body.id !== '') {
        CourseModel.DeleteCourse(req.body.id, (err, result) => {
            err ? res.status(500).send({ message: `Error when removing ${err}` }) : res.status(200).send({ message: `Successfully removed` })
        })
    } else {
        res.send({ message: '' })
    }
}

function info(req) {
    let courses = {
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        observaciones: req.body.observaciones
    }
    return courses;
}
module.exports = {
    GetAllCourses,
    NewCourse,
    UpdateCourse,
    DeleteCourse
}