import React,{ useEffect,useState } from 'react'
import { SwipeableDrawer,Drawer, Button, Toolbar } from '@material-ui/core';
import '../../App.css';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { Scrollbars } from 'react-custom-scrollbars';
import 'react-pro-sidebar/dist/css/styles.css';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent,Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import TopicList from '../reusable/TopicList';
import firebase from '../../firebase/firebase';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

function Papers(props) {
    const [state,setState] = useState({
        paperName: props.match.params.paperName.replace(/-/g,' '),
        home: null,
        open: true,
        expanded:'',
        papers: [],
        course: JSON.parse(localStorage.getItem('Current Course')),
        loading: true
    });

    const history = useHistory();

    const handleClose = (b) => event => {
        setState({
            ...state,
            open: b
        })
    }

    useEffect(async ()=>{
        if(document.body.clientWidth < 1199){
            setState({
                ...state,
                open: false
            });
        }


        //  GET ALL THE PAPERS OF THE COURSE
        const db = firebase.firestore();
        const coursePapers = JSON.parse(localStorage.getItem('Current Course')).papers;

        let p = [];
        let id = null;
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

            if(paper.paperName === props.match.params.paperName) {
                console.log(paper);
                id = paper.home;
            }
        }

        setState({
            ...state,
            papers: p,
            home: id
        });
    },[]);

    const clickHome = (d) => {
        history.push({
            pathname: `/papers/${d.paperName.replace(/ /g,'-')}`,
            state: {
                id: d.home
            }
        });
    }

    // GET THE LIST OF PAPERS IN SIDEBAR
    const getPaperList = state.papers.map((d,val) =>(
            <SubMenu title={d.paperName} icon={<LocalLibraryIcon />} key={val}>
                {d.home && <MenuItem onClick={() => clickHome(d)}>Home</MenuItem>}
                <TopicList clickHome={clickHome} paper={d} course={state.course} />  
            </SubMenu>      
        ));


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
        <div className="container-fluid mt-2 mt-xl-5">
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
            <div className="text-left paper-content">
                  <Button 
                      onClick={handleClose(true)} 
                      className="d-block d-xl-none">
                      <MenuIcon /> Menu
                  </Button>
              </div>
        </div>
    )
}

export default Papers
