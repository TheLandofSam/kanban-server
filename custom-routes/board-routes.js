let Boards = require('../models/board') //require is the node version of import
let Lists = require('../models/list')
let Tasks = require('../models/task')
let Comments = require('../models/comment')

export default {
  // getAll:{
  //   path: '/boards/:boardId/lists/:listId/tasks/:taskId/comments',
  //   reqType: 'get',
  //   method(req, res, next){
  //     let action = 'Get All'
  //     Lists.find({boardId: req.params.boardId})
  //       .then(lists => {
  //         lists.forEach(list=>{
  //           Tasks.find({listId: list._id})
  //           .then(tasks => {
  //             Comments.findById({taskId: task._id})          
  //       })
  //         res.send(handleResponse(action, lists))
  //       })
  //       })
  //       .catch(error => {
  //         return next(handleResponse(action, null, error))
  //       })
  //   }
  // },
  getListsByBoardId:{ 
    path: '/boards/:boardId/lists/', //: before wordmeans it is a variable
    reqType: 'get',
    method(req, res, next){
      let action = 'Get Lists'
      Boards.findById(req.params.boardId) //({boardId: req.params.boardId}) this says find me all objs where this is true, above says return all...
        .then(board => { //same as .then(function(board)){
          Lists.find({boardId: req.params.boardId})
          .then(lists=>{
            console.log("lists: " + lists)
            board.lists = lists//need to fix schema!!
              res.send(handleResponse(action, lists))
          }).catch(error => {
          return next(handleResponse(action, null, error))
        })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
   getTasksOnLists: { 
    path: '/boards/:boardId/lists/:listId/tasks',//Restful model for paths
    reqType: 'get',
    method(req, res, next){
      let action = 'Get tasks with Board Id'
      Lists.findById(req.params.listId) 
        .then(list => { 
          Tasks.find({listId: req.params.listId})
          .then(tasks=>{
            list.tasks = tasks
              res.send(handleResponse(action, tasks))
          }).catch(error => {
          return next(handleResponse(action, null, error))
        })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getCommentsByTask:{
    path: '/boards/:boardId/lists/:listId/tasks/:taskId/comments',
    reqType: 'get',
    method(req, res, next){
      let action = "return comments asso. with a task"
      Tasks.findById(req.params.taskId)
      .then(task => {
        Comments.find({taskId: req.params.taskId})
          .then(comments => {
            task.comments = comments
              res.send(handleResponse(action, comments))
          }).catch(error => {
          return next(handleResponse(action, null, error))
          })
      }).catch(error => {
          return next(handleResponse(action, null, error))
      })
    }
  },
  getTasksAndAllComments: { //this function brakes convention b/c it does two things.
    path: '/boards/:boardId/lists/:listId/tasks/comments',
    reqType: 'get',
    method(req, res, next){
      let action = 'Get lists and all tasks with their comments'
      Lists.findById(req.params.listId) 
        .then(list => { 
          Tasks.find({listId: req.params.listId})
          .then(lists=>{
            lists.tasks = tasks
            Promise.all(tasks.map(task =>{//.map itterates over an array and returns an action for each item in the array, and builds a brand new array, does not change org array
              return Comments.find({taskId: task._id})//comments.find always returns a promise, so we want to return our comments.find b/c we need to give our array...??
              .then(comments =>{
                task.comments = comments
              }).catch(error => {
                return next(handleResponse(action, null, error))
            })
            })).then(()=>{
              res.send(handleResponse(action, list))
            })
              
          }).catch(error => {
          return next(handleResponse(action, null, error))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
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
