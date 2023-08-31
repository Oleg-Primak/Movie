// import getMoviesSlider from "./slider"
// import input from "./search"
// import { createLoader } from "./loader";
// import createNextPage from "./pagination"
// import openWindow from "./modal"

export const API_KEY = "71e4be4e-4f2a-4f15-b324-5b6a6285bd0c";

export const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";

export const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const API_URL_PREMIER =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=MAY";

export const API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
 

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });

    const respData = await resp.json();
    console.log(respData);
    showMovies(respData)
}

function getClassByRating(number) {
    if (number >= 7) {
        return "green";
    } else if (number > 5) {
        return "orange";
    } else {
        return "grey";
    }
}

function showMovies(data) {
    const moviesEl = document.querySelector(".movies");
    //const moviesTitle = document.querySelector(".title");

    document.querySelector(".movies").innerHTML = "";
    

    data.films.forEach(movie => {
        const movieEl = document.createElement("li");
        movieEl.classList.add("movies__item");
        movieEl.innerHTML = `
            
            <div class="movie__cover_inner">
            <img 
                src="${movie.posterUrlPreview}" 
                alt="${movie.nameRu}"
                class="movie__cover"
            />
            <div class="movie__cover_darkened"></div>
            </div>
            <div class="movie__info">
            <div class="movie__title">${movie.nameRu}</div>
            <div class="movie__category">${movie.genres.map((el) => ` <span>${el.genre}</span>`)}</div>
            ${
                movie.rating > 0 &&
                `
                <div class="movie__rating movie__rating_${getClassByRating(movie.rating)}">${movie.rating}</div> 
                </div>
                `
            }
        </div>
        `;
        
        movieEl.addEventListener("click", () => {openWindow(movie.filmId)
        console.log(movie.filmId)})
        moviesEl.appendChild(movieEl);
    });
}

// search -------------!!!!!!!!!!!!------------!!!!!!!!!!!!!!!!--------------!!!!!!!!!!!!!!!!!!

const form = document.querySelector("form");
const search = document.querySelector(".header__search");
const sliderNone = document.querySelector(".container-slider");
const removeIcon = document.getElementById("remove");
const button = document.querySelector(".button-next");
const title = document.querySelector(".header__title")

function input() {
    form.addEventListener("submit", (e) =>{
        e.preventDefault();

        const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
        if (search.value) {
            getMovies(apiSearchUrl)
            sliderNone.classList.add("none")
        } 
        

        search.value = "";
        document.querySelector(".title-search").innerHTML = "Результат поиска";
        document.querySelector(".header__logo").innerHTML = "Главная";
        
        button.classList.add("button-remove")
        title.remove()
    })

    removeIcon.addEventListener("click", () => {
        search.value = "";
    })
      
}

//slider ----------------!!!!!!!!!!!!!------------!!!!!!!!!!!----------------!!!!!!!!!!!!!!!!

let offset = 0;
const sliderLine = document.querySelector('.slider-line');
let imgs = document.querySelectorAll("img");

// function init() {
//   console.log('resize');
//   width = document.querySelector('.slider').offsetWidth;
//   sliderLine.style.width = width * imgs.length + 'px';
//   imgs.forEach(item => {
//     item.style.width = width + 'px'
//     item.style.height = 'auto';
//   })
// }

// window.addEventListener('resize', init)
// init()

document.querySelector('.button__next').addEventListener('click', function() {
    offset = offset + 256;
    
    if(offset >= 4096) {
       offset = 0;
    }
    sliderLine.style.left = - offset + 'px';
});

document.querySelector('.button__prev').addEventListener('click', function() {
  offset = offset - 256;
  
  if(offset < 0) {
     offset = 3840;
  }
  sliderLine.style.left = - offset + 'px';
});


//let imgs = document.querySelectorAll("img");

// for (let i = 0; i < imgs.length; i++) {
//   imgs[i].addEventListener("click", (e) => {
//     let src = e.currentTarget.src;
//     let newWin = window.open("","","popup");
//     console.log(newWin)
//     newWin.document.write("<img src='" + src + "' alt='something' />")
//   });
// }

  
async function getMoviesSlider(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });

    const respData = await resp.json();
    console.log(respData);
    showMoviesSlider(respData)
}

function showMoviesSlider(data) {
    const moviesEl = document.querySelector(".slider-line");

    data.items.forEach(movie => {
        const movieEl = document.createElement("li");
       // movieEl.classList.add("img");
        movieEl.innerHTML = `
    
             <img class="img" 
             src="${movie.posterUrlPreview}" alt=""
             />
        
    
        `;
    moviesEl.appendChild(movieEl);
    movieEl.addEventListener("click", () => openWindow(movie.kinopoiskId))
    });
}

// async function openWindow(id) {
//   const resp = await fetch(API_URL + id, {
//       headers: {
//           "Content-Type": "application/json",
//           "X-API-KEY": API_KEY,
//       },
//   });

//   const respData = await resp.json();
//   //console.log(respData);
//   //console.log(id)
//   window.open(`${respData.webUrl.replace("www.kinopoisk.ru", "1ww.frkp.live")}`)
// }

// modal new-page -----------!!!!!!!!!!!-----------!!!!!!!!!!!!!---------!!!!!!!!!!!!

const modal = document.querySelector(".modal");

async function openWindow(id) {
    const resp = await fetch(API_URL + id, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });

    const respData = await resp.json();

    // console.log(respData);
    // console.log(respData.webUrl.replace("kinopoisk", "kinopoiskk"))
    //window.open(`${respData.webUrl.replace("kinopoisk", "kinopoiskk")}`)
    
    
    modal.classList.add("modal__show")
    document.body.classList.add("stop-scrolling")

    modal.innerHTML = `
        <div class="modal__card">
      <img class="modal__poster"
          src="${respData.posterUrlPreview}" alt=""
      />
      
      <ul class="modal-info">
        <li>
          <h3 class="modal__title">${respData.nameRu}</h3>
        </li>
        <li>
          <div class="modal__genres">
          ${
            respData.ratingKinopoisk ? `<span class="movie__rating_${getClassByRating(respData.ratingKinopoisk)}">${respData.ratingKinopoisk}</span>` : ''
          }
            <span>${respData.year}</span>
            <span>${respData.genres.map((el) => ` <span>${el.genre}</span>`)}.</span>
            <span>${respData.countries[0].country}</span>
            <span>${respData.filmLength} мин</span>
          </div>
        </li>
        <li class="modal__description">
          ${ respData.description ? `<span>${respData.description}</span>` : '' }
        </li>
        <li>
          <button class="button-show button-next">
            <svg width="1.4rem" height="1.4rem" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fff" data-tid="b6d52236"><path d="M6 3.375L21 12L6 20.625V3.375Z" fill="white"></path></svg>
            play
          </button>
        </li>
      </ul>
      <button class="button-close">&#10008;</button> 
  </div>  
    `
    const button = document.querySelector(".button-show");
    const buttonClose = document.querySelector(".button-close");

    button.addEventListener('click', () => {
    window.open(`${respData.webUrl.replace("www.kinopoisk.ru", "1ww.frkp.live")}`);
  });
    buttonClose.addEventListener('click', () => closeModal());
 
}

function closeModal() {
  modal.classList.remove("modal__show")
  document.body.classList.remove("stop-scrolling")
}  

window.addEventListener('click', (e) => {
   if(e.target === modal){
    closeModal()
   }
})

//---------------!!!!!!!!!!!--------------!!!!!!!!!!!!!!--------------!!!!!!!!!!!!!!!

//pagination


function topFunction() {
    document.documentElement.scrollTop = 650;
}

let page = 2;

function count() {
    if (page <= 5) {
       return page++
    }else if(page > 5) {
        return page = 1
    }
}


const update = async () => {
 // modal.insertAdjacentHTML('beforeend', createLoader());
  
  await getMovies(API_URL_POPULAR + count());

//   document.querySelector('#loader').remove() 
};

// const onload = function(){
//   document.querySelector('#loader').style.display = 'none';
// }

const createNextPage = (page) => {
    const button = document.querySelector(".button-next");

    button.addEventListener('click', () => {
        // getMovies(API_URL_POPULAR + count());
        topFunction() 
        update(page)

        // let loader = document.querySelector('#loader')
        // loader.style.display = 'none'       

    });    
    
}
 
document.addEventListener('DOMContentLoaded', () => {
    getMovies(API_URL_POPULAR + 1);  
   getMoviesSlider(API_URL_PREMIER);
    input();
    createNextPage()
    //openWindow()
})
 


// export default getMovies;