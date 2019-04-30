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
    editModalBtnModify: document.querySelector('#editMovieBtn'),
    cancelModalBtnModify: document.querySelector('#closeBtnM'),
    modifyModalBtnModify: document.querySelector('#modifyMovieBtnM'),
    closeModalBtnModify: document.querySelector('#cancelBtnM'),

    cancelModalBtn: document.querySelector('#cancelModalBtn'),
    saveMovieBtn: document.querySelector('#saveMovieBtn'),
    addMovieBtn: document.querySelector('#addMovieBtn'),
    deleteMovieBtn: document.querySelector('#deleteMovieBtn'),
    closeModalBtn: document.querySelector('#closeModalBtn'),

    modal: document.querySelector('#modal'),
    modalM: document.querySelector('#modalM'),

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

function openModalEdit() {
    $refs.modalM.classList.add('is-active')
}

function closeModalEdit() {
    $refs.modalM.classList.remove('is-active')
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

function editMovie(){
}

function deleteMovie() {
    const moviesToBeDeleted = table.getSelectedRows();

    for(let i = 0; i < moviesToBeDeleted.length; i++){
        movieService.deleteMovie(moviesToBeDeleted[i].id);
    }
}

// Levantamos los listeners de la app
$refs.addMovieBtn.addEventListener('click', openModal)
$refs.cancelModalBtn.addEventListener('click', closeModal)
$refs.closeModalBtn.addEventListener('click', closeModal)
$refs.saveMovieBtn.addEventListener('click', saveMovie)
$refs.deleteMovieBtn.addEventListener('click', deleteMovie)
$refs.editModalBtnModify.addEventListener('click', openModalEdit)
$refs.cancelModalBtnModify.addEventListener('click', closeModalEdit)
$refs.closeModalBtnModify.addEventListener('click', closeModalEdit)
$refs.modifyModalBtnModify.addEventListener('click', editMovie)