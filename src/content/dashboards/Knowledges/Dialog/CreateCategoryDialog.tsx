import { useState, useEffect } from 'react';
import {
    Box, Stack, Button, useTheme, graphqlApiCall, graphqlApiResult, listCat1s,
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

    const callApiListKnowledgeDatas = async() => {
      const res: any = await graphqlApiCall(listCat1s);
      const result: boolean = graphqlApiResult(res.listKnowledgeDatas.items);    
      if(result){ };
    };
    
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
          value: '0',
          label: '新規作成'
        },
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
            maxWidth="lg"
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
                    <Stack direction="row" sx={{pt:2, pr:1, pb:2, pl:1}}>
                        <Stack sx={{mr:3, p:1, border: 1, borderColor:'#ccc', borderRadius:1}}>
                            <Box sx={{ width:'12ch', color:'gray', position:'relative', top:-20, backgroundColor:'#fff' }}>
                                カテゴリ（大）
                            </Box>
                            <Box
                                width="100%"
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { mb:2, width:'30ch' }
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <Box>
                                    <TextField
                                        id="createCatCatType"
                                        select
                                        label="新規作成 / 既存カテゴリ選択"
                                        value={catType}
                                        onChange={handleCatTypeChange}
                                    >
                                        {catSample.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                <Box>
                                    <FormControl sx={{ width:'30ch' }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">登録カテゴリー名</InputLabel>
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
                        <Stack sx={{mr:3, p:1, border: 1, borderColor:'#ccc', borderRadius:1}}>
                            <Box sx={{ width:'12ch', color:'gray', position:'relative', top:-20, backgroundColor:'#fff' }}>
                                カテゴリ（中）
                            </Box>
                            <Box
                                width="100%"
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { mb:2, width:'30ch' }
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <Box>
                                    <TextField
                                        id="createCatCatType"
                                        select
                                        label="新規作成 / 既存カテゴリ選択"
                                        value={catType}
                                        onChange={handleCatTypeChange}
                                    >
                                        {catTypeSample.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                <Box>
                                    <FormControl sx={{ width:'30ch' }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">登録カテゴリー名</InputLabel>
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
                        
                        <Stack sx={{p:1, border: 1, borderColor:'#ccc', borderRadius:1}}>
                            <Box sx={{ width:'12ch', color:'gray', position:'relative', top:-20, backgroundColor:'#fff' }}>
                                カテゴリ（小）
                            </Box>
                            <Box
                                width="100%"
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { mb:2, width:'30ch' }
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <Box>
                                    <TextField
                                        id="createCatCatType"
                                        select
                                        label="新規作成 / 既存カテゴリ選択"
                                        value={catType}
                                        onChange={handleCatTypeChange}
                                    >
                                        {catTypeSample.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                <Box>
                                    <FormControl sx={{ width:'30ch' }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">登録カテゴリー名</InputLabel>
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
                    </Stack>
                </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleSubClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubClose} autoFocus>Create</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateCategoryDialog;