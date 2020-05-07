const { Task } = require('../models')

class TaskController {
    static create(req, res, next) {
        const { title, description, category, due_date } = req.body;
        const UserId = req.currentUserId

        Task.create({
            title,
            description,
            category,
            due_date: new Date(due_date),
            UserId
        })
        .then(task => {
            res.status(201).json({ task })
        })
        .catch(err => {
            next(err)
        })
    }

    static findAll(req, res, next) {
        const UserId = req.currentUserId

        Task.findAll({ where: { UserId }})
            .then(tasks => {
                res.status(200).json({ tasks })
            })
            .catch(err => { next(err) })
    }

    static update(req, res, next) {
        const { title, description, category, due_date } = req.body;
        const { id } = req.params;

        Task.update({
            title,
            description,
            category,
            due_date: new Date(due_date)
        }, {
            where: { id },
            returning: true
        })
        .then(edited => {
            res.status(200).json({
                task: edited
            })
        })
        .catch(err => { next(err) })
    }

    static delete(req, res, next) {
        const { id } = req.params;

        Task.destroy({ where: { id }})
            .then(_=> {
                res.status(200).json({
                    msg: `Task with id ${id} has been deleted`
                })
            })
            .catch(err => { next(err) })
    }
}

module.exports = TaskController