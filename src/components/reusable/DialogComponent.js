import React,{ useEffect,useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvatar,updateAvatar } from '../../redux/avatar/Actions';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
}); 

function DialogComponent({open,handleClose,cover,phone,alreadySelected}) {
    const dispatch = useDispatch();
    const state = useSelector(state => state.aReducer);
    const [selected,setSelected] = useState({avatar: { URL: alreadySelected.avatar},cover:{ URL: alreadySelected.cover}});

    useEffect(async () => {
      dispatch(fetchAvatar());
    }, []);

    const updateAvatarImage = () => {
      dispatch(updateAvatar(phone,selected.avatar.URL,selected.cover.URL));
      handleClose();
    }


    const getAllAvatars = state.avatars.map((d,val) => (
      <div key={val} className="col-lg-4 col-md-6 col-sm-6 col-12 mt-5 p-2" style={{cursor: "pointer"}}>
          <input 
            name="avatar" 
            type="radio" 
            id={'myCheckbox' + val}
            checked={selected.cover.URL == d.cover.URL}
            onClick={(event) => {setSelected(d);}} 
            className="avatar-checkbox" />
          <label 
            className="checkLabel"
            htmlFor={'myCheckbox' + val}>
            <AvatarComponent 
                bg={d.cover.URL} 
                image={d.avatar.URL} />
          </label>
      </div>
    ));

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className="theme-background">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <div style={{flex: 1}}>
              Choose An Avatar
            </div>
            <Button 
              color="light" 
              variant="contained" 
              className="text-right text-dark" 
              autoFocus color="inherit" 
              onClick={updateAvatarImage}>
              Update
            </Button>
          </Toolbar>
        </AppBar>
        <div className="container-fluid mt-3 mb-5">
          <form>
          <div className="row">
              {getAllAvatars}
          </div>
          </form>
        </div>
      </Dialog>
    )
}

export default DialogComponent
