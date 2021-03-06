import Table from './components/table.mjs'
import { parseCSV } from './utils.mjs'
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
    displayMovieBtn: document.querySelector('#displayMovieBtn'),
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
    movieDirectors: document.querySelector('#movieDirectors'),

    movieNameM: document.querySelector('#movieNameM'),
    moviePlotM: document.querySelector('#moviePlotM'),
    movieReleaseDateM: document.querySelector('#movieReleaseDateM'),
    movieCountryM: document.querySelector('#movieCountryM'),
    movieRuntimeM: document.querySelector('#movieRuntimeM'),
    movieLanguageM: document.querySelector('#movieLanguageM'),
    movieGeneresM: document.querySelector('#movieGeneresM'),
    movieWritersM: document.querySelector('#movieWritersM'),
    movieDirectorsM: document.querySelector('#movieDirectorsM')
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

// Abre el modal de editar

function openModalEdit() {
    const movieToBeEdit = table.getSelectedRows();
    if ((movieToBeEdit.length > 1) || (movieToBeEdit == 0)){
        alert('Se debera seleccionar una pelicula para editar');
    }else {
        const mov = movieService.getOneMovie(movieToBeEdit[0].id);
        mov.then(function(movie){
            console.log(movie.data);
            $refs.movieNameM.value = movie.data.title;
            $refs.moviePlotM.value = movie.data.description;
            $refs.movieReleaseDateM.value = movie.data.year;
            $refs.movieCountryM.value = movie.data.country;
            $refs.movieRuntimeM.value = movie.data.runtime;
            $refs.movieLanguageM.value = movie.data.language;
            $refs.movieGeneresM.value = movie.data.genres;
            $refs.movieWritersM.value = movie.data.writers;
            $refs.movieDirectorsM.value = movie.data.directors;
        });
        $refs.modalM.classList.add('is-active');
    }
}

// Cierra el modal de editar

function closeModalEdit() {
    $refs.modalM.classList.remove('is-active')
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

// Edita una pelicua ya existente

function editMovie(){

    const movieTobeEdit = table.getSelectedRows();
    var idMovie = movieTobeEdit[0].id;
    
    const movie = {
        
        name: $refs.movieNameM.value,
        plot: $refs.moviePlotM.value,
        year: $refs.movieReleaseDateM.value,
        country: $refs.movieCountryM.value,
        runtime: $refs.movieRuntimeM.value,
        language: $refs.movieLanguageM.value,
        generes: parseCSV($refs.movieGeneresM.value),
        writers: parseCSV($refs.movieWritersM.value),
        directors: parseCSV($refs.movieDirectorsM.value)
        
    }   

    if ((movie.year.length==4)&&(movie.year >= 1900)&&(movie.year < 2050)){
        movieService.editMovie(idMovie,movie);
    }else{
        alert('Error, vuelva a intentarlo');
    }
    location.reload(); 
   
}

// Elimina una pelicula 

function deleteMovie() {
    const moviesToBeDeleted = table.getSelectedRows();

    if(moviesToBeDeleted.length == 0){
         alert('Debe selecionar una pelicula para eliminar!')
    } else {
            for (let i = 0; i < moviesToBeDeleted.length; i++) {
                  movieService.deleteMovie(moviesToBeDeleted[i].id);
            }
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
$refs.editModalBtnModify.addEventListener('click', openModalEdit)
$refs.cancelModalBtnModify.addEventListener('click', closeModalEdit)
$refs.closeModalBtnModify.addEventListener('click', closeModalEdit)
$refs.modifyModalBtnModify.addEventListener('click', editMovie)
$refs.displayMovieBtn.addEventListener('click', displayMovie)
