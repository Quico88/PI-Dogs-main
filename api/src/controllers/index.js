const { API_KEY } = process.env;
const axios = require('axios');
const { Breed , Temperament} = require('../db');

const getBreedsFromAPI = async () => {
        const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        if (!data) throw new Error (`Error! status: ${data.status}`);
        const breedsFromAPI = data.map(e => (
            {
                    id: e.id,
                    name: e.name,
                    height: e.height.metric!='NaN' ? e.height.metric : e.height.imperial,
                    weight: e.weight.metric.includes('NaN') ? "1 - 99" : e.weight.metric,
                    life_span: e.life_span,
                    image_url: e.image.url,
                    temperaments: e.temperament ? e.temperament.split(', ').map(temp => ({name: temp})) : null,
                    home_grown_data: false,
                    bred_for: e.bred_for
            }));
        return breedsFromAPI;
}

const getBreedsFromDB = async () => {
    try {
        const dbBreeds = await Breed.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });
        return dbBreeds;
    }
    catch(e){
        console.log(e.message);
    }
    
    return [];
}


const getAllBreeds = async () => {
    let APIinfo = await getBreedsFromAPI();
    let DBInfo = await getBreedsFromDB();
    let allBreeds = APIinfo.concat(DBInfo);
    return allBreeds;
}

const getBreedsFromQuery = async (searchedName) => {
    let allBreeds = await getAllBreeds();
    let foundBreeds = allBreeds.filter(breed => breed.name.toLowerCase().includes(searchedName));
    return foundBreeds;
}

const getBreedbyID = async (id) => {
    let allBreeds = await getAllBreeds();
    let foundBreed = allBreeds.filter(breed => breed.id == id);
    return foundBreed;
}

const getTemperaments = async () => {
    const temperamentsDB = await Temperament.findAll();
    if(temperamentsDB.length > 0){
        return temperamentsDB;
    }

    const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    
    if (!data) throw new Error (`Error! status: ${data.status}`);
    
    let TemperamentsAPI = [];
    
    data.forEach(el => {
        el.temperament ? TemperamentsAPI.push(el.temperament.split(', ')) : ""
    });
    
    const TemperamentList = [...new Set(TemperamentsAPI.flat())];
    const TemperamentList_Object = TemperamentList.map(e => ({name: e}))
    
    Temperament.bulkCreate(TemperamentList_Object);
    
    const temperaments = await Temperament.findAll();
    return temperaments;
}

const createDog = async(name, height_min, height_max, weight_min, weight_max, life_span, tempID, image_url) =>{
    
    let weight = "";
    if (weight_min && weight_max) weight+=`${weight_min} - ${weight_max}`;
    else if (weight_min) weight+=weight_min;
    else weight+=weight_max;

    let height = "";
    if (height_min && height_max) height+=`${height_min} - ${height_max}`;
    else if (height_min) height+=height_min;
    else height+=height_max;

    
    const newDog = await Breed.create({
        name,
        height,
        weight,
        life_span,
        image_url
    })

    await newDog.setTemperaments(tempID);

    const createdDog = await Breed.findByPk(newDog.id, {
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });

    return createdDog;
}

const updateDog = async (id, name, height_min, height_max, weight_min, weight_max, life_span, tempID, image_url) => {
    
    let weight = "";
    if (weight_min && weight_max) weight+=`${weight_min} - ${weight_max}`;
    else if (weight_min) weight+=weight_min;
    else weight+=weight_max;

    let height = "";
    if (height_min && height_max) height+=`${height_min} - ${height_max}`;
    else if (height_min) height+=height_min;
    else height+=height_max;

    const TBUpdated = await Breed.findByPk(id, {
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });

    await TBUpdated.update({name, height, weight, life_span, image_url})
    if(tempID) await TBUpdated.setTemperaments(tempID);
    
    const updatedDog = await Breed.findByPk(id, {
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    
    return updatedDog;
}

const deleteDog = async (id) => {
    let TBDeleted = await Breed.destroy({
        where: {id}
    });
    return TBDeleted;
}
    

module.exports = {
    getAllBreeds,
    getBreedsFromQuery,
    getBreedbyID,
    getTemperaments,
    createDog,
    deleteDog,
    updateDog
}

