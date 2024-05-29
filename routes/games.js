// Файл routes/games.js

const gamesRouter = require('express').Router();

const { findAllGames, findGameById, checkIfCategoriesAvaliable, createGame, checkIsVoteRequest, checkIfUsersAreSafe, updateGame, deleteGame } = require('../middlewares/games');
const { sendAllGames, sendGameById, sendGameCreated, sendGameUpdated, sendGameDeleted } = require('../controllers/games');
const { checkAuth } = require("../middlewares/auth.js");
const { checkIsGameExists, checkEmptyFields } = require('../middlewares/users.js');

gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.post(
  "/games",
  findAllGames,
  checkIsGameExists,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  createGame,
  sendGameCreated
);

gamesRouter.put(
  "/games/:id",
  findGameById,
  checkIsVoteRequest,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  updateGame,
  sendGameUpdated
);

gamesRouter.delete(
  "/games/:id", 
  checkAuth, 
  deleteGame,
  sendGameDeleted
); 

module.exports = gamesRouter;