function init() {

// Recuperamos el JSON almacenado en el localStorage (la pelicula a renderizar)
const movie = JSON.parse(localStorage.getItem('movie'))


// Genereamos la vista de la pelicula con JS
document.getElementById('title').innerHTML = movie.titulo
document.getElementById('description').innerHTML = movie.descripcion
document.getElementById('year').innerHTML = movie.anio
if(movie.genero == null){
    document.getElementById('genre').innerHTML = ""
} else {
    document.getElementById('genre').innerHTML = movie.genero
}
document.getElementById('runtime').innerHTML = movie.duracion
document.getElementById('country').innerHTML = movie.pais
document.getElementById('language').innerHTML = movie.lenguaje
document.getElementById('directors').innerHTML = movie.directores
document.getElementById('writers').innerHTML = movie.guionistas
}