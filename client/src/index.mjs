import Table from './components/table.mjs'
import movieService from './api/movie.mjs'

// Inicializamos la tabla
window.table = Table('#movies', {
    header: [
        { label: 'Título', field: 'title' },
        { label: 'Descripción', field: 'description' },
        { label: 'Año', field: 'year' },
        { label: 'Pais', field: 'country' },
        {
            label: 'Guionistas',
            field: 'writers',
            render: function(data) { return data.join(', ') }
        },
        { label: 'Directores', field: 'directors' }
    ],
    data: [],
    // Esta funcion se ejecuta cuando seleccionamos una pelicula
    onSelectedRow: function(row) {
        console.log(table.getSelectedRows())
    },
    // Esta funcion se ejecuta cuando deseleccionamos una pelicula
    onDeselectedRow: function() {
        console.log(table.getSelectedRows())
    }
})

//var botonAgregar = document.getElementById("addMovieBtn");
//botonAgregar.addEventListener("click",function(){
//                       alert('En desarrollo');
//   });



// Obtenemos todas las peliculas
movieService.getAll().then(table.update)

// Guardamos todas las referencias a elementos que vamos a
// necesitar
const $refs = {
    cancelModalBtn: document.querySelector('#cancelModalBtn'),
    saveMovieBtn: document.querySelector('#saveMovieBtn'),
    addMovieBtn: document.querySelector('#addMovieBtn'),
    deleteMovieBtn: document.querySelector('#deleteMovieBtn'),
    displayMovieBtn: document.querySelector('#displayMovieBtn'),
    closeModalBtn: document.querySelector('#closeModalBtn'),

    modal: document.querySelector('#modal'),

    movieName: document.querySelector('#movieName'),
    moviePlot: document.querySelector('#moviePlot'),
    movieReleaseDate: document.querySelector('#movieReleaseDate'),
    movieCountry: document.querySelector('#movieCountry'),
    movieRuntime: document.querySelector('#movieRuntime'),
    movieLanguage: document.querySelector('#movieLanguage'),
    movieGeneres: document.querySelector('#movieGeneres'),
    movieWriters: document.querySelector('#movieWriters'),
    movieDirectors: document.querySelector('#movieDirectors')
}

/*
 * Abre el modal
 */
function openModal() {
    $refs.modal.classList.add('is-active')
}

/*
 * Cierra el modal
 */
function closeModal() {
    $refs.modal.classList.remove('is-active')
}

function parseCSV(val) {
    return val.split(',').flatMap(v => v.split());
}

/*
 * Guarda una pelicula
 */
function saveMovie() {
    const movie = {
        name: $refs.movieName.value,
        plot: $refs.moviePlot.value,
        year: new Date($refs.movieReleaseDate.value),
        country: $refs.movieCountry.value,
        runtime: +$refs.movieRuntime.value,
        language: $refs.movieLanguage.value,
        generes: parseCSV($refs.movieGeneres.value),
        writers: parseCSV($refs.movieWriters.value),
        directors: parseCSV($refs.movieDirectors.value)
    }
    movieService.createMovie(movie);
    location.reload(); //Actualizamos página

}

function deleteMovie() {
    const moviesToBeDeleted = table.getSelectedRows();

    for (let i = 0; i < moviesToBeDeleted.length; i++) {
        movieService.deleteMovie(moviesToBeDeleted[i].id);
    }
}

function displayMovie(){
    const movieToBeDisplayed = table.getSelectedRows();
    if(movieToBeDisplayed.length == 0){
        alert('Debe seleccionar una pelicula para ver el detalle!')
    } else {
        if(movieToBeDisplayed.length > 1){
             alert('Debe seleccionar solo una pelicula para ampliar el detalle')
        } else {
             movieService.getMovie(movieToBeDisplayed[0].id);
        }
    }
}

// Levantamos los listeners de la app
$refs.addMovieBtn.addEventListener('click', openModal)
$refs.cancelModalBtn.addEventListener('click', closeModal)
$refs.closeModalBtn.addEventListener('click', closeModal)
$refs.saveMovieBtn.addEventListener('click', saveMovie)
$refs.deleteMovieBtn.addEventListener('click', deleteMovie)
$refs.displayMovieBtn.addEventListener('click', displayMovie)