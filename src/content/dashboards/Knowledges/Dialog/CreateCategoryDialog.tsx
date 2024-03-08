import { useState, useEffect } from 'react';
import {
    Box, Stack, Button, useTheme, graphqlApiCall, graphqlApiResult,
    FormControl, InputLabel, InputAdornment, OutlinedInput, TextField, MenuItem, IconButton, CloseIcon,
    Dialog, DialogTitle, DialogContent, DialogActions, CAT_LIST
} from '../index';

interface CreateCategoryDialogProps {
    open: boolean;
    onClose: () => void;
}

function CreateCategoryDialog ({ open, onClose }: CreateCategoryDialogProps) {

    type catDataType = {
        SK: number;
        cat_type: number;
        cat_name: string;
        parent_cat_id: number;
    };

    const [catType, setCatType] = useState<number>(0);
    const [existingCat, setExistingCat] = useState<number>(0);
    const [cat1, setCat1] = useState<number>(0);
    const [cat2, setCat2] = useState<number>(0);
    const [cat3, setCat3] = useState<number>(0);
    const [cat1List, setCat1List] = useState<Array<catDataType>>([]);
    const [cat2List, setCat2List] = useState<Array<catDataType>>([]);
    const [cat3List, setCat3List] = useState<Array<catDataType>>([]);
    const [cat1Disabled, setCat1Disabled] = useState<boolean>(false);
    const [cat2Disabled, setCat2Disabled] = useState<boolean>(false);
    const [cat3Disabled, setCat3Disabled] = useState<boolean>(false);
    const [catName, setCatName] = useState<string>();

    useEffect(() => {
        setCat1List(getCatListByCatType(1));
        setCat2List(getEmptyCatLit());
        setCat3List(getEmptyCatLit());
    },[]);

    useEffect(() => {
        console.log("FUNCTION CALLED: useEffect() => cat1");
        console.log(cat1);
        if(cat1 === 0){
            setCat1Disabled(false);
            setCat2List(getEmptyCatLit());
            setCat2Disabled(false);
            setCat3List(getEmptyCatLit());
            setCat3Disabled(false);
        }else{
            setCat1Disabled(true);
            setCat2List(getCatListByParentCatId(cat1));
            setCat3List(getEmptyCatLit());
        }
        setCat2(0);
        setCat3(0);
    }, [cat1]);

    useEffect(() => {
        console.log("FUNCTION CALLED: useEffect() => cat2");
        console.log(cat2);
        if(cat2 === 0){
            setCat2Disabled(false);
            setCat3List(getEmptyCatLit());
        }else{
            setCat2Disabled(true);
            setCat3List(getCatListByParentCatId(cat2));
        }
        setCat3(0);
    }, [cat2]);

    useEffect(() => {
        console.log("FUNCTION CALLED: useEffect() => cat3");
        console.log(cat3);
        if(cat3 === 0){
            setCat3Disabled(false);
        }else{
            setCat3Disabled(true);
        }
    }, [cat3]);

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

    const getEmptyCatLit = () => {
        return CAT_LIST.filter((catList) => catList.SK === 0);
    }

    const getCatListByCatType = (catType: number) => {
        return CAT_LIST.filter((catList) => {
            return catList.cat_type === 0 || catList.cat_type === catType;
        });
    };

    const getCatListByParentCatId = (SK: number) => {
        return CAT_LIST.filter((catList) => {
            return catList.cat_type === 0 || catList.parent_cat_id === SK;
        });
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
                                        value={cat1}
                                        onChange={handleCat1Change}
                                    >
                                        {cat1List.map((option) => (
                                        <MenuItem key={option.SK} value={option.SK}>
                                            {option.cat_name}
                                        </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                <Box>
                                    <FormControl sx={{ width:'30ch' }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">登録カテゴリー名</InputLabel>
                                        <OutlinedInput
                                            id="createCatCatName"
                                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            label="カテゴリー名"
                                            color="primary"
                                            disabled={cat1Disabled}
                                            sx={{
                                                '&.Mui-disabled': {opacity: 0.5, backgroundColor: 'gray'}
                                            }}
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
                                        value={cat2}
                                        onChange={handleCat2Change}
                                    >
                                        {cat2List.map((option) => (
                                        <MenuItem key={option.SK} value={option.SK}>
                                            {option.cat_name}
                                        </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                <Box>
                                    <FormControl sx={{ width:'30ch' }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">登録カテゴリー名</InputLabel>
                                        <OutlinedInput
                                            id="createCatCatName"
                                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            label="カテゴリー名"
                                            color="primary"
                                            disabled={cat2Disabled}
                                            sx={{
                                                '&.Mui-disabled': {opacity: 0.5, backgroundColor: 'gray'}
                                            }}
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
                                        value={cat3}
                                        onChange={handleCat3Change}
                                    >
                                        {cat3List.map((option) => (
                                        <MenuItem key={option.SK} value={option.SK}>
                                            {option.cat_name}
                                        </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                <Box>
                                    <FormControl sx={{ width:'30ch' }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">登録カテゴリー名</InputLabel>
                                        <OutlinedInput
                                            id="createCatCatName"
                                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            label="カテゴリー名"
                                            color="primary"
                                            disabled={cat3Disabled}
                                            sx={{
                                                '&.Mui-disabled': {opacity: 0.5, backgroundColor: 'gray'}
                                            }}
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