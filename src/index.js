// constants
const url = "http://localhost:3000/movies";

const nav = document.getElementById("movie-list");
//document.querySelector('#movie-list')
const img = document.getElementById("detail-image");
const title = document.getElementById("title");
const year = document.getElementById("year-released");
const des = document.getElementById("description");
const btn = document.getElementById("watched");
const amt = document.getElementById("amount")

const form = document.getElementById("blood-form");

let curMovie = {}

//takes in a movie object and fills the details for given movie
function fillDetails(movie) {
    curMovie = movie
	title.innerText = movie.title;
	year.innerText = movie.release_year;
	des.innerText = movie.description;
	btn.innerText = movie.watched ? "Watched" : "Unwatched";
	img.src = movie.image;
    amt.innerText = movie.blood_amount;
}

//toggle button
btn.addEventListener("click", () => {
    

    fetch(`${url}/${curMovie.id}`, {
        method: 'PATCH',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({watched: !curMovie.watched})
    })
    .then(res => res.json())
    .then(data => {
        //UPDATE CURMOVIE TO AVOID STALE CLOSURE 
        //SUCH THAT ALL VARIABLES ARE UPDATED TO WHAT'S IN THE SERVER
        curMovie.watched = !curMovie.watched
        console.log(data)
        btn.innerText = data.watched ? "Watched" : "Unwatched"
    })
});

//submit event listener
form.addEventListener('submit', (e) => {
    e.preventDefault()
    //get current number in blood drop text
    let curBlood = parseInt(amt.textContent)
    let formBlood = parseInt(e.target["blood-amount"].value)
    //update blood drop text
    amt.textContent = curBlood + formBlood

    //fetch PATCH
    fetch(`${url}/${curMovie.id}`, {
        method: 'PATCH',
        headers: {'content-type': 'application/json'},
        //UPDATE CURMOVIE TO AVOID STALE CLOSURE 
        //SUCH THAT ALL VARIABLES ARE UPDATED TO WHAT'S IN THE SERVER
        body: JSON.stringify({ blood_amount: curMovie.blood_amount += formBlood })
    })
    .then(res => res.json())
    .then(data => {
        
    })
})

//fetch to get all information
fetch(url)
	.then((res) => res.json())
	.then((data) => {
		data.forEach((movie) => {
			//add image to nav bar
			let navImg = document.createElement("img");
			navImg.src = movie.image;
			nav.append(navImg);
			//on nav click, populate details
			navImg.addEventListener("click", () => {
				fillDetails(movie);
			});
		});
		//on page load, populate detail with first movie
		fillDetails(data[0]);
	});
