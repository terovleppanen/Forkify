import View from './view.js'; // parent class
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // app's icons-file

//
// Class for rendering bookmarks list to page.
//
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it!';
  _message = '';

  // Register handler for load event
  //
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  // Generates markup for bookmarks
  //
  _generateMarkup() {
    // call helper function to create each bookmark
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

// export new instance of BookmarksView so that there can be only one
// BookmarksView
export default new BookmarksView();
