const { Router } = require('express');
const { getTemperaments } = require('../controllers');
const {Temperament} = require('../db');

const temperamentRoute = Router();

module.exports = temperamentRoute;

temperamentRoute.get('/', async (req, res) => {
    try {
        const temperaments = await getTemperaments();
        res.status(200).json(temperaments);
    }
    catch (e){
        res.status(404).json({error: e.message });
    }
    
})