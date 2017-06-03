let Boards = require('../models/board')
let Lists = require('../models/list')
let Tasks = require('../models/task')
let Comments = require('../models/comment')

// var resources = {
//     Boards,
//     Lists,
//     Tasks,
//     Comments
// }


// function LoadEntityWithRelationship(resource, relation, id, action){
// return new Promis((resolve, reject) => {
// resources[resource].findById(id).then(entity => {
//     var relationField = resource.toLowerCase() + 'Id'
//     var query = {}
//     query[relationField] = id
//     resources[relation].find({query}).then(relations => {
//         entity[relation.toLowerCase()] = relations
//         resolve(handleResponse(action, entity))
//     }).catch(error => {
//         reject(handleResponse(action, null, error))
//     })
// }).catch(error => {
//         reject(handleResponse(action, null, error))
//     })


// })

// }




export default {
    getListsOnBoard: {
        path: '/boards/:boardId/lists',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Get All Lists On A Board'
            Boards.findById(req.params.boardId)
                .then(board => {
                    Lists.find({ boardId: req.params.boardId })
                        .then(lists => {
                            board.lists = lists
                            res.send(handleResponse(action, board))
                        }).catch(error => {
                            next(handleResponse(action, null, error))
                        })
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },

    getTasksOnLists: {
        path: '/boards/:boardId/lists/:listId/tasks',
        reqType: 'get',
        method(req, res, next) {
            console.log('Sail Aways')
            let action = 'Return list and all tasks with that list id'
            Lists.findById(req.params.listId)
                .then(list => {
                    Tasks.find({ listId: req.params.listId })
                        .then(tasks => {
                            console.log(list)
                            list.tasks = tasks
                            res.send(handleResponse(action, list))
                        }).catch(error => {
                            return next(handleResponse(action, null, error))
                        })
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    getCommentsByTask: {
            path: '/boards/:boardId/lists/:listId/tasks/:taskId/comments',
            reqType: 'get',
            method(req, res, next) {
                console.log("sail away")
                let action = 'Return comments associated with a Task'
                Tasks.findById(req.params.taskId)
                    .then(task => {
                        Comments.find({ taskId: req.params.taskId })
                            .then(comments => {
                                task.comments = comments
                                res.send(handleResponse(action, task))
                            }).catch(error => {
                                return next(handleResponse(action, null, error))
                            })
                    }).catch(error => {
                        return next(handleResponse(action, null, error))
                    })
            }
        },
        getTasksAndAllComments: {
            path: '/boards/:boardId/lists/:listId/tasks/comments',
            reqType: 'get',
            method(req, res, next) {
                console.log('Sail Aways')
                let action = 'Return list and all tasks with their comments'
                Lists.findById(req.params.listId)
                    .then(list => {
                        Tasks.find({ listId: req.params.listId })
                            .then(tasks => {
                                list.tasks = tasks
                                Promise.all(tasks.map(task => {
                                    return Comments.find({ taskId: task._id })
                                        .then(comments => {
                                            task.comments = comments
                                        }).catch(error => {
                                            return next(handleResponse(action, null, error))
                                        })

                                })).then(() => {
                                    res.send(handleResponse(action, list))
                                }).catch(error => {
                                    return next(handleResponse(action, null, error))
                                })
                            }).catch(error => {
                                return next(handleResponse(action, null, error))
                            })
                    }).catch(error => {
                        return next(handleResponse(action, null, error))
                    })
            }
        }
    }




function handleResponse(action, data, error) {
    var response = {
        action: action,
        data: data
    }
    if (error) {
        response.error = error
    }
    return response
}