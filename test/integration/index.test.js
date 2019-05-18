const startServer = require('../../server/src/index.js')
const fetch = require('node-fetch');

let server, baseURL;

beforeAll(async () => {
    server = await startServer();
    baseURL = `http://localhost:${server.address().port}/api/v1`
})

afterAll(() => {
    server.close()
})

test('Se debería iniciar la aplicación sin películas', async () => {
    const URL = `${baseURL}/movies`;
    const req = await fetch(URL)
    const movies = await req.json()

    expect(movies.length).toBe(0)
});

test('Al eliminar una pelicula desde la API, esta misma no debe estar en BD', async () => {
    let movies;
    let req;
    let res;
    const movie = {
        title: 'The Avengers 4: End Game',
        description: 'The serious course of events set in motion by Thanos, who destroyed half the universe and the ranks of the Avengers, forces the remaining Avengers to prepare for a final battle in the grand conclusion of the 22 Marvel Studios films, Avengers: Endgame.',
        year: 2019,
        runtime: 185,
        country: 'United States',
        language: 'English',
        genres: ['Adventure', 'Comedy', 'Science Fiction'],
        directors: ['Anthony Russo', 'Joe Russo'],
        writers: ['Stephen McFeely', 'Christopher Markus']
    }

    await fetch(`${baseURL}/movies`, {
        method: 'POST',
        body: JSON.stringify(movie),
        headers:{
            'Content-Type': 'application/json'
        }
    });

     req = await fetch(`${baseURL}/movies`);
     movies = await req.json();
     await fetch(`${baseURL}/movies/${movies[0].id}`, {method: 'DELETE'}); 
     req = await fetch(`${baseURL}/movies`);
     movies = await req.json();

     expect(movies.length).toBe(0);     
});
