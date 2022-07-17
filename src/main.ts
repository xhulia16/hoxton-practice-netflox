import './style.css'

type Movie = {
  id: number,
  title: string,
  thumbnail: string,
  description: string,
  comments: Comment[]
}

type Comment = string

type State = {
  movieList: Movie[],
  selectedMovie: Movie | null,
}


let state: State = {
  movieList: [],
  selectedMovie: null
}

window.state = state

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
function getMoviedata() {
  fetch('http://localhost:3005/movieList')
    .then(resp => resp.json())
    .then(dataFromServer => {
      state.movieList = dataFromServer
      render()
    })
}

function postMovie(title: string, thumbnail: string, description: string, comment: string) {
  let url = 'http://localhost:3005/movieList'

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      thumbnail: thumbnail,
      description: description,
      comment: comment
    })
  }
  fetch(url, options)
    .then(resp => resp.json())
    .then(newMovie => {
      state.movieList.push(newMovie)
      render()
    })
    .catch(response => {
      console.log(response);
    });
}

function renderNewMovie() {
  let mainEl = document.querySelector('#app')
  if (mainEl === null) return

  let movieForm = document.createElement('form')
  movieForm.addEventListener('submit', function (event) {
    event.preventDefault()
    postMovie(titleInput.value, thumbnailInput.value, descriptionInput.value, commentInput.value)
    render()

  })
  let titleInput = document.createElement('input')
  titleInput.name = 'title'
  titleInput.placeholder = 'Add movie title'

  let thumbnailInput = document.createElement('input')
  thumbnailInput.name = 'thumbnail'
  thumbnailInput.placeholder = 'Add thumbnail link'

  let descriptionInput = document.createElement('input')
  descriptionInput.name = 'description'
  descriptionInput.placeholder = 'Add movie description'

  let commentInput = document.createElement('input')
  commentInput.name = 'description'
  commentInput.placeholder = 'Add movie comment'

  let formMoviebtn = document.createElement('button')
  formMoviebtn.type = 'submit'
  formMoviebtn.textContent = 'submit'

  movieForm.append(titleInput, thumbnailInput, descriptionInput, commentInput, formMoviebtn)
  mainEl.append(movieForm)


}

getMoviedata()
renderNewMovie()

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

    let addCommentForm = document.createElement('form')

    addCommentForm.addEventListener('submit', function (event) {
      event.preventDefault()

      let newComment = commentInput.value
      console.log(newComment)
      item.comments.push(newComment)
      render()
    })


    let commentInput = document.createElement('input')
    commentInput.name = 'comment'
    commentInput.placeholder = 'Add your comment'

    let submitBtn = document.createElement('button')
    submitBtn.type = 'submit'
    submitBtn.textContent = 'Submit'

    for (let comment of item.comments) {

      let addedComment = document.createElement('li')
      addedComment.textContent = comment

      movieCommentList.append(addedComment)
    }

    addCommentForm.append(commentInput, submitBtn)
    movieEl.append(movieTitleEl, movieThumbnailEl, movieDescriptionEl, movieCommentList, addCommentForm)
    movieListEl.append(movieEl)
    mainEl.append(movieListEl)

  }
}

function renderMovieDetails() {
  let mainEl = document.querySelector('#app')
  if (mainEl === null) return
  if (state.selectedMovie === null) return


  let movieDiv = document.createElement('div')

  let movieImgEl = document.createElement('img')
  movieImgEl.src = state.selectedMovie.thumbnail

  let otherMovieDetails = document.createElement('p')
  otherMovieDetails.textContent = state.selectedMovie.description

  let goHomebtn = document.createElement('button')
  goHomebtn.textContent = 'Home'
  goHomebtn.addEventListener('click', function () {
    state.selectedMovie = null
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
  renderNewMovie()

  if (state.selectedMovie === null) renderMovieList()
  else renderMovieDetails()

  


}



render()