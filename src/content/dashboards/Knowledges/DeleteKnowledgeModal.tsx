import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

function DeleteDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
        <DialogTitle>このなれっじを削除してしまってもよろしいですか？</DialogTitle>
            <Button variant="outlined" sx={{ margin: 1 }}>
            OK
            </Button>
            <Button variant="outlined" sx={{ margin: 1 }}>
            Cancel
            </Button>
        </Dialog>
    );
}

DeleteDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired
};

export default DeleteDialog;
