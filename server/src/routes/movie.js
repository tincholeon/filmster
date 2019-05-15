const express = require('express')
const MovieModel = require('../models/movie')
const router = express.Router()

router.get('/', function(req, res) {
    MovieModel.getAll().then((movies) =>
        res.status(200).send(movies)
    ).catch(_ => res.status(500).send('Error al obtener las películas'))
})

router.post('/', function(req, res) {
    MovieModel.create(req.body).then((data) =>
        res.status(201).send(data)
    ).catch(_ => res.status(500).send('Error al crear película'))
})

router.post('/', function (req, res) {
	MovieModel.create(req.body).then((data) =>
		res.status(201).send(data)
	).catch(_ => res.status(500).send(_))
})

router.get('/:id', function(req, res) {
    MovieModel.get(req.params.id).then((movie) => {
        if (movie == null) {
            res.status(404).send('La película ' + req.params.id + ' no fue encontrada')
        } else
            res.status(200).send(movie);
    }).catch(_ => res.status(500).send('Error al obtener película'))
})

router.put('/:id', function(req, res) {
    MovieModel.update(req.params.id, req.body).then((movie) => {
        if (movie == null) {
            res.status(404).send('La película ' + req.params.id + ' no fue encontrada')
        } else
            res.status(200).send(movie)
    }).catch(_ => res.status(500).send('Error al editar película'))
})

router.delete('/:id', function(req, res) {
    MovieModel.delete(req.params.id).then((movie) => {
        if (movie == null) {
            res.status(404).send('La película ' + req.params.id + ' no fue encontrada')
        } else
            res.status(200).send('La película ' + req.params.id + 'fue borrada exitosamente')
    }).catch(_ => res.status(500).send('Error al borrar película'))
})

//router.delete('/:id', function(req, res){
//	MovieModel.delete(req.params.id).then((rta) => {
//		if(rta){
//			return res.status(200).send('Pelicula eliminada');
//		}else{
//			return res.status(400).send('La película ' + req.params.id + ' no fue encontrada')
//		}
//	}).catch(_ => res.status(400).send('Error al obtener película'))	
//})

module.exports = router