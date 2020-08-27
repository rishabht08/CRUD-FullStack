const router = require("express").Router();

const { createTaskController,getTasksController,getTaskByIdController,updateTaskController,deleteTaskByIdController,deleteTaskController } = require("./todos.controller");
const { authorization } = require("../../config/middlewares/authorization");


router.route("/create").post(authorization,createTaskController);
router.route("/").get(authorization,getTasksController);
router.route("/:task_id").get(authorization,getTaskByIdController);
router.route("/update/:task_id").post(authorization,updateTaskController);
router.route("/delete/:task_id").delete(authorization,deleteTaskByIdController);
router.route("/delete").delete(authorization,deleteTaskController);

module.exports = router;