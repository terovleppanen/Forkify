// imports
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';

// DOM-elements
const recipeContainer = document.querySelector('.recipe');

// URL for API used for project
// https://forkify-api.herokuapp.com/v2

//
// Promisifying function for timeout.
//
// seconds: timeout time in seconds.
//
const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${seconds} second`)
      );
    }, seconds * 1000);
  });
};

//
// controlRecipes
//
const controlRecipes = async function () {
  try {
    // get has from location url
    const id = window.location.hash.slice(1);

    // check if there was hash
    if (!id) return;

    // Render loading spinner
    recipeView.renderSpinner();

    // Load recipe
    await model.loadRecipe(id);

    // render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

// 1. when hash of the location url changes show recipe for that hash
// 2. when page is loaded look for hash and show corresponding recipe
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
