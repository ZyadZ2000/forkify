import icons from '../../img/icons.svg';
import View from './view';

class RecipeView extends View {
  container = document.querySelector('.recipe');
  errorMessage = "Couldn't load recipe :(";
  renderRecipe(item) {
    this.clearContainer();
    const html = this.createHTML(item);
    this.container.insertAdjacentHTML('afterbegin', html);
  }
  createIngredient(ing) {
    const html = `<li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              !ing.quantity ? '' : ing.quantity
            }</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>`;
    return html;
  }
  handleServingClick(handler) {
    document
      .querySelectorAll('.btn--increase-servings')
      .forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          const serving = +e.target.closest('.btn--increase-servings').dataset
            .serving;
          handler(serving);
        });
      });
  }
  updateRecipe(item) {
    const html = this.createHTML(item);
    const newDOM = document.createRange().createContextualFragment(html);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(this.container.querySelectorAll('*'));
    newElements.forEach((newEle, i) => {
      const curEle = currentElements[i];

      //Copying text using nodevalue which basically gives null unless the node is a text that's why we got the firstChild
      if (
        !newEle.isEqualNode(curEle) &&
        newEle.firstChild?.nodeValue.trim() !== ''
      ) {
        curEle.textContent = newEle.textContent;
      }
      if (!newEle.isEqualNode(curEle)) {
        /* Array.from(newEle.attributes).forEach(attr => {
          curEle.setAttribute(attr.name, attr.value);
        }); */
        if (curEle.dataset.serving)
          curEle.dataset.serving = newEle.dataset.serving;
      }
    });
  }
  createHTML(item) {
    return `<figure class="recipe__fig">
    <img src=${item.image} alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${item.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        item.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        item.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings" data-serving = ${
          item.servings - 1
        }>
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings" data-serving = ${
          item.servings + 1
        }>
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <button class="btn--round">
      <svg class="">
        <use href="${icons}${
      item.bookmark ? '#icon-bookmark-fill' : '#icon-bookmark'
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${item.ingredients.map(this.createIngredient).join('')}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${item.publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href=${item.source}
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }
  handleBookmark(handler) {
    document
      .querySelector('.btn--round')
      .addEventListener('click', function (e) {
        /* document
          .querySelector('.btn--round use')
          .setAttribute('href', `${icons}#icon-bookmark-fill`);*/
        handler();
      });
  }
  updateBookmarkView(item) {
    this.container
      .querySelector('.btn--round use')
      .setAttribute(
        'href',
        `${icons}${item.bookmark ? '#icon-bookmark-fill' : '#icon-bookmark'}`
      );
  }
}

export default new RecipeView();
