const { Router } = require('express');
const { getAllBreeds, getBreedsFromQuery, getBreedbyID, createDog, deleteDog } = require('../controllers');
const { Breed } = require('../db');

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
        if(breed && breed.length) return res.status(200).json(breed[0]);
        else return res.status(404).send(`No breed was found with the id: ${id}`)
        }
        catch (e) {
            res.status(404).json({error: e.message })
        }
})

dogsRoute.post('/', async (req, res) => {
    const {name, height_min, height_max, weight_min, weight_max, life_span, tempID, image_url} = req.body;
    if (!name || (!height_min && !height_max) || (!weight_min && !weight_max) || !tempID){
        return res.status(404).send('Not all the mandatory fields were filled');
    }
    
    try {
        const newDog = await createDog(name, height_min, height_max, weight_min, weight_max, life_span, tempID, image_url)
        return res.status(200).json(newDog);
    }
    catch (e) {
        return res.status(400).send("Error in data provided");
    }
})

dogsRoute.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        res.status(200).json(await deleteDog(id));
        
    } catch (error) {
        return res.status(404).json({error: error.message })
    }
} )