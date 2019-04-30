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

export default {
    getAll, 
    deleteMovie
}
