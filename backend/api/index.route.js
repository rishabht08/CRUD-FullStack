const router  = require("express").Router();
const userRouter = require("./modules/users/users.route");
const todosRouter = require("./modules/todos/todos.route");

router.use("/user" , userRouter);
router.use("/todos",todosRouter);

module.exports = router;