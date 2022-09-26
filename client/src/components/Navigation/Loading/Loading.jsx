import React from "react";
const loadingImgSrc = 'https://64.media.tumblr.com/bb8d3e2d5a598c1599b78524cb54528d/tumblr_mpn67bnfCB1rgpyeqo1_250.gif';

const estiloDiv = { 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    scale: 2
}

const estiloLabel = {     
    fontWeight: 'bold',
    textTransform: 'uppercase',
    margin: '5px',
    color: 'white'
}

export default function Loading (){
    return(
        <div style={estiloDiv}>
            <img src={loadingImgSrc} alt='loading'/><label style={estiloLabel}>Loading</label>
        </div>
    )
}
