// imports
import { API_URL, RESULTS_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

// for polyfilling
import { async } from 'regenerator-runtime';

// model's state object
//
export const state = {
  // current recipe which is currently in view
  recipe: {},
  // last search query and search results in array
  // Results array contains objects in format
  // { id, title, publisher, image }
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  // Array for bookmarks
  bookmarks: [],
};

// Function that loads recipe data from remote API
//
// recipeId: id of the recipe which is fetched
//
export const loadRecipe = async function (recipeId) {
  try {
    const data = await getJSON(`${API_URL}${recipeId}`);

    // get recipe out of data by restructuring it
    const { recipe } = data.data;

    // add recipe information to state variable
    // rename some of the variables to better suits JS naming
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // Check if current recipe id is in bookmark array
    if (state.bookmarks.some(bookmark => bookmark.id === recipeId))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    // throw error that controller can handle it
    throw err;
  }
};

// Function for fetching search results. Search results is saved to state.
//
// query: Query that is searched for.
//
export const loadSearchResults = async function (query) {
  try {
    // save query to state
    state.search.query = query;

    // search from API using query
    const data = await getJSON(`${API_URL}?search=${query}`);

    // save results to state
    // map over results and for each search result make new array entry
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });

    // after new search, reset page to 1
    state.search.page = 1;
  } catch (err) {
    // throw error that controller can handle it
    throw err;
  }
};

// Function that returns search results that should be displayed
// on given page. I.e. array of result objects.
//
// page: Page number which results are returned
//
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  // count start and end indexes for pages
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  // return part of results
  return state.search.results.slice(start, end);
};

// Updates servings amount of current recipe.
//
// newServings: new amount of servings
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    // update each ingredients amount according to newServings
    ingredient.quantity =
      ingredient.quantity * (newServings / state.recipe.servings);
  });

  state.recipe.servings = newServings;
};

// Saves bookmarks to local storage
//
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

// Add recipe to bookmarks
//
// recipe: recipe object which is bookmarked
//
export const addBookmark = function (recipe) {
  // Add recipe object to bookmark array
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks(); // save bookmarks
};

// Remove recipe from bookmarks
//
// recipeId: Id of recipe being removed
//
export const deleteBookmark = function (recipeId) {
  // find index of right recipe
  const index = state.bookmarks.findIndex(recipe => recipe.id === recipeId);

  // and remove it from bookmarks array
  state.bookmarks.splice(index, 1);

  // Mark current recipe as not bookmarked
  if (recipeId === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks(); // save bookmarks
};

// initialize model
// load bookmarks data from local storage
const init = function () {
  // read local storage
  const storage = localStorage.getItem('bookmarks');

  // check if we actually got the data
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

// For developing purposes
//
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();
