import React, { useEffect,useState } from 'react';
import firebase from '../../firebase/firebase';
import { Card,CardContent } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { Link } from 'react-router-dom';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import '../../App.css';

const Notifications = () => {
    const [notifications,setNotifications] = useState([]);
    useEffect(async () => {
        await getNotifications();
    },[]);

    const getNotifications = async () => {
        const collection = firebase.firestore().collection('notifications');
        const allNotifications = (await collection.get()).docs.map( (d, i) => {
            return {
                ...d.data(),
                id: d.id
            }
        });
        setNotifications(allNotifications);
        console.log(allNotifications);
    }

    return (
        <div>
            <div className="jumbotron bg-dark text-white">
                <h2 className="text-uppercase text-monospace">Notifications</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum hic ipsum asperiores minima laudantium perspiciatis adipisci atque accusamus dolorum, quaerat qui reiciendis nam aperiam. Fugit laboriosam suscipit ut rerum laudantium?</p>
            </div>
            <div className="notification-cards container-fluid text-left" style={{marginTop: '-80px'}}>
                <div className="row">
                    { 
                        notifications.map((n,idx) => (
                            <div className="col-xl-3 col-lg-4 col-md-6 col-12 mt-1 px-1">
                                <Card>
                                    <CardContent>
                                        <NotificationsActiveIcon fontSize="large" className="position-absolute card-icon" />
                                        <h5><a  href={n.link} target="_blank"><LinkIcon /></a> {n.title}</h5>
                                        <p>
                                            <small>
                                                Date: <b>{(new Date(n.createdAt.toDate())).toDateString()}</b>
                                            </small>
                                            <br />
                                            {n.body}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))
                    }
                </div>
               
            </div>
        </div>
    )

}

export default Notifications;