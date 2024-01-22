import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {
  useTheme
} from '@mui/material';

import Dialog from '@mui/material/Dialog';

function DeleteKnowledgeDialog(props) {
    const { onClose, knowledgeId, open } = props;
    const theme = useTheme();

    const handleClose = () => {
        onClose(knowledgeId);
    };

    return (
        <Dialog 
            onClose={handleClose} 
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title" sx={{color: theme.palette.primary.main, fontWeight: "bold"}}>
            なれっじ削除
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            【なれっじID : {knowledgeId} 】を削除します。よろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
        </Dialog>
    );
}

DeleteKnowledgeDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    knowledgeId: PropTypes.number.isRequired
};

export default DeleteKnowledgeDialog;
