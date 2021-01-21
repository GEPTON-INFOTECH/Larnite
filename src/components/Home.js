import React,{ useEffect,useState } from 'react'
import firebase from '../firebase/firebase';

function Home() {
    const [state,setState] = useState({
        user: {},
        isLoggedIn: false
    });
    useEffect(async ()=>{
       let currentUser = firebase.auth().currentUser;
       console.log(currentUser);
       if(currentUser){
            let phoneNumber = currentUser.phoneNumber;
            console.log(phoneNumber);

            const db = firebase.firestore();
    
            const user = await db.collection('students').doc(phoneNumber).get();
            setState({
                ...state,
                user: user.data(),
                isLoggedIn: currentUser != null
            });

            localStorage.setItem('User',JSON.stringify(user.data()));
       } else {
           let User = JSON.parse(localStorage.getItem('User'));

           console.log(User);
           setState({
                user: User,
                isLoggedIn: User != null || false
            })
       }
       
    },[])

    return (
        <div>
            Home Works !!!
            { state.user != {} ? 
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
