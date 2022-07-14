import './style.css'

type Movie = {
  id: number,
  title: string,
  thumbnail: string,
  description: string,
  comment: string,
}
type State = {
  movieList: Movie[],
  selectedMovie: Movie | null
}

let state: State = {
  movieList: [{
    id: 1,
    title: 'Title1',
    thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1636996054',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, libero necessitatibus aut in sint ipsa laborum',
    comment: 'comment1'
  },
  {
    id: 2,
    title: 'Title2',
    thumbnail: 'https://marketplace.canva.com/EAE4sZqehD4/1/0/1131w/canva-gray-%26-black-monochrome-blind-forest-movie-present-poster-PRZ-uOOwgf0.jpg',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, libero necessitatibus aut in sint ipsa laborum',
    comment: 'comment1'
  },
  {
    id: 3,
    title: 'Title3',
    thumbnail: 'data:image/jpeg;base64,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',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, libero necessitatibus aut in sint ipsa laborum',
    comment: 'comment1'
  },
  {
    id: 4,
    title: 'Title4',
    thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1636996054',
    description: 'https://cdnb.artstation.com/p/assets/images/images/030/521/849/large/khalil-ghamary-mkg-the-batman1.jpg?1600860253',
    comment: 'comment1'
  }
  ],
  selectedMovie: null
}

//<h1 class="title">NETFLOX</h1>
//<div class="movieList">
//  <div class="movie">
//  <title> Movie title</title>
//  <img
//    src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1636996054">
//  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, libero necessitatibus aut in sint ipsa laborum,
//    aperiam, sed natus reprehenderit enim. Voluptatem ipsam illum atque repellendus non possimus voluptatum illo?
//  </p>
//  <h3>Comment 1</h3>
//</div>
//</div>

function renderHeader() {
  let mainEl = document.querySelector('#app')
  if (mainEl === null) return

  let websiteTitleEl = document.createElement('h1')
  websiteTitleEl.className = 'title'
  websiteTitleEl.textContent = "NETFLOX"

  mainEl.append(websiteTitleEl)
}
function renderMovieList() {
  let mainEl = document.querySelector('#app')
  if (mainEl === null) return



  let movieListEl = document.createElement('div')
  movieListEl.className = 'movieList'

  for (let item of state.movieList) {

    let movieEl = document.createElement('div')
    movieEl.className = 'movie'

    let movieTitleEl = document.createElement('h2')
    movieTitleEl.textContent = item.title

    let movieThumbnailEl = document.createElement('img')
    movieThumbnailEl.src = item.thumbnail
    movieThumbnailEl.addEventListener('click', function () {
      state.selectedMovie = item
      render()
    })

    let movieDescriptionEl = document.createElement('p')
    movieDescriptionEl.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, libero necessitatibus aut in sint ipsa laborum'

    let movieCommentList = document.createElement('ul')
    let movieComment = document.createElement('li')
    movieComment.textContent = 'Example'

    movieCommentList.append(movieComment)
    movieEl.append(movieTitleEl, movieThumbnailEl, movieDescriptionEl, movieCommentList)
    movieListEl.append(movieEl)

    mainEl.append(movieListEl)
  }
}

function renderMovieDetails() {
  let mainEl = document.querySelector('#app')
  if (mainEl === null) return
  if(state.selectedMovie === null) return


  let movieDiv = document.createElement('div')

  let movieImgEl = document.createElement('img')
  movieImgEl.src = state.selectedMovie.thumbnail

  let otherMovieDetails = document.createElement('p')
  otherMovieDetails.textContent = state.selectedMovie.description

  let goHomebtn = document.createElement('button')
  goHomebtn.textContent = 'Home'
  goHomebtn.addEventListener('click', function () {
    state.selectedMovie=null
    render()
  })

  movieDiv.append(movieImgEl, otherMovieDetails)
  mainEl.append(movieDiv, goHomebtn)
}

function render() {
  let mainEl = document.querySelector('#app')
  if (mainEl === null) return
  mainEl.textContent = ''

  renderHeader()

  if (state.selectedMovie === null) renderMovieList()
  else renderMovieDetails()

}

render()