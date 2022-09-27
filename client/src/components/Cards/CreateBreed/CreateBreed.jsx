import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBreed, getDogs, getTemperaments } from "../../../actions";
import NavBar from "../../Navigation/NavBar/NavBar";
import  s from './CreateBreed.module.css'
import image from '../../../Images/pexels-anna-shvets-4588047.jpg'
import home from '../../../Images/home-3.png'
import { NavLink } from "react-router-dom";


export default function CreateBreed(){

    const { temperaments, dogs_backup } = useSelector( state => state)
    const dispatch = useDispatch();
    useEffect( () => { if(!temperaments.length) dispatch(getTemperaments())},[temperaments] );

    const [input, setInput] = useState({
        name:'',
        height_min: 20,
        height_max: 30,
        weight_min: 5,
        weight_max: 25,
        life_span: '',
        image_url: '',
        tempID: []
    })

    const [errors, setErrors] = useState({});

    function validate(inputs){
        let error = {};
        let nameRule = /[^a-zA-Z ]/;
        let lifeSpanRule = /[^0-9]/;

        if(!inputs.name){
            error.name = ' - Name field is mandatory'
        }
        else if(nameRule.test(inputs.name)){
            error.name = " - Breed name can only contain letters";
        }
        else if (inputs.name.length < 3){
            error.name = " - Breed name should be at least 3 letters long"
        }
        else if(dogs_backup.some( breed => breed.name.toLowerCase() === inputs.name.toLowerCase())){
            error.name = "Breed already exists. Please enter a different name"
        }

        if(inputs.life_span && lifeSpanRule.test(inputs.life_span)){
            error.life_span = " - Life span should be expressed in numbers (years)";
        } 
        if(inputs.life_span && (inputs.life_span < 2 || inputs.life_span > 25)){
            error.life_span = " - Life span can only be set from 2 to 25 years";
        }
        return error;
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e){
        let id = e.target.value;
        let temp = temperaments.find(e => e.id == id)
        if(!input.tempID.some(elem => elem == id))
        {
            setInput({
            ...input,
            tempID: [...input.tempID, id]
            })
        }
    }

    function removeTemp(e){
        let id = e.target.value;
        setInput({
            ...input,
            tempID: input.tempID.filter((temp)=> temp !== id)
        })

    }

    function handleSubmit(e) {
        
        e.preventDefault();
        setErrors(validate(input));
        
        if(Object.keys(errors).length > 0 || !input.name){
            alert("You need to fill all mandatory fields correclty before submitting");
        }
        else{
            dispatch(createBreed(input));
            alert(`The ${input.name} breed was successfully created!`)
            dispatch(getDogs());
            setInput({
                name:'',
                height_min: 20,
                height_max: 30,
                weight_min: 5,
                weight_max: 25,
                life_span: '',
                image_url: '',
                tempID: []
            })
        }
        
    }
    


    return(
        <div className={s.createBreed}>
            <div className={s.pageTop}>
                <NavBar></NavBar>
            </div>
            <div className={s.mainPage}>
                <div className={s.creationCard}>
                    <NavLink to='/home' className={s.home}>
                        <img src={home} alt='home'/>
                    </NavLink>
                    <h2 className={s.title}>Create your own breed!</h2>
                    <form className={s.creationForm} onSubmit={ e => handleSubmit(e)}>
                        <div className={s.textInput}><label className={s.label}>Breed name:</label><input className={s.textInputPlaceholder} type='text' value={input.name} name='name' onChange={(e) => handleChange(e) }/></div> 
                        <div className={s.rangeInput}><label className={s.rangeLabel}>Minimum height (in cm):<input type='range' step='1' min='15' max={input.height_max} value={input.height_min} name='height_min' onChange={(e) => handleChange(e) }/></label><h4>{input.height_min} cm</h4></div>
                        <div className={s.rangeInput}><label className={s.rangeLabel}>Maximum height (in cm):<input type='range' step='1' min={input.height_min} max='90' value={input.height_max} name='height_max' onChange={(e) => handleChange(e) }/></label><h4>{input.height_max} cm</h4></div>
                        <div className={s.rangeInput}><label className={s.rangeLabel}>Minimum weight (in Kg):<input type='range' step='1' min='1' max={input.weight_max} value={input.weight_min} name='weight_min' onChange={(e) => handleChange(e) }/></label><h4>{input.weight_min} Kg</h4></div>
                        <div className={s.rangeInput}><label className={s.rangeLabel}>Maximum weight (in Kg):<input type='range' step='1' min={input.weight_min} max='95' value={input.weight_max} name='weight_max' onChange={(e) => handleChange(e) }/></label><h4>{input.weight_max} Kg</h4></div>
                        <div className={s.textInput}><label className={s.label}>Life Span (in years):</label><input  className={s.textInputPlaceholder} type='number' min='2' max='25' value={input.life_span} name='life_span' onChange={(e) => handleChange(e) }/></div>
                        <div className={s.textInput}><label className={s.label}>Image (paste URL):</label><input className={s.textInputPlaceholder} type='text' value={input.image_url} name='image_url'  onChange={(e) => handleChange(e) }/></div>
                        <div className={s.textInput}>
                            <label className={s.label}>Add Temperaments:</label>
                            <select className={s.dropdown} onChange={ e => handleSelect(e)} defaultValue='title'>
                                <option disabled value='title'>Select Temperament</option>
                                {temperaments?.map( temp => 
                                    <option key={temp.id} value={temp.id}>{temp.name}</option>
                                )}
                            </select>
                        </div>
                        <ul className={s.tempListContainer}>
                            {input.tempID?.map(e =>
                                <li className={s.tempList} key={e}>{temperaments && temperaments.find(temp => temp.id == e).name}<button className={s.close} onClick={e => removeTemp(e)} value={e}>x</button></li>)}
                        </ul>
                        <button className={s.createButton}>Create</button>
                        <ul className={s.inputError}>
                            <li>{errors.name ? errors.name : '' }</li>
                            <li>{errors.life_span ? errors.life_span : '' }</li>
                        </ul>
                    </form>
                    <img className={s.image} src={image} alt='dog'/>
                </div>
            </div>
        </div>
        

    )
}


