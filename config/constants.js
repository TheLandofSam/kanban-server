const actions = {//these are the actions a user can possibly do..., will register all of these with actions 
  create: 'Create',
  update: 'Update',
  remove: 'Remove',
  find: 'Find',
  findAll: 'Find All'
}

const models = {//models is a dictionary
  board: {
    name: 'Board',
    endpoint: 'boards',//tells api it will be /boards, instead of /board
    useCustomRoutes: true//tells app to go into the custom routes dir and use the custom route, must use proper naming constrictions. must be called user-routes,sam-routes, sid-routes etc.
  },
  list: {
    name: 'List',
    endpoint: 'lists'
  },
  task: {
    name: 'Task',
    endpoint: 'tasks'
  },
  comment: {
    name: 'Comment',
    endpoint: 'comments'
  },
  user: {
    name: 'User',
    endpoint: 'users',
    preventDefaultApi: true,//b/c you shouldnt just be able to req user data, if set to false, anyone would have access to user data.
    useCustomRoutes: true//tells app to go into the custom routes dir and use the custom route, must use proper naming constrictions. must be called user-routes, sam-routes, sid-routes etc.
  }
}


export  {
  actions,
  models
}