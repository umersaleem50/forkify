import icons from '../../img/icons.svg';
export default class View {
  _data;
  render(data, render = true) {
    // this.renderSpinner(this._parentElement);
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMockup();
    if (!render) return markup;
    this._clean();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    // console.log(Fraction);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMockup();
    // THIS IS THE VIRTUAL DOM ON DOCUMENT
    const VirtualEl = document
      .createRange()
      .createContextualFragment(newMarkup);

    //THESE ARE THE ARRAY OF ELEMENTS OF VIRTUAL DOM AND REAL DOM
    const virArr = Array.from(VirtualEl.querySelectorAll('*'));
    const currElArr = Array.from(this._parentElement.querySelectorAll('*'));
    virArr.forEach((element, i) => {
      const currEl = currElArr[i];
      if (
        !element.isEqualNode(currEl) &&
        element.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = element.textContent;
      }

      if (!element.isEqualNode(currEl)) {
        Array.from(element.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
              <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
        `;
    // this._parentElement.innerHTML = '';
    this._clean();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
                          <div>
                            <svg>
                              <use href="${icons}#icon-alert-triangle"></use>
                            </svg>
                          </div>
                          <p>${message}</p>
                        </div>`;

    this._clean();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
                          <div>
                            <svg>
                              <use href="${icons}#icon-smile"></use>
                            </svg>
                          </div>
                          <p>${message}</p>
                        </div>`;

    this._clean();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clean() {
    this._parentElement.innerHTML = '';
  }
}
