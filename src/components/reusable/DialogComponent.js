import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import '../../App.css';
import AvatarComponent from './AvatarComponent';

import AvatarImage1 from '../../images/avatars/avatar/Avatar1.jpg';
import AvatarBG1 from '../../images/avatars/cover/Avatar1bg.jpg';
import AvatarImage2 from '../../images/avatars/avatar/Avatar2.jpg';
import AvatarBG2 from '../../images/avatars/cover/Avatar2bg.jpg';
import AvatarImage3 from '../../images/avatars/avatar/Avatar3.jpg';
import AvatarBG3 from '../../images/avatars/cover/Avatar3bg.jpg';
import AvatarImage4 from '../../images/avatars/avatar/Avatar4.jpg';
import AvatarBG4 from '../../images/avatars/cover/Avatar4bg.jpg';
import AvatarImage5 from '../../images/avatars/avatar/Avatar5.jpg';
import AvatarBG5 from '../../images/avatars/cover/Avatar5bg.jpg';
import AvatarImage6 from '../../images/avatars/avatar/Avatar6.jpg';
import AvatarBG6 from '../../images/avatars/cover/Avatar6bg.jpg';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
}); 

function DialogComponent({open,handleClose,}) {
    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className="theme-background">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="div" style={{flex: 1}}>
              Choose An Avatar
            </Typography>
            <Button color="light" variant="contained" className="text-right text-dark" autoFocus color="inherit" onClick={handleClose}>
              Update
            </Button>
          </Toolbar>
        </AppBar>
        <div className="container-fluid mt-3 mb-5">
          <form>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-5 p-2" style={{cursor: "pointer"}}>
                <input name="avatar" type="radio" id="myCheckbox1" value={true} className="avatar-checkbox" />
                <label for="myCheckbox1">
                  <AvatarComponent bg={AvatarBG1} image={AvatarImage1} />
                </label>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-5 p-2">
            <input name="avatar"  type="radio" id="myCheckbox2" value={true} className="avatar-checkbox" />
                <label for="myCheckbox2">
                <AvatarComponent bg={AvatarBG2} image={AvatarImage2} />
                </label>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-5 p-2">
            <input name="avatar"  type="radio" id="myCheckbox3" value={true} className="avatar-checkbox" />
                <label for="myCheckbox3">
                <AvatarComponent bg={AvatarBG3} image={AvatarImage3} />                </label>

            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-5 p-2">
            <input name="avatar"  type="radio" id="myCheckbox4" value={true} className="avatar-checkbox" />
                <label for="myCheckbox4">
                <AvatarComponent bg={AvatarBG4} image={AvatarImage4} />                </label>

            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-5 p-2 ">
            <input name="avatar"  type="radio" id="myCheckbox5" value={true} className="avatar-checkbox" />
                <label for="myCheckbox5">
                <AvatarComponent bg={AvatarBG5} image={AvatarImage5} />                </label>

            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-5 p-2">
                <input name="avatar"  type="radio" id="myCheckbox6" value={true} className="avatar-checkbox" />
                    <label for="myCheckbox6">
                <AvatarComponent bg={AvatarBG6} image={AvatarImage6} />                </label>

            </div>
            
          </div>
          </form>
        </div>
      </Dialog>
    )
}

export default DialogComponent
