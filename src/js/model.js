import { getJSON, timeout } from './helpers.js';
import { Fraction } from 'fractional';
import { URL, KEY } from './config.js';
export const state = {
  bookmarks: [],
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};
export const getSearchResults = async function (url) {
  try {
    const resJSON = await Promise.race([getJSON(url), timeout(5)]);
    const {
      data: { recipes },
      results,
    } = resJSON;
    state.search.results = recipes.map(res => {
      return {
        id: res.id,
        publisher: res.publisher,
        title: res.title,
        image: res.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};
export const getRecipe = async function (url) {
  try {
    const resJSON = await Promise.race([getJSON(url), timeout(10)]);
    const {
      data: { recipe },
    } = resJSON;
    console.log(recipe);
    state.recipe.id = recipe.id;
    state.recipe.publisher = recipe.publisher;
    state.recipe.title = recipe.title;
    state.recipe.image = recipe.image_url;
    state.recipe.ingredients = recipe.ingredients;
    state.recipe.ingredients.forEach(ing => {
      if (ing.quantity !== null) ing.quantity = new Fraction(ing.quantity);
    });
    state.recipe.source = recipe.source_url;
    state.recipe.servings = recipe.servings;
    state.recipe.cookingTime = recipe.cooking_time;
    //state.recipe.bookmark = false;
    const found = state.bookmarks.find(ele => {
      if (ele.id === state.recipe.id) {
        return ele;
      }
    });
    if (found) state.recipe.bookmark = true;
    else state.recipe.bookmark = false;
    /* console.log(found);
    console.log(state.recipe);*/
  } catch (error) {
    throw error;
  }
};

export const updateServing = function (serving) {
  state.recipe.ingredients.forEach(ing => {
    if (ing.quantity !== null)
      ing.quantity = ing.quantity.multiply(serving / state.recipe.servings);
  });
  state.recipe.servings = serving;
};

export const updateBookmark = function () {
  if (!state.recipe.bookmark) {
    state.bookmarks.push({
      id: state.recipe.id,
      image: state.recipe.image,
      title: state.recipe.title,
      publisher: state.recipe.publisher,
    });
    console.log(state.bookmarks);
    state.recipe.bookmark = true;
  } else {
    state.bookmarks.find((ele, i) => {
      if (ele.id === state.recipe.id) {
        state.bookmarks.splice(i, 1);
      }
    });
    console.log(state.bookmarks);
    state.recipe.bookmark = false;
  }
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addRecipe = async function (data) {
  try {
    const dataObject = Object.fromEntries(data);
    //console.log(dataObject);
    const addedRecipe = {
      cooking_time: +dataObject.cookingTime,
      image_url: dataObject.image,
      publisher: dataObject.publisher,
      source_url: dataObject.sourceUrl,
      servings: dataObject.servings,
      title: dataObject.title,
    };
    const ingredients = data.filter(
      ele => ele[0].startsWith('ingredient') && ele[1] !== ''
    );
    addedRecipe.ingredients = ingredients.map(ele => {
      const i = ele[1].replaceAll(' ', '').split(',');
      const info = [...i];
      if (info.length > 3) throw new Error();
      return {
        quantity: info[0] ? +info[0] : null,
        unit: info[1],
        description: info[2],
      };
    });
    console.log(addedRecipe);
    const sentData = await fetch(`${URL}recipes?key=${KEY}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(addedRecipe),
    });
    const json = await sentData.json();
    const receivedData = json.data.recipe;
    receivedData.ingredients.forEach(ing => {
      if (ing.quantity !== null) ing.quantity = new Fraction(ing.quantity);
    });
    state.recipe = receivedData;
  } catch (error) {
    throw error;
  }
};
