const Sequelize = require('sequelize')

const db = require('../db.js')

const Movie = db.define('Movie', {
	// attributes
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING
	},
	year: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	runtime: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	country: {
		type: Sequelize.STRING,
		allowNull: false
	},
	language: {
		type: Sequelize.STRING,
		allowNull: false
	},
	genres: {
		type: Sequelize.JSON
	},
	directors: {
		type: Sequelize.JSON
	},
	writers: {
		type: Sequelize.JSON
	}
}, {
  tableName: 'Movie'
})

const getAll = () => Movie.findAll().then(movies => movies)

const create = (data) =>
	Movie.sync().then(() =>
		Movie.create(data)
	)

const get = (id) => Movie.findOne({where: {id: id}}).then(movie => movie)

const update = (id, data) => {
	return Movie.findOne({where: {id: id}}).then(movie => {
		if (movie != null) {
			return movie.update(data).then(d => d)
		}
		return null
	})	
}

const eliminar = (id) => Movie.destroy({where: {id : id}})
							.then(function(deleteRecord){
								if (deleteRecord === 1){
									return true
								} else {
									return false
								}
							})

const MovieModel = {
	Movie: Movie,
	getAll: getAll,
	create: create,
	get: get,
	update: update,
	delete: eliminar
}


module.exports = MovieModel