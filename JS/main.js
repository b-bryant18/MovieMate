$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    })
});

// Looks at searchForm ID and upon submit takes the searchText val and passes it to 
//the getMovies function created below.

function getMovies(searchText) {
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=c969a4af&s=' + searchText)
        //Need to include api key
        //&s= means search + searchInput from user
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                //movie is arbitrary name for data
                output += `
                <div class="col-md-3">
                    <div class= "well text-center">
                        <img src ="${movie.Poster}">
                             <h5>${movie.Title}</h5>
                                <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#"> Movie Details </a>
                    </div>
                </div>
                `;
            });
            //imdbID needs to be in quotes or console will think it's a var

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err)
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    // console.log(movieId);

    axios.get('http://www.omdbapi.com/?apikey=c969a4af&i=' + movieId)
        //Removed i=tt3896198 from axios req to get this to work
        //Changed &s= to &i= to search by ID
        .then((response) => {
            console.log(response);
            let movie = response.data;

            //col-md-4
            //col-md-8

            let output = `
            <div class="row>
            <div class"column" id="poster">
            <img src = "${movie.Poster}" class="thumbnail">
            </div>

            <div class="column">
            <h2> ${movie.Title}</h2>
            <ul class="list-group">
            <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
            <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
            <li class="list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
            <li class="list-group-item"><strong>Writers: </strong>${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
            </ul>
            </div>
            </div>

            `;
            // movie.Object needs to be capitalized to work

            $('#movie').html(output);
            // Puts selected movie info onto page
        })
        .catch((err) => {
            console.log(err);
        });
}

// <div class="row">
//             <div class="well">
//             <h3>Plot:<br> ${movie.Plot}
//             <hr>
//             <a href="htpp://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
//             <a href="index.html" class="btn btn-default">Go Back To Search</a>
//             </h3>
//             </div>
//             </div>
