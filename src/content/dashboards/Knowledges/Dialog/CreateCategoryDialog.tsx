import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Stack,
  Button,
  useTheme
} from '@mui/material';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';


type CreateCategoryDialogProps = {

};

const CreateCategoryDialog = (props) => {
    const { onClose, open } = props;
    const [cat1, setCat1] = useState<number>(0);
    const [cat2, setCat2] = useState<number>(0);
    const [cat3, setCat3] = useState<number>(0);
    const theme = useTheme();

    const handleSubClose = () => {
        onClose();
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
    
    const cat1s = [
        {
          value: '1',
          label: 'Mall'
        },
        {
          value: '2',
          label: 'Shopify'
        },
        {
          value: '3',
          label: 'Amazon'
        },
        {
          value: '4',
          label: 'Yahoo'
        },
        {
          value: '5',
          label: 'Rakuten'
        },
        {
          value: '6',
          label: 'EC-Cube'
        }
      ];

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            onClose={handleSubClose}
            open={open}
        >
            <DialogTitle sx={{color: theme.palette.primary.main, fontWeight: "bold"}}>カテゴリ作成</DialogTitle>
            <DialogContent dividers>
                <Stack direction="row">
                    <Box
                        width="100%"
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' }
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Box>
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
                        </Box>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleSubClose}>Cancel</Button>
                <Button variant="outlined" onClick={handleSubClose} autoFocus>OK</Button>
            </DialogActions>
        </Dialog>
    );

}

export default CreateCategoryDialog;