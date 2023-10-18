/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';

import {useNavigate} from "react-router-dom"


const Home = () => {
    const navigate = useNavigate(); 
  return (
            <>
            <div>
                <button onClick={()=>navigate("/Login") }> </button>
            </div>
            </>
  )
}

export default Home

