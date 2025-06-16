class ResultsView {
  #parentElement = document.querySelector('.results');
  _icons = 'src/img/icons.svg';

  render(data) {
    const markup = data.map(this._generateMarkupPreview).join('');
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  _generateMarkupPreview(result) {
    return `
      <li class="preview">
        <a class="preview__link" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default new ResultsView();
