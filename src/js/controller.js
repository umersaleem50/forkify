import 'core-js/stable';
import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import paginationView from './view/paginationView.js';
// import { render } from 'sass';
import bookmarkView from './view/bookmarkView.js';
import addRecipeView from './view/addRecipeView.js';
// import setTimeout from 'core-js/fn/set-timeout';
import { CLOSE_MODEL_TIME } from './config.js';
// const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlSearchResult = async function () {
  try {
    //GET QUERY FROM INPUT
    const query = searchView.getQuery();
    //RENDER SPINNER
    resultView.renderSpinner();
    //GET DATA OF RECIPES FROM SERVER USING INPUT
    await model.searchRecipe(query);
    // searchView.clean();
    // console.log(model.state.search.results.length);
    // if (model.state.search.results.length === 0) return;

    // console.log(model.getSearchResultsPage(2));

    //RENDER THAT RESULTS
    resultView.render(model.getSearchResultsPage());

    //RENDER PAGENATIONS
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err.message);
  }
};

// controlSearchResult();

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    //REQUEST DATA
    if (!id) return;

    recipeView.renderSpinner();
    //  REQUEST DATA
    await model.loadRecipe(id);

    //UPDATE RECIPE RESULTS VIEW

    resultView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);

    // const { recipe } = model.state;
    //RENDER DATA
    recipeView.render(model.state.recipe);
  } catch (err) {
    // console.log(err);
    recipeView.renderError();
  }
  // model.updateServings(8);
  // console.log(recipe);
};
// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipes)
// );
// window.addEventListener('hashchange', showRecipe);
const controlPagination = function (page) {
  // console.log('clicked');
  resultView.render(model.getSearchResultsPage(page));

  //RENDER PAGENATIONS

  paginationView.render(model.state.search);
};

const controlUpdateServings = function (servings) {
  //UPDATE NEW INGREDIENTS BASED ON SERVINGS
  model.updateServings(servings);
  //RE RENDER THE RECIPEVIEW DOM
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  bookmarkView.render(model.state.bookmarks);

  // console.log(model.state.bookmarks);
  recipeView.update(model.state.recipe);
};
const controlRestoreSavedBookmarks = function () {
  model.getsavedBookmarks();
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (recipe) {
  // console.log(recipe);
  try {
    //1 SHOW SPINNER
    addRecipeView.renderSpinner();

    await model.addRecipe(recipe);

    // model.state.recipe = data.recipe;
    console.log(model.state.recipe);

    //SHOW SUCESS MESSAGE
    addRecipeView.renderMessage();

    //CLOSE WINDOW AFTER TIME
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, CLOSE_MODEL_TIME * 1000);

    //RENDER
    recipeView.render(model.state.recipe);

    bookmarkView.render(model.state.bookmarks);
    // console.log(model.state.recipe);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // console.log(res);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  // model.getsavedBookmarks();

  bookmarkView.addHandlerLoadBookmark(controlRestoreSavedBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlUpdateServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);

  addRecipeView.addHandlerAddRecipe(controlAddRecipe);
  // console.log('startedd');
};

init();
// controlRecipes();
