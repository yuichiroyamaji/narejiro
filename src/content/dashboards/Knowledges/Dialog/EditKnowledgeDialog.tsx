import PropTypes from 'prop-types';
import {
  Divider,
  Box,
  Card,
  CardHeader,
  Container,
  Grid,
  CardContent
} from '@mui/material';

import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

function EditDialog(props) {
    const { onClose, knowledgeId, open } = props;

    const handleClose = () => {
        onClose(knowledgeId);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog
            // sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="lg"
            onClose={handleClose} 
            open={open}
        >
        <DialogTitle>なれっじ編集</DialogTitle>
        <DialogContent dividers>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField
                    required
                    id="standard-required"
                    label="なれっじID"
                    variant="standard"
                    value={knowledgeId}
                    InputProps={{
                        readOnly: true
                    }}
                    disabled
                />
            </div>
            <div>
                <TextField
                disabled
                id="standard-disabled"
                label="Disabled"
                defaultValue="Hello World"
                variant="standard"
                />
                <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                />
                <TextField
                id="standard-read-only-input"
                label="Read Only"
                defaultValue="Hello World"
                InputProps={{
                    readOnly: true
                }}
                variant="standard"
                />
                <TextField
                id="standard-number"
                label="Number"
                type="number"
                InputLabelProps={{
                    shrink: true
                }}
                variant="standard"
                />
                <TextField
                id="standard-search"
                label="Search field"
                type="search"
                variant="standard"
                />
                <TextField
                id="standard-helperText"
                label="Helper text"
                defaultValue="Default Value"
                helperText="Some important text"
                variant="standard"
                />
            </div>
            </Box>
        </DialogContent>
        </Dialog>
    );
}

EditDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    knowledgeId: PropTypes.string.isRequired
};

export default EditDialog;