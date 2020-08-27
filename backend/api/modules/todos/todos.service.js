const SQL_QUERIES = {
    CREATE_TASK: "insert into tasks (user_id,task_name,task_status , task_date) values (?,?,?,?)",
    GET_TASKS: "select * from tasks where user_id = ?",
    GET_TASK_BY_ID: "select * from tasks where user_id = ? && task_id = ?",
    UPDATE_TASK: "update tasks set task_name = ? , task_status = ? , task_date = ? where user_id = ? && task_id = ?",
    DELETE_TASK_BY_ID: "delete from tasks where user_id = ? && task_id = ?",
    DELETE_TASK:"delete from tasks where user_id = ?"
}

const createTaskService = (db,task) =>{
    let params = Object.keys(task).map(key => task[key]);
    return db.query(SQL_QUERIES.CREATE_TASK,params);
}

const getTasksService = (db,userId) => {
    return db.query(SQL_QUERIES.GET_TASKS,[userId])
}
const getTaskByIdService = (db,userId,taskId) => {
    return db.query(SQL_QUERIES.GET_TASK_BY_ID,[userId,taskId])
}

const updateTaskService = (db,task,userId,task_id) => {
    let params = Object.keys(task).map(key => task[key]);
    params.push(userId);
    params.push(task_id);
    return db.query(SQL_QUERIES.UPDATE_TASK,params);
}

const deleteTaskService = (db,userId) => {
    return db.query(SQL_QUERIES.DELETE_TASK,[userId]);
}
const deleteTaskByIdService = (db,userId,task_id) => {
    return db.query(SQL_QUERIES.DELETE_TASK_BY_ID,[userId,task_id]);
}

module.exports = {
    createTaskService,
    getTasksService,
    getTaskByIdService,
    updateTaskService,
    deleteTaskService,
    deleteTaskByIdService
}