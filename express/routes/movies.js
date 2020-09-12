var express = require('express');
var router = express.Router();
var movies = require('../json/movies.json');

// 영화 목록 관련
router.get('/', function (req, res, next) {
 res.send(movies)
});

// 상세 페이지 관련
router.get('/:id', function (req, res, next) {
 var id = parseInt(req.params.id, 10)
 var movie = movies.filter(function (movie) {
    return movie.id === id
 });

 res.send(movie)
});

module.exports = router;