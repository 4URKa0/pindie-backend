// Создаём роут для запросов пользователей 
const usersRouter = require('express').Router();

// Импортируем вспомогательные функции
const {findAllUsers, filterPassword, findUserById, checkEmptyNameAndEmailAndPassword, hashPassword, createUser, updateUser, deleteUser} = require('../middlewares/users');
const {sendAllUsers, sendUserById, sendUserCreated, sendUserUpdated, sendUserDeleted, sendMe} = require('../controllers/users');
const { checkAuth } = require("../middlewares/auth.js");
const { checkIsUserExists } = require('../middlewares/categories.js');

// Обрабатываем GET-запрос с роутом '/users'
usersRouter.get("/users", findAllUsers, filterPassword, sendAllUsers);
usersRouter.get("/users/:id", findUserById, filterPassword, sendUserById);
usersRouter.get("/me", checkAuth, sendMe);

usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);

usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);

usersRouter.delete(
    "/users/:id",
    checkAuth,
    deleteUser,
    sendUserDeleted
); 

// Экспортируем роут для использования в приложении — app.js
module.exports = usersRouter;