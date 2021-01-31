import React,{ useEffect,useState } from 'react'
import { SwipeableDrawer,Drawer, Button, Toolbar } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import '../../App.css';
import { IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import PaperSVG from '../../images/paper.svg';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { Scrollbars } from 'react-custom-scrollbars';
import 'react-pro-sidebar/dist/css/styles.css';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent,Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import TopicList from '../reusable/TopicList';
import firebase from '../../firebase/firebase';


function Papers(props) {
    const [state,setState] = useState({
        paperName: props.match.params.paperName,
        open: true,
        expanded:'',
        papers: [],
        course: JSON.parse(localStorage.getItem('Current Course')),
        loading: true
    });

    const handleClose = (b) => event => {
        setState({
            ...state,
            open: b
        })
    }

    useEffect(async ()=>{
        //  GET ALL THE PAPERS OF THE COURSE
        const db = firebase.firestore();
        const coursePapers = JSON.parse(localStorage.getItem('Current Course')).papers;

        let p = [];
        for(let i = 0 ; i < coursePapers.length ; i++) {
            let paper = (
                        await db.collection('Papers')
                                .doc(coursePapers[i])
                                .get()
                        ).data();
            p.push({
                ...paper,
                id: coursePapers[i]
            });
        }

        setState({
            ...state,
            papers: p
        });
    },[]);

    // GET THE LIST OF PAPERS IN SIDEBAR
    const getPaperList = state.papers.map((d,val) => (
        <SubMenu title={d.paperName} icon={<LocalLibraryIcon />} key={val}>
           <TopicList paper={d} course={state.course} />  
        </SubMenu>      
    ))


    const getSidebar = (
        <ProSidebar className="w-100" >
            <SidebarHeader>
                <div className="text-right text-white d-block d-xl-none pl-2 pl-md-0">
                <IconButton onClick={handleClose(false)}>
                        <CloseIcon className="text-white" />
                </IconButton>
                </div>
            </SidebarHeader>
        <SidebarContent>
            <Scrollbars>
                <Menu iconShape="square" className="pr-2 pr-md-0">
                    {
                        state.papers != [] ?  getPaperList : <div></div>
                    }   
                </Menu>
            </Scrollbars>
        </SidebarContent>
        <SidebarFooter>
          Footer
        </SidebarFooter>
      </ProSidebar>
    )

    return (
        <div className="container-fluid mt-5">
            {/* XL DRAWER */}
            <Drawer 
                className="d-none d-xl-block position-fixed drawer"
                variant="permanent"
                anchor="left"
                open={state.open}
                onClose={handleClose(false)}>
                <Scrollbars className={{
                    overflow: 'auto',
                    marginBottom: '200px'
                }}>
                {getSidebar}
                </Scrollbars>
            </Drawer>
            
            {/* END OF XL DRAWER */}
            {/* DRAWER */}
            <SwipeableDrawer 
                className="d-block d-xl-none position-fixed drawer"
                variant="temporary"
                anchor="left"
                open={state.open}
                onClose={handleClose(false)}
                onOpen={handleClose(true)}
            >
                {getSidebar}
            </SwipeableDrawer>

            {/* END OF DRAWER */}
            <div className="mt-3 text-left paper-content">
                <Button onClick={handleClose(true)} className="d-block d-xl-none">
                    Menu
                </Button>
                <h1>{state.paperName}</h1>
            </div>
        </div>
    )
}

export default Papers
