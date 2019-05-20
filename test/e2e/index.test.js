const fetch = require('node-fetch')
const startServer = require('../../server/src/index.js')
const movieService = require("../../client/src/api/movie.mjs")


async function getText(element) {
    return page.evaluate(element => element.textContent, element);
}

async function isVisible(element) {
    if (typeof element === 'string') {
        element = page.$(element);
    }

    return page.evaluate(element => {
        return element.offsetWidth > 0 && element.offsetHeight > 0;
    }, element);
}

let server, baseURL;

beforeEach(async() => {
    server = await startServer();
    baseURL = `http://localhost:${server.address().port}`
    await page.goto(baseURL);
})

afterEach(async() => {
    server.close();
})

// ----- TEST ---------
test('El titulo debería ser Filmster', async() => {
    await expect(page.title()).resolves.toMatch('Filmster');
})

test('El modal de agregar película debería iniciar oculto', async() => {
    const visibility = await isVisible('#modal');
    expect(visibility).toBe(false);
})

test('Debería renderizar la tabla de películas', async() => {
    // $ es como querySelector

    const table = await page.$('table#movies');
    expect(table).not.toBe(null);
})

test('Debería renderizar boton agregar', async() => {
    // $ es como querySelector
    const agregarBtn = await page.$('.card-header-actions button:nth-child(2)');
    // Me fijo que el boton exista
    expect(agregarBtn).not.toBe(null);
    const text = await getText(agregarBtn);
    expect(text).toBe('Agregar');
})

test('La tabla debería iniciar sin datos', async() => {
    // $$ es como querySelectorAll
    const rows = await page.$$('table#movies tbody tr');

    expect(rows.length).toBe(0);
})

test('La tabla debería mostrar los datos cargados en la db', async() => {
    const movie = {
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

    await fetch(`${baseURL}/api/v1/movies`, {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    await page.reload();
    const rows = await page.$$('table#movies tbody tr');

    expect(rows.length).toBe(1);

    const title = await page.$eval('table#movies tbody tr td:nth-child(2)', el => el.innerText);
    expect(title).toBe(movie.title);
})

test('Se debería poder seleccionar una película', async() => {
    const movie = {
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

    await fetch(`${baseURL}/api/v1/movies`, {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    await page.reload();
    const rows = await page.$$('table#movies tbody tr');

    expect(rows.length).toBe(1);

    await page.$eval('table#movies tbody tr td:nth-child(1) input', firstCheck => firstCheck.click());
    const selectedRows = await page.evaluate(() => window.table.getSelectedRows());
    expect(selectedRows.length).toBe(1);
    expect(selectedRows[0].title).toBe(movie.title);
})


test('Se debería poder ver el detalle de una película', async() => {

    const movie = {
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

    await fetch(`${baseURL}/api/v1/movies`, {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    await page.reload();
    const rows = await page.$$('table#movies tbody tr');

    expect(rows.length).toBe(1);

    await page.$eval('table#movies tbody tr td:nth-child(1) input', firstCheck => firstCheck.click());
    const selectedRows = await page.evaluate(() => window.table.getSelectedRows());
    expect(selectedRows.length).toBe(1);

    await fetch(`${baseURL}/api/v1/movies/` + selectedRows[0].id, { method: 'GET' })
        .then(
            function(res) {
                return res.json();
            }
        )
        .then(
            function(res) {
                var pelicula = {
                    titulo: res.title,
                    descripcion: res.description,
                    anio: res.year,
                    duracion: res.runtime,
                    pais: res.country,
                    lenguaje: res.language,
                    genero: res.genres,
                    directores: res.directors,
                    guionistas: res.writers
                }
                page.evaluate(({ pelicula }) => window.localStorage.setItem('movie', JSON.stringify(pelicula)), { pelicula });
            })


    await page.goto(baseURL + '/movie.html');

    const titulo = await page.$('span#title');
    const valueTitulo = await page.evaluate(titulo => titulo.innerText, titulo);
    const descripcion = await page.$('span#description');
    const valueDescription = await page.evaluate(descripcion => descripcion.innerText, descripcion);
    const anio = await page.$('span#year');
    const valueAnio = await page.evaluate(anio => anio.innerText, anio);
    const duracion = await page.$('span#runtime');
    const valueDuracion = await page.evaluate(duracion => duracion.innerText, duracion);
    const pais = await page.$('span#country');
    const valuePais = await page.evaluate(pais => pais.innerText, pais);
    const lenguaje = await page.$('span#language');
    const valueLenguaje = await page.evaluate(lenguaje => lenguaje.innerText, lenguaje);
    const genero = await page.$('span#genre');
    const valueGenero = await page.evaluate(genero => genero.innerText, genero);
    const directores = await page.$('span#directors');
    const valueDirectores = await page.evaluate(directores => directores.innerText, directores);
    const guionistas = await page.$('span#writers');
    const valueGuionistas = await page.evaluate(guionistas => guionistas.innerText, guionistas);

    expect(valueTitulo).toBe(movie.title);
    expect(valueDescription).toBe(movie.description);
    expect(valueAnio).toBe(movie.year.toString());
    expect(valueDuracion).toBe(movie.runtime.toString());
    expect(valuePais).toBe(movie.country);
    expect(valueLenguaje).toBe(movie.language);
    expect(valueGenero).toBe(movie.genres.toString());
    expect(valueDirectores).toBe(movie.directors.toString());
    expect(valueGuionistas).toBe(movie.writers.toString());

})