const url = "http://localhost:3000/movies"

const movieNav = document.getElementById('movie-list')
const btn = document.getElementById('watched')
const form = document.getElementById('blood-form')
const amt = document.getElementById('amount')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    amt.textContent = parseInt(amt.textContent) + parseInt(e.target['blood-amount'].value)
})

btn.addEventListener('click', () => {
    btn.textContent === 'Watched' ? btn.textContent = 'Unwatched' : btn.textContent = 'Watched'
})
const showMovie = (id) => {
    fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(data => {
        
        const title = document.getElementById('title')
        let year = document.getElementById('year-released')
        let des = document.getElementById('description')
        let img = document.getElementById('detail-image')

        img.src = data.image
        title.textContent = data.title,
        year.textContent = data.release_year
        des.textContent = data.description
        amt.textContent = data.blood_amount

        data.watched ? btn.textContent = "Watched" : btn.textContent = "Unwatched"

    })
}

fetch(url)
.then(res => res.json())
.then(data => {
    data.forEach(movie => {
        let img = document.createElement('img')
        img.src = `.${movie.image}`
        movieNav.append(img)
        img.addEventListener('click', () => {
            showMovie(movie.id)
        })
    })
})

showMovie(1)



