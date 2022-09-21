import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBreed, getDogs } from "../actions";
import NavBar from "./NavBar";
import './stylesheets/CreateBreed.css'

export default function CreateBreed(){

    const { temperaments } = useSelector( state => state)
    const dispatch = useDispatch();

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
        let lifeSpanRule = /[^0-9 -]/;

        if(!inputs.name){
            error.name = 'Name field is mandatory'
        }
        else if(nameRule.test(inputs.name)){
            error.name = " Breed name can only contain letters";
        }
        else if (inputs.name.length < 3){
            error.name = " Breed name should be at least 3 letters long"
        }
        if(inputs.life_span && lifeSpanRule.test(inputs.life_span)){
            error.life_span = " Enter life span in years (1 number or 2 numbers separeted by '-' )";
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
        e.preventDefault();
        let id = e.target.value;
        setInput({
            ...input,
            tempID: input.tempID.filter((temp)=> temp != id)
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
        <div className="create-breed">
            <NavBar/>
            <h2>Create your own breed!</h2>
            <form className="creation-form" onSubmit={ e => handleSubmit(e)}>
                <div className="text-input"><label>Breed name:<input type='text' value={input.name} name='name' onChange={(e) => handleChange(e) }/></label><p className="input_error">  {errors.name ? errors.name : '' }</p></div> 
                <div className="range-input"><label>Minimum height (in cm):<input type='range' step='1' min='15' max={input.height_max} value={input.height_min} name='height_min' onChange={(e) => handleChange(e) }/></label><h4>{input.height_min} cm</h4></div>
                <div className="range-input"><label>Maximum height (in cm):<input type='range' step='1' min={input.height_min} max='90' value={input.height_max} name='height_max' onChange={(e) => handleChange(e) }/></label><h4>{input.height_max} cm</h4></div>
                <div className="range-input"><label>Minimum weight (in Kg):<input type='range' step='1' min='1' max={input.weight_max} value={input.weight_min} name='weight_min' onChange={(e) => handleChange(e) }/></label><h4>{input.weight_min} Kg</h4></div>
                <div className="range-input"><label>Maximum weight (in Kg):<input type='range' step='1' min={input.weight_min} max='95' value={input.weight_max} name='weight_max' onChange={(e) => handleChange(e) }/></label><h4>{input.weight_max} Kg</h4></div>
                <div className="text-input"><label>Life Span (in years):<input  type='text' value={input.life_span} name='life_span' onChange={(e) => handleChange(e) }/></label><p className="input_error">  {errors.life_span ? errors.life_span : '' }</p></div>
                <label>Image (paste URL):<input type='text' value={input.image_url} name='image_url'  onChange={(e) => handleChange(e) }></input></label>
                <select onChange={ e => handleSelect(e)}>
                    {temperaments?.map( temp => 
                        <option key={temp.id} value={temp.id}>{temp.name}</option>
                    )}
                </select>
                <ul>
                    {input.tempID?.map(e =>
                        <li key={e}>{temperaments && temperaments.find(temp => temp.id == e).name}<button onClick={e => removeTemp(e)} value={e}>x</button></li>)}
                </ul>
                <button>Create</button>
            </form>
        </div>
        

    )
}


