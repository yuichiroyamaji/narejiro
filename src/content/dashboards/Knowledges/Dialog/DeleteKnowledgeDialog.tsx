import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Dialog from '@mui/material/Dialog';
import {
  Divider,
  Box,
  Card,
  CardHeader,
  Container,
  Grid,
  CardContent
} from '@mui/material';

function DeleteDialog(props) {
    const { onClose, knowledgeId, open } = props;

    const handleClose = () => {
        onClose(knowledgeId);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog 
            onClose={handleClose} 
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
            なれっじID : {knowledgeId}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            なれっじを削除します。よろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
        </Dialog>
    );
}

DeleteDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    knowledgeId: PropTypes.string.isRequired
};

export default DeleteDialog;
