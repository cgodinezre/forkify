import icons from 'url:../../img/icons.svg';

class RecipeView {
  #parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = 'Recipe was successfully loaded!';
  _icons = icons;

  render(data) {
    const markup = this._generateMarkup(data);
    this._clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${this._icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${this._icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${this._icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev =>
      window.addEventListener(ev, handler)
    );
  }

  _clear() {
    this.#parentElement.innerHTML = '';
  }

  _generateMarkup(data) {
    return `
      <figure class="recipe__fig">
        <img src="${data.image}" alt="${data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${this._icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>

        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${this._icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${data.servings}</span>
          <span class="recipe__info-text">servings</span>
        </div>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${data.ingredients
            .map(
              ing => `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${this._icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity || ''}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit || ''}</span>
                ${ing.description}
              </div>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${data.publisher}</span>. Please check out directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${data.sourceUrl}" target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${this._icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }
}

export default new RecipeView();
