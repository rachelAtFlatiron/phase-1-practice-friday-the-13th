const url = "http://localhost:3000";
//obtain the element that we need to append to (movie-list)
const movieList = document.getElementById("movie-list");
const button = document.getElementById('watched')
const form = document.getElementById('blood-form')
//fetch the data: http://localhost:3000/movies
fetch(`${url}/movies`)
	//get JSON
	.then((res) => res.json())
	.then((data) => {
		//Challenge 1: show all movies in nav
		data.forEach((curMovie) => {

			const movieImage = document.createElement("img");
			//how to get src for each movie
			movieImage.src = curMovie.image;
			//add image to movie list
			movieList.append(movieImage);
			//on image click populate details with data
            console.log(`making click for ${curMovie.title}`)
			movieImage.addEventListener("click", () => {
                renderMovie(curMovie)
            });
		});

		renderMovie(data[0]);
	});

function renderMovie(movie) {
	//Challenge 2: display details for first movie
	//get elements and add text content
	const title = document.getElementById("title");
	const year = document.getElementById("year-released");
	const description = document.getElementById("description");
	const watchedButton = document.getElementById("watched");
	const blood = document.getElementById("amount");
	const image = document.getElementById("detail-image");
	title.textContent = movie.title;
	year.textContent = movie.release_year;
	description.textContent = movie.description;
	image.src = movie.image;
	blood.textContent = movie.blood_amount;

	//update text content of button
	//movie.watched is already a boolean value
	if (movie.watched) {
		watchedButton.textContent = "Watched";
	} else {
		watchedButton.textContent = "Unwatched";
	}
}

//event listener 'click'
//if watched/unwatched
//get button element and check string
button.addEventListener('click', () => {
    if(button.innerText === 'Unwatched'){
        button.innerText = 'Watched'
    } else {
        button.innerText = 'Unwatched'
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let bloodAmount = document.getElementById('amount')
    //NOTE PARSEINT
    let curDrops = parseInt(bloodAmount.textContent)
    let formDrops = parseInt(e.target['blood-amount'].value)
    bloodAmount.textContent = curDrops + formDrops
})
