// Файл middlewares/categories.js

// Импортируем модель
const categories = require('../models/category');

const findAllCategories = async (req, res, next) => {
    // По GET-запросу на эндпоинт /categories найдём все документы категорий
  req.categoriesArray = await categories.find({});
  next();
}

// middlewares/categories.js
const findCategoryById = async (req, res, next) => {
  console.log("GET /categories/:id");
  try {
    req.category = await categories.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: "Категория не найдена" }));
  }
};

const updateCategory = async (req, res, next) => {
  try {
      // В метод передаём id из параметров запроса и объект с новыми свойствами
    req.game = await games.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка обновления категории" });
  }
};


const createCategory = async (req, res, next) => {
  console.log("POST /categories");
  try {
    req.category = await categories.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка создания категории" }));
  }
};

const deleteCategory = async (req, res, next) => {
  console.log("DELETE /categories/:id");
  try {
    req.category = await categories.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка удаления категории" }));
  }
};

const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return req.body.email === user.email;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Пользователь с таким email уже существует" }));
  } else {
    next();
  }
};

const checkIsCategoryExists = async (req, res, next) => {
  const isInArray = req.categoriesArray.find((category) => {
    return req.body.name === category.name;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Категория с таким названием уже существует" }));
  } else {
    next();
  }
};


// Экспортируем функцию поиска всех категорий
module.exports = {
    findAllCategories,
    createCategory,
    findCategoryById,
    updateCategory,
    deleteCategory,
    checkIsUserExists,
    checkIsCategoryExists
}; 