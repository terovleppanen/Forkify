import View from './view.js'; // parent class
import icons from 'url:../../img/icons.svg'; // app's icons-file

//
// Class for displaying add recipe window
//
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  // contructor
  //
  constructor() {
    super();
    // show window
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  // Method for toggling window on and off
  //
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  // Add toggleWindow method for handling _btnOpen clicks
  //
  _addHandlerShowWindow() {
    // bind this keyword for toggleWindow
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  // Add toggleWindow method for handling _btnClose or overlay clicks
  // to hide window
  //
  _addHandlerHideWindow() {
    // bind this keyword for toggleWindow
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  // Add handler for form submit
  //
  // handler: Event subcriber
  //
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      // prevent page reload
      event.preventDefault();

      // FormData constructor takes form as parameter
      // since this is handler function this references
      // _parentElement which is form (upload)
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);

      handler(data);
    });
  }

  // Method for generating markup
  //
  _generateMarkup() {}
}

// export one instance from this module
export default new AddRecipeView();
