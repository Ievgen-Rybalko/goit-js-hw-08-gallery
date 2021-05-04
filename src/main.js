import galleryItems from "./gallery-items.js";

const galleryItemsLength = galleryItems.length;

//create a gallery markup basing on imported file:
function createGalleryMarkup ({ preview, original, description }) {
    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;};

const allGalleryLiMarkup = galleryItems.map(createGalleryMarkup).join('');

const galleryUlRef = document.querySelector('ul.js-gallery');
galleryUlRef.insertAdjacentHTML('afterbegin', allGalleryLiMarkup);

// on image click, put attributes to show image in modal window
let currentPosInGallery;
let lastImgOpen;

const lightBoxRef = document.querySelector('.js-lightbox');
const imgInModalShow = document.querySelector('.lightbox__image');

function onPictureClick(e) {
    // if clicked not a picture => do nothing, if not go further
    if (e.target.nodeName !== 'IMG') {
        return
    }
    
    e.preventDefault();
    const clickedImageAddress = e.target;
               
    imgInModalShow.src = clickedImageAddress.getAttribute('data-source');
    imgInModalShow.alt = clickedImageAddress.alt;

    lightBoxRef.classList.toggle("is-open");

    //find current image clicked:
    const galleryItemsOriginals = galleryItems.map(({ original }) => original);
    currentPosInGallery = galleryItemsOriginals.indexOf(imgInModalShow.src);

    //modal window buttons handling
    window.addEventListener('keydown', onKeyDown);

    //click on grey handling
    lightboxRef.addEventListener('click', onCloseBtnClick);
}

galleryUlRef.addEventListener('click', onPictureClick);

//for modal close on click -> div.lightbox__overlay 
const lightboxRef = document.querySelector('div.lightbox__overlay');

//on close modal button click
const closeBtnRef = document.querySelector('button[data-action="close-lightbox"]');

function onCloseBtnClick() {
    
    lightBoxRef.classList.toggle("is-open");
    
    imgInModalShow.src = '';
    imgInModalShow.alt = '';
    
    lightboxRef.removeEventListener('click', onCloseBtnClick);
}

closeBtnRef.addEventListener('click', onCloseBtnClick);

//modal window close with "ESC", arrows <-  -> handling
function onKeyDown(e) {
        
    if (e.key == 'Escape') {
        lightBoxRef.classList.toggle("is-open");
        
        imgInModalShow.src = '';
        imgInModalShow.alt = '';

        window.removeEventListener('keydown', onKeyDown);
    }
    else if (e.key == 'ArrowLeft') {
        if (currentPosInGallery > 0) {
            currentPosInGallery -= 1;
            imgInModalShow.src = galleryItems[currentPosInGallery].original;
            imgInModalShow.alt = galleryItems[currentPosInGallery].description; 
        } else {
            console.log('Это начало. Ходи правый сторона >>>')
        }
     }
    else if (e.key == 'ArrowRight') {
        if (currentPosInGallery < (galleryItemsLength - 1)) {
            currentPosInGallery += 1;
            imgInModalShow.src = galleryItems[currentPosInGallery].original;
            imgInModalShow.alt = galleryItems[currentPosInGallery].description; 
        } else {
            console.log('<<< Это конец. Ходи левый сторона')
        }

     }
};