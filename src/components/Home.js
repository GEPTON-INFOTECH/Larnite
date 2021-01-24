import React,{ useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import firebase from '../firebase/firebase';

function Home() {
    const state = useSelector(state => state.uReducer);

    useEffect(async ()=>{
     
       
    },[])

    return (
        <div>
            Home Works !!!
            { (state.user != {} && state.user != null) ? 
                <div className="container">
                    <p>Logged In</p>
                    <p>Name : {state.user?.firstName + state.user?.lastName}</p>
                    <p>Email: {state.user?.email}</p>
                    <p>Phone: {state.user?.phone}</p>
                </div>
                : ''}
            
        </div>
    )
}

export default Home
