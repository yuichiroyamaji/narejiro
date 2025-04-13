import { useState, useEffect, useRef } from 'react';
import {
    Box, Stack, Button, useTheme, graphqlApiCall, graphqlApiResult, SuccessDialog,
    FormControl, InputLabel, InputAdornment, OutlinedInput, TextField, MenuItem, IconButton, CloseIcon, useUserContext,
    Dialog, DialogTitle, DialogContent, DialogActions, CategoryDataType, createCategoryData, CreateCategoryDataInputType,
    NEW_REGIST_CAT_ID, UNSELECTED_CAT_ID
} from './index';

type newCatFromCreateCatDialogType = {
    newCat1: number;
    newCat2: number;
    newCat3: number;
};

type handleCatUpdateType = (newCatFromCreateCatDialog: newCatFromCreateCatDialogType) => void;

interface CreateCategoryDialogProps {
    open: boolean;
    onClose: () => void;
    catList: CategoryDataType[];
    handleCatUpdate: handleCatUpdateType;
}

export const useCategory = ({ open, onClose, catList, handleCatUpdate }: CreateCategoryDialogProps) => {
    const {appUserId, setAppUserId} = useUserContext();
    const [cat1, setCat1] = useState<number>(NEW_REGIST_CAT_ID);
    const [cat2, setCat2] = useState<number>(NEW_REGIST_CAT_ID);
    const [cat3, setCat3] = useState<number>(NEW_REGIST_CAT_ID);
    const cat1Ref = useRef<number>(NEW_REGIST_CAT_ID);
    const cat2Ref = useRef<number>(NEW_REGIST_CAT_ID);
    const cat3Ref = useRef<number>(NEW_REGIST_CAT_ID);
    const [cat1Name, setCat1Name] = useState<string>('');
    const [cat2Name, setCat2Name] = useState<string>('');
    const [cat3Name, setCat3Name] = useState<string>('');
    const [cat1List, setCat1List] = useState<Array<CategoryDataType>>([]);
    const [cat2List, setCat2List] = useState<Array<CategoryDataType>>([]);
    const [cat3List, setCat3List] = useState<Array<CategoryDataType>>([]);
    const [cat1Disabled, setCat1Disabled] = useState<boolean>(false);
    const [cat2Disabled, setCat2Disabled] = useState<boolean>(false);
    const [cat3Disabled, setCat3Disabled] = useState<boolean>(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
    const [successDialogMsg, setSuccessDialogMsg] = useState<string>('');

    useEffect(() => {
        setCat1List(getCatListByCatType(1));
        setCat2List(getEmptyCatList());
        setCat3List(getEmptyCatList());
    },[open]);

    useEffect(() => {
        console.log("useEffect TRIGGERED => cat1");
        console.log(cat1);
        cat1Ref.current = cat1;
        if(cat1 === NEW_REGIST_CAT_ID){
            setCat1Disabled(false);
            setCat2List(getEmptyCatList());
            setCat2Disabled(false);
            setCat3List(getEmptyCatList());
            setCat3Disabled(false);
        }else{
            setCat1Disabled(true);
            setCat2List(getCatListByParentCatId(cat1));
            setCat3List(getEmptyCatList());
        }
    }, [cat1]);

    useEffect(() => {
        console.log("useEffect TRIGGERED => cat2");
        console.log(cat2);
        cat2Ref.current = cat2;
        if(cat2 === NEW_REGIST_CAT_ID){
            setCat2Disabled(false);
            setCat3List(getEmptyCatList());
        }else{
            setCat2Disabled(true);
            setCat3List(getCatListByParentCatId(cat2));
        }
    }, [cat2]);

    useEffect(() => {
        console.log("useEffect TRIGGERED => cat3");
        console.log(cat3);
        cat3Ref.current = cat3;
        if(cat3 === NEW_REGIST_CAT_ID){
            setCat3Disabled(false);
        }else{
            setCat3Disabled(true);
        }
    }, [cat3]);

    const theme = useTheme();

    const callApiCreateCategory = async(createCategoryDataInput: CreateCategoryDataInputType) => {
      const res: any = await graphqlApiCall(createCategoryData(createCategoryDataInput));
      const result: boolean = await graphqlApiResult(res.createNarejiroDevTable);
    //   if(result){await resetCategory(res.createNarejiroDevTable.catType, res.createNarejiroDevTable.SK);};
      return res.createNarejiroDevTable.SK;
    };

    const resetCategory = (catType: number, SK: number) => {
        switch (catType) {
            case 1:
                setCat1(SK);
                break;
            case 2:
                setCat2(SK);
                break;
            case 3:
                setCat3(SK);
                break;
        }
    };

    const handleCat1Change = (event) => {
        setCat1(event.target.value);
        setCat2(NEW_REGIST_CAT_ID);
        setCat3(NEW_REGIST_CAT_ID);
    };

    const handleCat2Change = (event) => {
        setCat2(event.target.value);
        setCat3(NEW_REGIST_CAT_ID);
    };

    const handleCat3Change = (event) => {
        setCat3(event.target.value);
    };

    const handlecat1NameChange = (event) => {
        setCat1Name(event.target.value);
    };

    const handlecat2NameChange = (event) => {
        setCat2Name(event.target.value);
    };

    const handlecat3NameChange = (event) => {
        setCat3Name(event.target.value);
    };

    const handleSubClose = () => {
        clearCategory();
        onClose();
    };

    const handleSubCreate = async() => {
        if(cat1 != NEW_REGIST_CAT_ID && cat2 != NEW_REGIST_CAT_ID && cat3 != NEW_REGIST_CAT_ID){
            alert("新規作成カテゴリがありません。(大)(中)(小)いずれかのカテゴリを新規作成してください。");
        }else if(cat1 === NEW_REGIST_CAT_ID && !cat1Name){
            alert("カテゴリ(大)の新規カテゴリ名が入力されていません");
        }else if(cat2 === NEW_REGIST_CAT_ID && !cat2Name){
            alert("カテゴリ(中)の新規カテゴリ名が入力されていません");
        }else if(cat3 === NEW_REGIST_CAT_ID && !cat3Name){
            alert("カテゴリ(小)の新規カテゴリ名が入力されていません");
        }else if(cat2 === NEW_REGIST_CAT_ID && cat1 === UNSELECTED_CAT_ID){
            alert("カテゴリ(中)を登録にはカテゴリ(大)の指定が必要です");
        }else if(cat3 === NEW_REGIST_CAT_ID && cat2 === UNSELECTED_CAT_ID){
            alert("カテゴリ(小)を登録にはカテゴリ(中)の指定が必要です");
        }else{
            let newCatId: number = NEW_REGIST_CAT_ID;
            let msg: string = "以下のカテゴリが作成されました。<br/>";
            const commonProps = {
                PK: "CAT#data",
                createdBy: appUserId
            };
            if(cat1 === NEW_REGIST_CAT_ID && cat1Name){
                const createCategoryDataInput = {
                    ...commonProps,
                    catType: 1,
                    catName: cat1Name,
                    parentCatId: 0,
                };
                newCatId = await callApiCreateCategory(createCategoryDataInput);
                cat1Ref.current = newCatId;
                msg += "<br/> ・カテゴリ(大) : " + cat1Name;
            };
            if(cat2 === NEW_REGIST_CAT_ID && cat2Name){
                const createCategoryDataInput = {
                    ...commonProps,
                    catType: 2,
                    catName: cat2Name,
                    parentCatId: cat1Ref.current,
                };
                newCatId = await callApiCreateCategory(createCategoryDataInput);
                cat2Ref.current = newCatId;
                msg += "<br/> ・カテゴリ(中) : " + cat2Name;
            };
            if(cat3 === NEW_REGIST_CAT_ID && cat3Name){
                const createCategoryDataInput = {
                    ...commonProps,
                    catType: 3,
                    catName: cat3Name,
                    parentCatId: cat2Ref.current,
                };
                newCatId = await callApiCreateCategory(createCategoryDataInput);
                cat3Ref.current = newCatId;
                msg += "<br/> ・カテゴリ(小) : " + cat3Name;
            };
            if(newCatId != NEW_REGIST_CAT_ID){
                setSuccessDialogMsg(msg);
                setSuccessDialogOpen(true);
            };
            const newCatFromCreateCatDialog = {
                newCat1: cat1Ref.current,
                newCat2: cat2Ref.current,
                newCat3: cat3Ref.current,
            };
            handleCatUpdate(newCatFromCreateCatDialog);
            clearCategory();
        };
    };

    const handleSuccessDialogClose = () => {
        setSuccessDialogOpen(false);
        onClose();
    };

    const getEmptyCatList = () => {
        return catList.filter((catData) => catData.catType === NEW_REGIST_CAT_ID);
    }

    const getCatListByCatType = (catType: number) => {
        return catList.filter((catData) => {
            return catData.catType === NEW_REGIST_CAT_ID || catData.catType === catType;
        });
    };

    const getCatListByParentCatId = (SK: number) => {
        return catList.filter((catData) => {
            return catData.catType === NEW_REGIST_CAT_ID || catData.parentCatId === UNSELECTED_CAT_ID || catData.parentCatId === SK;
        });
    };

    const clearCategory = () => {
        setCat1(NEW_REGIST_CAT_ID);
        setCat2(NEW_REGIST_CAT_ID);
        setCat3(NEW_REGIST_CAT_ID);
        setCat1Name('');
        setCat2Name('');
        setCat3Name('');
    };

    return {
        cat1, cat2, cat3,
        cat1Name, cat2Name, cat3Name,
        cat1Ref, cat2Ref, cat3Ref,
        cat1List, cat2List, cat3List,
        cat1Disabled, cat2Disabled, cat3Disabled,
        handleCat1Change, handleCat2Change, handleCat3Change,
        handlecat1NameChange, handlecat2NameChange, handlecat3NameChange,
        handleSubClose, successDialogOpen, handleSuccessDialogClose,
        successDialogMsg, handleSubCreate
    };
}