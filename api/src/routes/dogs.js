const { Router } = require('express');
const { getAllBreeds, getBreedsFromQuery, getBreedbyID } = require('../controllers');
const {Dogs} = require('../db');

const dogsRoute = Router();

module.exports = dogsRoute;

dogsRoute.get('/', async (req, res) => {
    const { name } = req.query;
    if (name) {
        try{
            let breeds = await getBreedsFromQuery(name);
            if (breeds.length) return res.status(200).json(breeds);
            else return res.status(404).send(`No breeds where found with the name: ${name}`)
        }
        catch (e) {
            res.status(404).json({error: e.message })
        }
    }
    else{
        try{
            res.status(200).json(await getAllBreeds());
        }
        catch (e) {
            res.status(404).json({error: e.message })
        }
    }
})

dogsRoute.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        let breed = await getBreedbyID(id);
        if(breed) return res.status(200).json(breed);
        else return res.status(404).send(`No breed was found with the id: ${id}`)
        }
        catch (e) {
            res.status(404).json({error: e.message })
        }
})