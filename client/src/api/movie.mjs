function getAll() {
    return fetch('/api/v1/movies')
        .then(result => result.json())
}

function getOneMovie(id) {
    return fetch(`/api/v1/movies/${id}`).then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status
        })));
}

function deleteMovie(id) {
    return fetch('/api/v1/movies/' + id, { method: 'DELETE' })
        .then(function(response) {
            return response;
        })
        .then(function(myRes) {
            alert('La película ' + id + ' fue borrada exitosamente');
            location.reload();
        })
        .catch(function(error) {
            alert('La película ' + id + ' no fue encontrada');
        });
}

function editMovie(id,mo){

    const data = JSON.stringify({ title: mo.name, description: mo.plot, year: mo.year, country: mo.country, runtime: mo.runtime, language: mo.language, generes: mo.generes, writers: mo.writers, directors: mo.directors })
    return fetch(`/api/v1/movies/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    })

}

function createMovie(m) {
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

export default {
    getAll,
    getOneMovie,
    createMovie,
    editMovie,
    deleteMovie
}