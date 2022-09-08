import * as model from './model.js';
import { URL, KEY } from './config.js';
import SearchView from './views/searchView.js';
import RecipeView from './views/recipeView.js';
import BookmarksView from './views/bookmarksView.js';
import AddRecipeView from './views/addRecipeView.js';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.substring(1);

    if (!id) return;

    RecipeView.renderSpinner();

    await model.getRecipe(`${URL}recipes/${id}`);

    RecipeView.renderRecipe(model.state.recipe);

    RecipeView.handleServingClick(controlServings);

    RecipeView.handleBookmark(controlBookmark);
  } catch (error) {
    RecipeView.renderError();
  }
};

const controlServings = function (serving) {
  if (serving === 0) {
    return;
  }
  model.updateServing(serving);
  RecipeView.updateRecipe(model.state.recipe);
};

const controlSearch = async function (query) {
  try {
    if (!query) return;

    model.state.search.query = query;

    SearchView.renderSpinner();

    await model.getSearchResults(`${URL}recipes?search=${query}`);

    SearchView.renderQuery(model.state.search.results);
  } catch (error) {
    SearchView.renderError();
  }
};

const controlBookmark = function () {
  model.updateBookmark();
  RecipeView.updateBookmarkView(model.state.recipe);
  BookmarksView.renderBookmarks(model.state.bookmarks);
};

const controlUpload = async function (data) {
  try {
    RecipeView.renderSpinner();
    await model.addRecipe(data);
    RecipeView.renderRecipe(model.state.recipe);

    RecipeView.handleServingClick(controlServings);

    RecipeView.handleBookmark(controlBookmark);
  } catch (error) {
    AddRecipeView.renderError();
    RecipeView.clearContainer();
  }
};
const init = function () {
  SearchView.getQuery(controlSearch);
  if (localStorage.getItem('bookmarks')) {
    model.state.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    BookmarksView.renderBookmarks(model.state.bookmarks);
  }
  AddRecipeView.handleUpload(controlUpload);
};

init();

if (module.hot) {
  module.hot.accept();
}

window.addEventListener('hashchange', function (e) {
  controlRecipe();
});
window.addEventListener('load', function (e) {
  controlRecipe();
});
