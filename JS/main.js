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
    axios.get('http://www.omdbapi.com?s' + searchText)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        });
}
// .then will work if we get data back from axios.get
//If we get an error back console.log it