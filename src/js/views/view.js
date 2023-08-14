// imports
import icons from 'url:../../img/icons.svg'; // app's icons-file

//
// Parent class for views
//
export default class View {
  _data;

  // Method for rendering recipe page
  //
  // data: recipe data
  render(data) {
    // check if data is available
    // continue only if not undefined or null,
    // is Array and array.length is not 0
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();

    // remove previous html from recipe container
    //  and add new recipe to container
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Private method to clear previous HTML from #parentElement
  //
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // Method to show loading spinner while waiting real data.
  //
  // parentElement: element where spinner is placed
  //
  renderSpinner() {
    // construct HTML markup
    const markup = `
     <div class="spinner">
       <svg>
         <use href="${icons}#icon-loader"></use>
       </svg>
     </div>
   `;

    // First clear previous content then add spinner
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Method for showing errors to user.
  //
  // message: Error message that is shown on page. If no
  //          message is given, show default(this._errorMessage)
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

    // First clear previous content then add spinner
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Method for showing errors to user.
  //
  // message: Error message that is shown on page. If no
  //          message is given, show default(this._errorMessage)
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

    // First clear previous content then add spinner
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
