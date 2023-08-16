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

    // generateRecipe markup to show
    const markup = this._generateMarkup();

    // remove previous html from recipe container
    //  and add new recipe to container
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Method for updating view without rendering it fully again
  //
  // data: new data
  //
  update(data) {
    this._data = data;

    // generate whole markup again
    const newMarkup = this._generateMarkup();

    // create new DOM object to memory(not in page)
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // get all elements from newly created DOM to array
    // same for elements in page (in _parentElement)
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    // For each element in newElements, check if it's the same as
    // in currentElements
    newElements.forEach((newElement, i) => {
      // gte corresponding currentElement
      const currentELement = currentElements[i];

      // Updates changed text
      //
      // 1. Check if newElement and currentElement are different
      //    continue to #2
      // 2. If firstChild has only text as value, replace the contents.
      //    i.e. if there's another element for example as
      //    child don't replace
      //
      if (
        !newElement.isEqualNode(currentELement) &&
        newElement.firstChild?.nodeValue.trim() !== ''
      ) {
        currentELement.textContent = newElement.textContent;
      }

      // Updates changed attributes
      //
      // Check if elements have changed, if so
      // update attributes too
      if (!newElement.isEqualNode(currentELement))
        // loop over array of attributes and copy them to
        // currentElements(which are shown in page)
        Array.from(newElement.attributes).forEach(attr =>
          currentELement.setAttribute(attr.name, attr.value)
        );
    });
  }

  // Method to clear previous HTML from #parentElement
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
