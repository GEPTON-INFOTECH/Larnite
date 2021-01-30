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



function Papers(props) {

    const [state,setState] = useState({
        paperName: '',
        open: true,
        expanded:''
    });

    const handleClose = (b) => event => {
        setState({
            ...state,
            open: b
        })
    }

    const handleChange = (panel) => {
        setState({
            ...state,
            expanded: (panel === state.expanded) ? '': panel
        })
    }

    useEffect(()=>{
        setState({
            ...state,
            paperName: props.match.params.paperName
        })
    },[]);


    const listItems = (
        <>
        <Divider />
        {['Mathematics','Physics','Chemistry','Mathematics','Physics','Chemistry'].map((d,val) => (
            <Accordion key={val} expanded={state.expanded === `panel${val}`} onChange={() => handleChange(`panel${val}`)}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
            >
            <Typography ><LocalLibraryIcon />
                &nbsp;{d}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <List className="w-100">
            {['Inbox', 'Starred', 'Send email', 'Drafts','All mail', 'Trash', 'Spam','All mail', 'Trash', 'Spam','All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem  onClick={handleClose(false)}  button key={index}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            ))}
            
            </List>

            </AccordionDetails>
            </Accordion>

        )) }
       
        </>
    )

    const getSidebar = (
        <ProSidebar className="w-100 ">
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
                <MenuItem icon={<LocalLibraryIcon />}>Dashboard</ MenuItem >
                <SubMenu title="Components" icon={<LocalLibraryIcon />}>
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
                </SubMenu>
                
            </Menu>
            <Menu iconShape="square" className="pr-2 pr-md-0">
                <MenuItem icon={<LocalLibraryIcon />}>Dashboard</ MenuItem >
                <SubMenu title="Components" icon={<LocalLibraryIcon />}>
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
                </SubMenu>
                
            </Menu>
            <Menu iconShape="square" className="pr-2 pr-md-0">
                <MenuItem icon={<LocalLibraryIcon />}>Dashboard</ MenuItem >
                <SubMenu title="Components" icon={<LocalLibraryIcon />}>
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
                </SubMenu>
                
            </Menu>
            <Menu iconShape="square" className="pr-2 pr-md-0">
                <MenuItem icon={<LocalLibraryIcon />}>Dashboard</ MenuItem >
                <SubMenu title="Components" icon={<LocalLibraryIcon />}>
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
                </SubMenu>
                
            </Menu>
            <Menu iconShape="square" className="pr-2 pr-md-0">
                <MenuItem icon={<LocalLibraryIcon />}>Dashboard</ MenuItem >
                <SubMenu title="Components" icon={<LocalLibraryIcon />}>
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
                </SubMenu>
                
            </Menu>
            <Menu iconShape="square" className="pr-2 pr-md-0">
                <MenuItem icon={<LocalLibraryIcon />}>Dashboard</ MenuItem >
                <SubMenu title="Components" icon={<LocalLibraryIcon />}>
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
                </SubMenu>
                
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

            <Drawer 
                className="d-none d-xl-block position-fixed drawer"
                variant="permanent"
                anchor="left"
                open={state.open}
                onClose={handleClose(false)}
            >

                <Scrollbars className={{
                    overflow: 'auto',
                    marginBottom: '200px'
                }}>
                {getSidebar}
                </Scrollbars>
            </Drawer>

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
            <div className="mt-3 text-left paper-content">
                <Button onClick={handleClose(true)} className="d-block d-xl-none">Menu</Button>
                    <h1>{state.paperName}</h1>
            </div>
        </div>
    )
}

export default Papers
