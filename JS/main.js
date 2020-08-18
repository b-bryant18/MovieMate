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
                        //imdbID needs to be in quotes or console will think it's a var
                    </div>
                </div>
                `;
            });
            console.log($('#movies'));
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
    let movieId = sessionStorage.getItem('movieId ');

}

//.catch will log errors to console

