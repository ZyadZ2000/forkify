import View from './view';
import icons from '../../img/icons.svg';
class bookmarksView extends View {
  container = document.querySelector('.bookmarks__list');
  errorMessage = "Couldn't load Bookmarks :(";
  renderBookmarks(bookmarks) {
    this.clearContainer();
    if (!bookmarks || bookmarks.length === 0) {
      this.renderMessage();
    }
    bookmarks.forEach(element => {
      this.createHTML(element);
    });
  }
  createHTML(item) {
    const html = `<li class="preview">
         <a class="preview__link" href="#${item.id}">
         <figure class="preview__fig">
           <img src=${item.image} alt="Test" />
         </figure>
         <div class="preview__data">
           <h4 class="preview__title">
            ${item.title}
           </h4>
           <p class="preview__publisher">${item.publisher}</p>
         </div>
        </a>
      </li>`;
    this.container.insertAdjacentHTML('beforeend', html);
  }
  renderMessage() {
    const html = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>
      No bookmarks yet. Find a nice recipe and bookmark it :)
    </p>
  </div>`;
    this.container.insertAdjacentHTML('afterbegin', html);
  }
}
export default new bookmarksView();
/*
<ul class="bookmarks__list">
                  <div class="message">
                    <div>
                      <svg>
                        <use href="src/img/icons.svg#icon-smile"></use>
                      </svg>
                    </div>
                    <p>
                      No bookmarks yet. Find a nice recipe and bookmark it :)
                    </p>
                  </div>

                  <!-- <li class="preview">
                    <a class="preview__link" href="#23456">
                      <figure class="preview__fig">
                        <img src="src/img/test-1.jpg" alt="Test" />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__name">
                          Pasta with Tomato Cream ...
                        </h4>
                        <p class="preview__publisher">The Pioneer Woman</p>
                      </div>
                    </a>
                  </li> -->
                </ul>
                */
