// imports
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

// for polyfilling
import { async } from 'regenerator-runtime';

// model's state object
//
export const state = {
  // current recipe which is currently in view
  recipe: {},
};

// Function that loads recipe data from remote API
//
// recipeId: id of the recipe which is fetched
export const loadRecipe = async function (recipeId) {
  try {
    const data = await getJSON(`${API_URL}/${recipeId}`);

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

    console.log(state.recipe);
  } catch (err) {
    // throw error that controller can handle it
    throw err;
  }
};
