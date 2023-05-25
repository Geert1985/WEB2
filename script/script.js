// verder aanvullen : plaats al je javascript code in dit bestand
// hint: om de lijst van films te gebruiken kan je gewoon gebruik maken van de globale variabele genaamd "movies".
let movieList = movies;
//console.log(movieList);

const setup = () => {
  let sectionMovieList = document.querySelector('#movieList');
  displaySidebar(false);
  
  for(let i = 0; i < movieList.length; i ++) {
    //aanmaken van de elementen

    let sectionMovie = makeSectionMovie(i+1);
    let image = makeImgMovie(movieList[i].imageUrl);
    let header = makeHeaderMovie(movieList[i].title);
    let divDescription = makeDivDescription(movieList[i].description);
    
    // de elementen op hun juiste positie inplanten
    let sectionMovieList = document.querySelector('#movieList'); 
    sectionMovieList.appendChild(sectionMovie);
    sectionMovie.appendChild(image);
    sectionMovie.appendChild(header);
    sectionMovie.appendChild(divDescription);
    sectionMovie.addEventListener('click',likeUnlikeMovie);
  }


};
const displaySidebar = (display) => {
  let sideBar = document.querySelector('#likeList');
  if (!display) {
    sideBar.classList.add('hidden');
  } else if (sideBar.classList.contains('hidden')){
    sideBar.classList.remove('hidden');
  }
}


// aanmaken van div class="movie" en met id
const makeSectionMovie = (id) => {
  let sectionMovie = document.createElement('section');
  sectionMovie.classList.add('movie');
  sectionMovie.setAttribute('id',`movie${id}`);
  return sectionMovie;
};
// aanmaken van img met een src
const makeImgMovie = (src) => {
  let imgMovie = document.createElement('img');
  imgMovie.classList.add('image');
  imgMovie.setAttribute('src',src);
  return imgMovie;
};
//aanmaken van de link likeUnlike met addventlistener
const makeLink = () => {
  let link = document.createElement('a'); 
  link.classList.add('likeUnlike');
  //link.setAttribute('href',''); dit mag er niet bij, anders problemen met 'a' element 
  link.innerText = 'like';
  return link;
};

// aanmaken van header
const makeHeaderMovie = (title) => {
  let innerHTML = `<span class="title">${title}</span>`
  let headerMovie = document.createElement('header');
  headerMovie.innerHTML = innerHTML;
  headerMovie.appendChild(makeLink());
  return headerMovie;
};
// aanmaken van divDescription
const makeDivDescription = (description) => {
  let divDescription = document.createElement('div');
  divDescription.classList.add('description');
  divDescription.innerHTML = description;
  return divDescription;
};

// haal de gegevens van de aangeklikte film op
const likeUnlikeMovie = (event) => {
  let movie = event.currentTarget;
    let movieId = movie.getAttribute('id');
    let imgSrc = movie.firstChild.getAttribute('src');
  
  // indien op de like is gelikt, mag de film toegevoegd worden aan de like list en moet 'like veranderen in 'unlike'
    if (event.target.classList.contains('likeUnlike') && event.target.innerText === 'like') {
    
    makeLikeList (movieId,imgSrc);
    displaySidebar(true);
    event.target.innerText = 'unlike';
      // als er unlike staat, moet de film weg uit de like list en moet 'unlik' veranderen in 'like'
  }else if (event.target.innerText === 'unlike') {
    event.target.innerText = 'like';
    let likeList = document.querySelector("#likeList");
    let linkMovie = likeList.querySelectorAll('.link');
    linkMovie.forEach(movie => {
      if (movie.getAttribute('href') === `#${movieId}`) {
        console.log(movieId);
        movie.remove(movie.parentNode);
      };
    if (likeList.querySelectorAll('.link').length === 0 ) {
      displaySidebar(false);
    };
      
    });
  }
  

};


const makeLikeList = (movieId,imgSrc) => {
  let likeList = document.querySelector('#likeList');
  let divMovie = document.createElement('div');
  divMovie.classList.add('movie');
  divMovie.innerHTML = `
    <a class="link" href="#${movieId}">
    <img class="image" src="${imgSrc}"></a>`
  likeList.appendChild(divMovie);
}

 const removeLikeList = (event) => {

 }



window.addEventListener('load',setup);