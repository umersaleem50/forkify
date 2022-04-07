import { KEY, API_URL, RES_PER_PAGE } from './config';
// import { getJSON, sendJSON } from './helper';
import { AJAX } from './helper';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const genrateObject = function (data) {
  const recipe = data;

  state.recipe = {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image_url,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    ...(recipe.key && { key: recipe.key }),
  };
  // console.log(state.recipe);
};

// `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcb37`
export const loadRecipe = async function (id) {
  try {
    // const { data } = await getJSON(`${API_URL}/${id}`);
    const { data } = await AJAX(`${API_URL}/${id}`);
    // console.log(data);
    const recipe = data.recipe;
    console.log(recipe);
    genrateObject(recipe);

    if (state.bookmarks.some(el => el.id === state.recipe.id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
    //   console.log(recipe);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const searchRecipe = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    // console.log(data.data.recipes);
    state.search.results = data.data.recipes.map(res => {
      return {
        id: res.id,
        title: res.title,
        image: res.image_url,
        publisher: res.publisher,
        ...(res.key && { key: res.key }),
      };
    });
    state.search.page = 1;
    // console.log(state.searchRecipe);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

///////////////////////////////////////////////////
//this will return you 10 recipes depending upon the pages
//and you can render results view using this results
export const getSearchResultsPage = function (page = state.search.page) {
  // console.log(state.search.page);
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

// searchRecipe('pizza');

export const updateServings = function (newServings) {
  // console.log(state.recipe);

  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
    // console.log(ing.quantity);
  });
  state.recipe.servings = newServings;
  // console.log(state.recipe);
};

export const addBookmark = function (recipe) {
  // if (state.bookmarks.some(el => el.id === recipe.id)) return;
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  saveBookmarks();
};

export const deleteBookmark = function (id) {
  state.recipe.bookmarked = false;
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  saveBookmarks();
};

// this will store bookmarks to local storage
const saveBookmarks = function () {
  const bookmarksData = JSON.stringify(state.bookmarks);
  localStorage.setItem('bookmarks', bookmarksData);
  // console.log('sucessfully stored to locale storage!');
};

export const getsavedBookmarks = function () {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  if (!bookmarks) return;
  state.bookmarks = bookmarks;
  // console.log(state.bookmarks);
};

export const addRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        console.log(ingArr.length);
        if (ingArr.length !== 3)
          throw new Error(
            'Please type the ingrediants in given corrent format :)'
          );

        const [quantity, unit, description] = ingArr;

        return {
          quantity: quantity ? +quantity : null,
          unit,
          // discription,
          description,
        };
      }); //mine

    const recipe = {
      title: newRecipe.title,
      image_url: newRecipe.image,
      source_url: newRecipe.sourceUrl,
      cooking_time: +newRecipe.cookingTime,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    //<==
    //ERROR IS HERE AND YOU NEED TO FIX IT IT DOESNT RENDER THE QUNATITY PROPERTIES
    genrateObject(data.data.recipe);
    // console.log(data.data.recipe);
    //
    addBookmark(state.recipe);
    return data;
    // console.log(data);
    // console.log(recipe);
  } catch (err) {
    throw err;
  }
};
