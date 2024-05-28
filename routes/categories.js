// Создаём роут для запросов категорий 
const categoriesRouter = require('express').Router();

// Импортируем вспомогательные функции
const findAllCategories = require('../middlewares/categories');
const sendAllCategories = require('../controllers/categories');

// Обрабатываем GET-запрос с роутом '/categories'
categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);

categoriesRouter.post(
  "/categories",
  findAllCategories,
  createCategory,
  sendCategoryCreated
);

categoriesRouter.put(
  "/categories/:id",
  updateCategory,
  sendCategoryUpdated
);

gamesRouter.delete(
  "/categories/:id", // Слушаем запросы по эндпоинту
  deleteCategory,
  sendCategoryDeleted// Тут будут функция удаления элементов из MongoDB и ответ клиенту
); 


// Экспортируем роут для использования в приложении — app.js
module.exports = categoriesRouter;