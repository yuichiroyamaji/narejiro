import { useState } from 'react';
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
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

function EditDialog(props) {
    const { onClose, knowledgeId, open } = props;
    const [cat1, setCat1] = useState();
    const [cat2, setCat2] = useState();
    const [cat3, setCat3] = useState();

    const cat1s = [
      {
        value: 'USD',
        label: '$'
      },
      {
        value: 'EUR',
        label: '€'
      },
      {
        value: 'BTC',
        label: '฿'
      },
      {
        value: 'JPY',
        label: '¥'
      }
    ];

    const handleClose = () => {
        onClose(knowledgeId);
    };

    const handleCat1Change = (event) => {
        setCat1(event.target.value);
    };

    const handleCat2Change = (event) => {
        setCat2(event.target.value);
    };

    const handleCat3Change = (event) => {
        setCat3(event.target.value);
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
                    variant="filled"
                    value={knowledgeId}
                    InputProps={{
                        readOnly: true
                    }}
                    // sx={{bgcolor: 'gray'}}
                    disabled
                />
            </div>
            <div>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="カテゴリー(大)"
                    value={cat1}
                    onChange={handleCat1Change}
                    // helperText="Please select your currency"
                >
                    {cat1s.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="カテゴリー(中)"
                    value={cat2}
                    onChange={handleCat2Change}
                    // helperText="Please select your currency"
                >
                    {cat1s.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="カテゴリー(小)"
                    value={cat3}
                    onChange={handleCat3Change}
                    // helperText="Please select your currency"
                >
                    {cat1s.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                </TextField>
            </div>
            <div>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">タイトル</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">Shopify APIのアクセス制限について</InputAdornment>}
                        label="タイトル"
                    />
                </FormControl>
            </div>
            <div>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">内容</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">Shopify APIのアクセス制限について</InputAdornment>}
                        label="内容"
                        multiline
                        rows={4}
                    />
                </FormControl>
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