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
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=c969a4af&t=' + searchText)
        .then((response) => {
            console.log(response)
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                <div class="col-md-3">
                <div class= "well text-center">
                <img src ="movie.Poster">
                <h5>${movie.Title}</h5>
                <a onClick="movieSelected('${movie.imdbID}') class="btn btn-primary" href="#">Movie Details</a>
                //imdbID needs to be in quotes or console will think it's a var
                </div>
                </div>
                `
            });
        })
        .catch((err) => {
            console.log(err)
        });
}
// .then will work if we get data back from axios.get
//Need to include api key, t= means title + user input
//.catch will log errors to console

