import { useState, useEffect } from 'react';
import {
    Box, Stack, Button, useTheme,
    FormControl, InputLabel, InputAdornment, OutlinedInput, TextField, MenuItem, IconButton, CloseIcon,
    Dialog, DialogTitle, DialogContent, DialogActions,
} from '../index';

interface CreateCategoryDialogProps {
    open: boolean;
    onClose: () => void;
}

function CreateCategoryDialog ({ open, onClose }: CreateCategoryDialogProps) {

    const [catType, setCatType] = useState<number>(0);
    const [existingCat, setExistingCat] = useState<number>(0);
    const [cat1, setCat1] = useState<number>(0);
    const [cat2, setCat2] = useState<number>(0);
    const [cat3, setCat3] = useState<number>(0);
    const [catName, setCatName] = useState<string>();
    
    const catTypeSample = [
        {
          value: '1',
          label: 'カテゴリー(大)'
        },
        {
          value: '2',
          label: 'カテゴリー(中)'
        },
        {
          value: '3',
          label: 'カテゴリー(小)'
        }
      ];
    
    const catSample = [
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

    const theme = useTheme();

    const handleSubClose = () => {
        onClose();
    };

    const handleCatTypeChange = (event) => {
        setCatType(event.target.value);
    };

    const handleExistingCatChange = (event) => {
        setExistingCat(event.target.value);
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
            fullWidth
            maxWidth="sm"
            onClose={handleSubClose}
            open={open}
        >
            <DialogTitle sx={{color: theme.palette.primary.main, fontWeight: "bold"}}>カテゴリー作成</DialogTitle>
            <IconButton
            aria-label="close"
            onClick={handleSubClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseIcon />
            </IconButton>
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
                                id="createCatCatType"
                                select
                                label="カテゴリータイプ"
                                value={catType}
                                onChange={handleCatTypeChange}
                            >
                                {catTypeSample.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="createCatExistingCat"
                                variant="filled"
                                select
                                label="既存カテゴリー確認"
                                value={existingCat}
                                // onChange={handleExistingCatChange}
                                sx={{bgColor: "#ccc" }}
                            >
                                {catSample.map((option) => (
                                <MenuItem key={option.value} value={option.value} disabled>
                                    {option.label}
                                </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Box>
                            <TextField
                                id="createCatParentCat"
                                select
                                label="親カテゴリー"
                                value={cat1}
                                onChange={handleCat1Change}
                            >
                                {catSample.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                                ))}
                            </TextField>
                            <FormControl sx={{ m: 1 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">カテゴリー名</InputLabel>
                                <OutlinedInput
                                    id="createCatCatName"
                                    startAdornment={<InputAdornment position="start">出荷実績連携</InputAdornment>}
                                    label="カテゴリー名"
                                    color="primary"
                                />
                            </FormControl>
                        </Box>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleSubClose}>Cancel</Button>
                <Button variant="outlined" onClick={handleSubClose} autoFocus>Create</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateCategoryDialog;