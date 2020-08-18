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
        })
        .catch((err) => {
            console.log(err)
        });
}
// .then will work if we get data back from axios.get
//Need to include api key, t= means title + user input
//.catch will log errors to console

