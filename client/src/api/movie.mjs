function getAll() {
    return fetch('/api/v1/movies')
        .then(result => result.json())
}

function deleteMovie(id) {
    return fetch('/api/v1/movies/'+id, {method: 'DELETE'})
    .then(function(response) {
        return response;
      })
      .then(function(myRes) {
        alert('La película ' + id + ' fue borrada exitosamente');
        location.reload();
      })
      .catch(function(error){
        alert('La película ' + id + ' no fue encontrada');
      });
}

function createMovie(m) {
    console.log(m.year);
    const año = m.year.toString().slice(10, 15);

    const data = JSON.stringify({ title: m.name, description: m.plot, year: año, country: m.country, runtime: m.runtime, language: m.language, generes: m.generes, writers: m.writers, directors: m.directors })
    return fetch('/api/v1/movies', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    })

}

function getMovie(id){
    return fetch('/api/v1/movies/'+id, {method:'GET'})
      .then(function(res){
          return res.json();
      })
      .then(function(myRes){
          console.log(myRes);
          var pelicula = {
              titulo : myRes.title,
               descripcion : myRes.description,
               anio : myRes.year,
               duracion: myRes.runtime, 
               pais: myRes.country, 
               lenguaje: myRes.language,
               genero: myRes.genres,
               directores : myRes.directors, 
               guionistas: myRes.writers
          }
          localStorage.setItem('movie', JSON.stringify(pelicula));
          window.location.assign('./../movie.html');
      });      
}     

export default {
    getAll,
    createMovie, 
    deleteMovie, 
    getMovie
}