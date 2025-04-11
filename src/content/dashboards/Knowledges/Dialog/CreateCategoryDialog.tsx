import { useState, useEffect, useRef, ChangeEvent } from 'react';
import {
    Box, Stack, Button, useTheme, graphqlApiCall, graphqlApiResult, SuccessDialog,
    FormControl, InputLabel, InputAdornment, OutlinedInput, TextField, MenuItem, IconButton, CloseIcon, useUserContext,
    Dialog, DialogTitle, DialogContent, DialogActions, CategoryDataType, createCategoryData, CreateCategoryDataInputType,
    NEW_REGIST_CAT_ID, UNSELECTED_CAT_ID
} from '../index';

type NewCatFromCreateCatDialogType = {
    newCat1: number;
    newCat2: number;
    newCat3: number;
};

type HandleCatUpdateType = (newCatFromCreateCatDialog: NewCatFromCreateCatDialogType) => void;

interface CreateCategoryDialogProps {
    open: boolean;
    onClose: () => void;
    catList: CategoryDataType[];
    handleCatUpdate: HandleCatUpdateType;
}

function CreateCategoryDialog({ open, onClose, catList, handleCatUpdate }: CreateCategoryDialogProps) {
    const { appUserId } = useUserContext();
    const [cat1, setCat1] = useState<number>(NEW_REGIST_CAT_ID);
    const [cat2, setCat2] = useState<number>(NEW_REGIST_CAT_ID);
    const [cat3, setCat3] = useState<number>(NEW_REGIST_CAT_ID);
    const [cat1Name, setCat1Name] = useState<string>('');
    const [cat2Name, setCat2Name] = useState<string>('');
    const [cat3Name, setCat3Name] = useState<string>('');
    const [cat1List, setCat1List] = useState<CategoryDataType[]>([]);
    const [cat2List, setCat2List] = useState<CategoryDataType[]>([]);
    const [cat3List, setCat3List] = useState<CategoryDataType[]>([]);
    const [cat1Disabled, setCat1Disabled] = useState<boolean>(false);
    const [cat2Disabled, setCat2Disabled] = useState<boolean>(false);
    const [cat3Disabled, setCat3Disabled] = useState<boolean>(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
    const [successDialogMsg, setSuccessDialogMsg] = useState<string>('');
    const theme = useTheme();

    useEffect(() => {
        if (open) {
            initializeDialog();
        }
    }, [open]);

    useEffect(() => {
        updateCategoryLists(cat1, setCat2List, setCat3List, setCat1Disabled);
    }, [cat1]);

    useEffect(() => {
        updateCategoryLists(cat2, setCat3List, undefined, setCat2Disabled);
    }, [cat2]);

    useEffect(() => {
        setCat3Disabled(cat3 !== NEW_REGIST_CAT_ID);
    }, [cat3]);

    const initializeDialog = () => {
        setCat1List(getCatListByCatType(1));
        setCat2List(getEmptyCatList());
        setCat3List(getEmptyCatList());
        clearCategory();
    };

    const updateCategoryLists = (categoryId: number, setList1: Function, setList2?: Function, setDisabled?: Function) => {
        if (categoryId === NEW_REGIST_CAT_ID) {
            setList1(getEmptyCatList());
            if (setList2) setList2(getEmptyCatList());
            if (setDisabled) setDisabled(false);
        } else {
            setList1(getCatListByParentCatId(categoryId));
            if (setList2) setList2(getEmptyCatList());
            if (setDisabled) setDisabled(true);
        }
    };

    const getEmptyCatList = () => catList.filter(cat => cat.SK === UNSELECTED_CAT_ID);

    const getCatListByCatType = (catType: number) => catList.filter(cat => cat.catType === catType || cat.SK === UNSELECTED_CAT_ID);

    const getCatListByParentCatId = (SK: number) => catList.filter(cat => cat.parentCatId === SK || cat.SK === UNSELECTED_CAT_ID);

    const callApiCreateCategory = async (createCategoryDataInput: CreateCategoryDataInputType) => {
        const res: any = await graphqlApiCall(createCategoryData(createCategoryDataInput));
        const result: boolean = await graphqlApiResult(res.createNarejiroDevTable);
        return result ? res.createNarejiroDevTable.SK : null;
    };

    const handleCatChange = (setter: Function, resetters: Function[]) => (event: ChangeEvent<HTMLInputElement>) => {
        resetters.forEach(reset => reset(NEW_REGIST_CAT_ID));
        setter(event.target.value);
    };

    const handleNameChange = (setter: Function) => (event: ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
    };

    const handleSubClose = () => {
        clearCategory();
        onClose();
    };

    const handleSubCreate = async () => {
        if (validateInputs()) {
            let newCatId: number = NEW_REGIST_CAT_ID;
            let msg: string = "以下のカテゴリが作成されました。<br/>";
            const commonProps = {
                PK: "CAT#data",
                createdBy: appUserId
            };

            if (cat1 === NEW_REGIST_CAT_ID && cat1Name) {
                newCatId = await createCategory(1, cat1Name, 0, commonProps);
                msg += `<br/> ・カテゴリ(大) : ${cat1Name}`;
            }
            if (cat2 === NEW_REGIST_CAT_ID && cat2Name) {
                newCatId = await createCategory(2, cat2Name, cat1, commonProps);
                msg += `<br/> ・カテゴリ(中) : ${cat2Name}`;
            }
            if (cat3 === NEW_REGIST_CAT_ID && cat3Name) {
                newCatId = await createCategory(3, cat3Name, cat2, commonProps);
                msg += `<br/> ・カテゴリ(小) : ${cat3Name}`;
            }

            if (newCatId !== NEW_REGIST_CAT_ID) {
                setSuccessDialogMsg(msg);
                setSuccessDialogOpen(true);
                handleCatUpdate({ newCat1: cat1, newCat2: cat2, newCat3: cat3 });
                clearCategory();
            }
        }
    };

    const createCategory = async (catType: number, catName: string, parentCatId: number, commonProps: any) => {
        const createCategoryDataInput = {
            ...commonProps,
            catType,
            catName,
            parentCatId
        };
        return await callApiCreateCategory(createCategoryDataInput);
    };

    const validateInputs = () => {
        if (cat1 !== NEW_REGIST_CAT_ID && cat2 !== NEW_REGIST_CAT_ID && cat3 !== NEW_REGIST_CAT_ID) {
            alert("新規作成カテゴリがありません。(大)(中)(小)いずれかのカテゴリを新規作成してください。");
            return false;
        }
        if (cat1 === NEW_REGIST_CAT_ID && !cat1Name) {
            alert("カテゴリ(大)の新規カテゴリ名が入力されていません");
            return false;
        }
        if (cat2 === NEW_REGIST_CAT_ID && !cat2Name) {
            alert("カテゴリ(中)の新規カテゴリ名が入力されていません");
            return false;
        }
        if (cat3 === NEW_REGIST_CAT_ID && !cat3Name) {
            alert("カテゴリ(小)の新規カテゴリ名が入力されていません");
            return false;
        }
        if (cat2 === NEW_REGIST_CAT_ID && cat1 === UNSELECTED_CAT_ID) {
            alert("カテゴリ(中)を登録にはカテゴリ(大)の指定が必要です");
            return false;
        }
        if (cat3 === NEW_REGIST_CAT_ID && cat2 === UNSELECTED_CAT_ID) {
            alert("カテゴリ(小)を登録にはカテゴリ(中)の指定が必要です");
            return false;
        }
        return true;
    };

    const handleSuccessDialogClose = () => {
        setSuccessDialogOpen(false);
        onClose();
    };

    const clearCategory = () => {
        setCat1(NEW_REGIST_CAT_ID);
        setCat2(NEW_REGIST_CAT_ID);
        setCat3(NEW_REGIST_CAT_ID);
        setCat1Name('');
        setCat2Name('');
        setCat3Name('');
    };

    return (
        <Dialog
            fullWidth
            maxWidth="lg"
            onClose={handleSubClose}
            open={open}
        >
            <DialogTitle sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}>カテゴリー作成</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleSubClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Stack direction="row" sx={{ pt: 2, pr: 1, pb: 2, pl: 1 }}>
                    {renderCategorySection("カテゴリ（大）", cat1, cat1List, cat1Name, cat1Disabled, setCat1, setCat1Name, [setCat2, setCat3])}
                    {renderCategorySection("カテゴリ（中）", cat2, cat2List, cat2Name, cat2Disabled, setCat2, setCat2Name, [setCat3])}
                    {renderCategorySection("カテゴリ（小）", cat3, cat3List, cat3Name, cat3Disabled, setCat3, setCat3Name, [])}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleSubClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubCreate} autoFocus>Create</Button>
            </DialogActions>
            <SuccessDialog
                open={successDialogOpen}
                onClose={handleSuccessDialogClose}
                title="カテゴリ新規作成成功"
                message={successDialogMsg}
            />
        </Dialog>
    );

    function renderCategorySection(label: string, catValue: number, catList: CategoryDataType[], catName: string, disabled: boolean, setCat: Function, setCatName: Function, resetters: Function[]) {
        return (
            <Stack sx={{ mr: 3, p: 1, border: 1, borderColor: '#ccc', borderRadius: 1 }}>
                <Box sx={{ width: '12ch', color: 'gray', position: 'relative', top: -20, backgroundColor: '#fff' }}>
                    {label}
                </Box>
                <Box
                    width="100%"
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { mb: 2, width: '30ch' }
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Box>
                        <TextField
                            select
                            label="新規作成 / 既存カテゴリ選択"
                            value={catValue}
                            onChange={handleCatChange(setCat, resetters)}
                        >
                            {catList.map(option => (
                                <MenuItem key={option.SK} value={option.SK}>
                                    {option.catName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box>
                        <FormControl sx={{ width: '30ch' }}>
                            <InputLabel htmlFor="outlined-adornment-amount">登録カテゴリー名</InputLabel>
                            <OutlinedInput
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                label="カテゴリー名"
                                color="primary"
                                value={catName}
                                onChange={handleNameChange(setCatName)}
                                disabled={disabled}
                                sx={{
                                    '&.Mui-disabled': { opacity: 0.5, backgroundColor: 'gray' }
                                }}
                            />
                        </FormControl>
                    </Box>
                </Box>
            </Stack>
        );
    }
}

export default CreateCategoryDialog;