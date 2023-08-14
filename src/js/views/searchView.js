//
// Class for getting search data from DOM
//
class SearchView {
  // parent element
  _parentElement = document.querySelector('.search');

  // Method for getting query value from input form. Returns search string.
  //
  getQuery() {
    // Get query from search field. Then clear the field and return query.
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();

    return query;
  }

  // Method for registering handler to handle 'submit' event when user sends search form.
  //
  // handler: Function that is registering to subcribe events
  //
  addHandlerSearch(handler) {
    // create anonymous handler function that calls actual handler
    this._parentElement.addEventListener('submit', function (event) {
      // prevent form to reload page.
      event.preventDefault();
      // call the handler function given in parameter
      handler();
    });
  }

  // Private method for clearing search field
  //
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

// Export new class instance from module
export default new SearchView();
