//C1: For each movie returned from http://localhost:3000/movies create an image and add it to the movie-list nav element.

//C3: When you click on each movie image in the top nav, you should populate the detail area 

const title = document.getElementById('title')
const year = document.getElementById('year-released')
const des = document.getElementById('description')
const poster = document.getElementById('detail-image')
const watchedButton = document.getElementById('watched')
const bloodAmt = document.getElementById('amount')
const bloodForm = document.getElementById('blood-form')

//1. grab the movie list to put movies into
const movieList = document.getElementById('movie-list')

//takes in ONE movie object
const showDetails = (movie) => {
    //C2: As soon as the page loads, we should see the details of the first movie in the dataset.
    //get elements (see top of page consts)
    //set text/src of elements
    title.textContent = movie.title 
    year.textContent = movie.release_year 
    des.textContent = movie.description 
    poster.src = movie.image
    bloodAmt.textContent = movie.blood_amount
    //use an if/else to DECIDE what button should say 
    if(movie.watched === true){
        watchedButton.textContent = 'watched'
    } else {
        watchedButton.textContent = 'unwatched'
    }
}

//2. start grabbing data from url
const url = "http://localhost:3000/movies"
fetch(url)
.then(res => res.json())
.then(movies => {
    movies.forEach((movie) => {
        //1. create the HTML element
        let movieImage = document.createElement('img')
        //2. set the property / set the text 
        movieImage.src = movie.image
        //3. put it on the page
        movieList.append(movieImage)
        movieImage.addEventListener('click', () => {
            //update details on click FOR CURRENT MOVIE OF CURRENT .FOREACH ITERATION
            showDetails(movie)
        })
    })
    showDetails(movies[0])
})

//C4: When you click on the button in the details it should toggle between Watched or Unwatched depending on the value of watched for the movie currently being displayed.
watchedButton.addEventListener('click', () => {
    //if button says watched, change to unwatched
    if(watchedButton.textContent === "watched"){
        watchedButton.textContent = "unwatched"
    } else {
        watchedButton.textContent = "watched"
    }
})

//C5: For each movie, I should be able to add more drops.
bloodForm.addEventListener('submit', (e) => {
    e.preventDefault() //********DO NOT FORGET THIS ***********/
    //take data from e.target, make sure it is a number 
    let newDrops = e.target["blood-amount"].value 
    bloodAmt.textContent = parseInt(bloodAmt.textContent) + parseInt(newDrops)
    //update blood counter
    e.target.reset()
})