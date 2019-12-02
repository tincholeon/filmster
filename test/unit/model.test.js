const MovieModels = require('../../server/src/models/movie.js')

beforeEach(async() => {
    await MovieModels.Movie.sync({ force: true });
})

test('Crear película', async() => {
    const movieData = {
        title: 'Back to the Future',
        description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
        year: 1985,
        runtime: 116,
        country: 'United States',
        language: 'English',
        genres: ['Adventure', 'Comedy', 'Science Fiction'],
        directors: ['Robert Zemeckis'],
        writers: ['Robert Zemeckis', 'Bob Gale']
    };

    // Creamos la pelicula
    const movie = await MovieModels.create(movieData)

    expect(movie.title).toBe(movieData.title);
    expect(movie.description).toBe(movieData.description);
    expect(movie.year).toBe(movieData.year);

    // Completar test
})

test('Crear película sin título', async() => {
    const movieData = {
        description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
        year: 1985,
        runtime: 116,
        country: 'United States',
        language: 'English',
        genres: ['Adventure', 'Comedy', 'Science Fiction'],
        directors: ['Robert Zemeckis'],
        writers: ['Robert Zemeckis', 'Bob Gale']
    };

    try {
        await MovieModels.create(movieData)
    } catch (e) {
        expect(e.name).toBe('SequelizeValidationError')
    }
})

test('Obtener película', async() => {
    const movieData = {
        title: 'Back to the Future',
        description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
        year: 1985,
        runtime: 116,
        country: 'United States',
        language: 'English',
        genres: ['Adventure', 'Comedy', 'Science Fiction'],
        directors: ['Robert Zemeckis'],
        writers: ['Robert Zemeckis', 'Bob Gale']
    };

    // Creamos la pelicula
    const movie = await MovieModels.create(movieData)
    const recivedMovie = await MovieModels.get(movie.id);

    expect(movie.id).toBe(recivedMovie.id);
    expect(movie.title).toBe(recivedMovie.title);
    expect(movie.year).toBe(recivedMovie.year);

    // Completar test
});

test('Editar película', async() => {

    const movieData1 = {
        title: 'Back to the Future',
        description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
        year: 1985,
        runtime: 116,
        country: 'United States',
        language: 'English',
        genres: ['Adventure', 'Comedy', 'Science Fiction'],
        directors: ['Robert Zemeckis'],
        writers: ['Robert Zemeckis', 'Bob Gale']
    };

    // Creamos la pelicula
    const movie1 = await MovieModels.create(movieData1)

    //Datos de la nueva pelicula
    const movieData2 = {
        title: 'Avengers Endgame',
        description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
        year: 2019,
        runtime: 116,
        country: 'United States',
        language: 'English',
        genres: ['Adventure', 'Comedy', 'Science Fiction'],
        directors: ['Robert Zemeckis'],
        writers: ['Robert Zemeckis', 'Bob Gale']
    };

    // Editamos la pelicula
    const movie2 = await MovieModels.update(movie1.id, movieData2)
    const recivedMovie = await MovieModels.get(movie2.id);

    expect(movie2.id).toBe(recivedMovie.id);
    expect(movie2.title).toBe(recivedMovie.title);
    expect(movie2.year).toBe(recivedMovie.year);

    // Completar test
});