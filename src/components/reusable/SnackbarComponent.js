import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';

function SnackbarComponent({open,handleClose,message}) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            onClose={handleClose}
            message={message}
            key="bottom-right"
      />
    )
}

export default SnackbarComponent
