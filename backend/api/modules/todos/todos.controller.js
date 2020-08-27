const {createTaskService,getTaskByIdService,getTasksService,updateTaskService,deleteTaskService,deleteTaskByIdService} = require("./todos.service");

const createTaskController = async (req,res)=>{
    try {
        let db = req.app.get("db");
        let user = req.app.get("user");

        let params = {user_id: user.userId,...req.body};
        let response = await createTaskService(db,params);

        if(response.insertId > 0){
            return res.json({
                success:true,
                message: "Todo created"
            })
        }else{
            return res.json({
                success:false,
                message: "Something went wrong"
            })
        }
    } catch (e) {
        console.log('e: ', e);
        return res.json({
            success:false,
            message: "Something went wrong",
            error:e
        })
    }
}

const getTasksController = async (req,res) => {
    try {
        let db = req.app.get("db");
        let user = req.app.get("user");
        let tasksList = await getTasksService(db,user.userId);

        if(tasksList instanceof Array){
            return res.json({
                success:true,
                data: tasksList
            })
        }else{
            return res.json({
                success:false,
                message: "Something went wrong"
            })
        }
    } catch (e) {
        return res.json({
            success:false,
            message: "Something went wrong"
        })    
    }
}

const getTaskByIdController = async (req,res) =>{
    try {
        let db = req.app.get("db");
        let user = req.app.get("user");

        let {task_id} = req.params;
        let task = await getTaskByIdService(db,user.userId,task_id);

        if(task instanceof Array){
            return res.json({
                success:true,
                data: task[0]
            })
        }else{
            return res.json({
                success:false,
                message: "Something went wrong"
            })
        }
    } catch (e) {
        return res.json({
            success:false,
            message: "Something went wrong"
        })
    }
}

const updateTaskController = async (req,res) =>{
    try {
        let db = req.app.get("db");
        let user = req.app.get("user");
        let {task_id} = req.params;
        let params = {...req.body};
        let response = await updateTaskService(db,params,user.userId,task_id);

        if(response.aaffectedRows > 0){
            return res.json({
                success: true,
                message: "User updated successfully"
            })
        }else{
            return res.json({
                success:false,
                message: "Something went wrong",
                response
            })
        }

    } catch (e) {
        return res.json({
            success:false,
            message: "Something went wrong",
            error:e
        })
    }
}

const deleteTaskByIdController = async(req,res) => {
    try {
        let db = req.app.get("db");
        let user = req.app.get("user");
        let {task_id} = req.params;
        let response = await deleteTaskByIdService(db,user.userId,task_id);

        if(response.affectedRows > 0){
            return res.json({
                success: true,
                message: "Task deleted successfully"
            })
        }else{
            return res.json({
                success:false,
                message: "Something went wrong"
            })
        }

    } catch (e) {
        return res.json({
            success:false,
            message: "Something went wrong"
        })
    }
}
const deleteTaskController = async(req,res) => {
    try {
        let db = req.app.get("db");
        let user = req.app.get("user");
        let response = await deleteTaskService(db,user.userId);

        if(response.affectedRows > 0){
            return res.json({
                success: true,
                message: "User all tasks deleted successfully"
            })
        }else{
            return res.json({
                success:false,
                message: "Something went wrong"
            })
        }

    } catch (e) {
        return res.json({
            success:false,
            message: "Something went wrong"
        })
    }
}
module.exports = {
    createTaskController,
    getTasksController,
    getTaskByIdController,
    updateTaskController,
    deleteTaskByIdController,
    deleteTaskController
}