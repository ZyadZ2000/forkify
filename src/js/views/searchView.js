import View from './view';
import icons from '../../img/icons.svg';

class SearchView extends View {
  container = document.querySelector('.results');
  page = document.querySelector('.pagination');
  errorMessage = "Couldn't find search results :(";
  pageCounter = 1;
  results = [];
  pagination;

  getQuery(handler) {
    document.querySelector('.search').addEventListener('submit', function (e) {
      e.preventDefault();
      const query = document.querySelector('.search__field').value;
      handler(query);
    });
  }

  renderQuery(resultsArr) {
    this.pageCounter = 1;
    this.clearContainer();
    this.results = resultsArr;
    this.renderPage();
  }

  createHTML(item) {
    const html = `<li class="preview" data-id=${item.id}>
                    <a class="preview__link preview__link--active" href="#${item.id}">
                      <figure class="preview__fig">
                        <img
                          src=${item.image}
                     alt="Test"
                        />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__title">${item.title}</h4>
                        <p class="preview__publisher">${item.publisher}</p>
                      </div>
                    </a>
                </li>`;
    this.container.insertAdjacentHTML('beforeend', html);
  }

  clearPage() {
    this.page.innerHTML = '';
  }

  renderPage() {
    this.clearContainer();
    this.clearPage();
    if (this.pageCounter === 1) {
      this.pagination = `
                       <button class="btn--inline pagination__btn--next">
                        <span>Page ${this.pageCounter + 1}</span>
                         <svg class="search__icon">
                          <use href="${icons}#icon-arrow-right"></use>
                         </svg>
                       </button>
                      `;
      this.page.insertAdjacentHTML('beforeend', this.pagination);
      document
        .querySelector('.pagination__btn--next')
        .addEventListener('click', this.nextPage.bind(this));
    } else if (this.pageCounter * 10 >= this.results.length) {
      this.pagination = `
                    <button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                      <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${this.pageCounter - 1}</span>
                      </button>
                      `;
      this.page.insertAdjacentHTML('beforeend', this.pagination);
      document
        .querySelector('.pagination__btn--prev')
        .addEventListener('click', this.prevPage.bind(this));
    } else {
      this.pagination = `
                       <button class="btn--inline pagination__btn--prev">
                         <svg class="search__icon">
                           <use href="${icons}#icon-arrow-left"></use>
                         </svg>
                         <span>Page ${this.pageCounter - 1}</span>
                       </button>
                       <button class="btn--inline pagination__btn--next">
                                  <span>Page ${this.pageCounter + 1}</span>
                         <svg class="search__icon">
                           <use href="${icons}#icon-arrow-right"></use>
                         </svg>
                       </button>
                     `;
      this.page.insertAdjacentHTML('beforeend', this.pagination);
      document
        .querySelector('.pagination__btn--next')
        .addEventListener('click', this.nextPage.bind(this));
      document
        .querySelector('.pagination__btn--prev')
        .addEventListener('click', this.prevPage.bind(this));
    }
    if (this.pageCounter * 10 >= this.results.length) {
      this.results.slice(10 * (this.pageCounter - 1)).forEach(result => {
        this.createHTML(result);
      });
    } else {
      this.results
        .slice(10 * (this.pageCounter - 1), (this.pageCounter - 1) * 10 + 10)
        .forEach(result => {
          this.createHTML(result);
        });
    }
  }

  nextPage() {
    this.pageCounter++;
    this.renderPage();
  }

  prevPage() {
    this.pageCounter--;
    this.renderPage();
  }
  /*
  resultClick(handler) {
    document.querySelectorAll('.preview').forEach(function (item) {
      item.addEventListener('click', function (e) {
        const id = e.target.closest('.preview').dataset.id;
        console.log(id);
        if (!id) return;
        handler(id);
      });
    });
  } */
}

export default new SearchView();
