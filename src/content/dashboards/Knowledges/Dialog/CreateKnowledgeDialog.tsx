import { useState, useEffect, useRef, useMemo, ChangeEvent, DragEvent } from 'react';
import {
    DEFAULT_TEXT, Box, Grid, Stack, Button, useTheme, FormControl, InputLabel, UNSELECTED_CAT_ID, SCREEN, API, LOAD, OutlinedInput, 
    TextField, MenuItem, IconButton, CloseIcon, Dialog, DialogTitle, DialogContent, DialogActions, useUserContext, SuccessDialog,
    SimpleMde, markdownit, DOMPurify, CreateCategoryDialog, CategoryDataType, CategoryDataDefault, FullscreenIcon, FullscreenExitIcon,
    graphqlApiCall, graphqlApiResult, listCategoryData, createKnowledgeData, CreateKnowledgeDataInputType
} from '../index';
import 'easymde/dist/easymde.min.css';

interface CreateKnowledgeDialogProps {
    open: boolean;
    onClose: () => void;
}

function CreateKnowledgeDialog ({ open, onClose }: CreateKnowledgeDialogProps) {

    const {appUserId, setAppUserId} = useUserContext();
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [createCatOpen, setCreateCatOpen] = useState<boolean>(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
    const [successDialogMsg, setSuccessDialogMsg] = useState<string>('');
    const [markdownValue, setMarkdownValue] = useState<string>(DEFAULT_TEXT.join('\n'));
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isDragActive, setIsDragActive] = useState<boolean>(false);
    const [catList, setCatList] = useState<CategoryDataType[]>(CategoryDataDefault);
    const [cat1, setCat1] = useState<number>(0);
    const [cat2, setCat2] = useState<number>(0);
    const [cat3, setCat3] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>(DEFAULT_TEXT.join('\n'));
    const theme = useTheme();
    const [cat1List, setCat1List] = useState<Array<CategoryDataType>>([]);
    const [cat2List, setCat2List] = useState<Array<CategoryDataType>>([]);
    const [cat3List, setCat3List] = useState<Array<CategoryDataType>>([]);
    const catListRef = useRef<CategoryDataType[]>(CategoryDataDefault);
    const operationRoute = useRef(LOAD);

    useEffect(() => {
        console.log("useEffect TRIGGERED => []");
        callApiListCategoryDatas();
        const handleResize = () => { setWindowHeight(window.innerHeight); };
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize); };
    }, []);

    useEffect(() => {
        console.log("useEffect TRIGGERED => open");
        if(open){
            operationRoute.current = SCREEN;
            initializeDialog();
        };
    }, [open]);

    useEffect(() => {
        console.log("useEffect TRIGGERED => cat1");
        console.log(cat1);
        if(operationRoute.current === SCREEN){
            updateCategoryLists(cat1, setCat2List, setCat3List);
        };
    }, [cat1]);

    useEffect(() => {
        console.log("useEffect TRIGGERED => cat2");
        console.log(cat2);
        if(operationRoute.current === SCREEN){
            updateCategoryLists(cat2, setCat3List);
        };
    }, [cat2]);

    useEffect(() => {
        console.log("useEffect TRIGGERED => cat3");
        console.log(cat3);
    }, [cat3]);

    useEffect(() => {
        console.log("useEffect TRIGGERED => catList");
        catListRef.current = catList;
    }, [catList]);

    useEffect(() => {
        console.log("useEffect TRIGGERED => cat1List");
        console.log(cat1List);
    }, [cat1List]);

    useEffect(() => {
        console.log("useEffect TRIGGERED => cat2List");
        console.log(cat2List);
    }, [cat2List]);

    useEffect(() => {
        console.log("useEffect TRIGGERED => cat3List");
        console.log(cat3List);
    }, [cat3List]);

    const initializeDialog = () => {
        setCat1List(getCatListByCatType(1));
        setCat2List(getEmptyCatList());
        setCat3List(getEmptyCatList());
        setCat1(0);
        setCat2(0);
        setCat3(0);
    };

    const updateCategoryLists = (categoryId: number, setList1: Function, setList2?: Function) => {
        if (categoryId === UNSELECTED_CAT_ID) {
            setList1(getEmptyCatList());
            if (setList2) setList2(getEmptyCatList());
        } else {
            setList1(getCatListByParentCatId(categoryId));
            if (setList2) setList2(getEmptyCatList());
        }
    };

    const getEmptyCatList = () => {
        // return [];
        return catList.filter((catList) => catList.SK === UNSELECTED_CAT_ID);
    }

    const getCatListByCatType = (catType: number) => {
        return catListRef.current.filter((catList) => {
            return catList.catType === catType || catList.SK === UNSELECTED_CAT_ID;
        });
    };

    const getCatListByParentCatId = (SK: number) => {
        return catListRef.current.filter((catList) => {
            return catList.parentCatId === SK || catList.SK === UNSELECTED_CAT_ID;
        });
    };

    const callApiListCategoryDatas = async() => {
      const res: any = await graphqlApiCall(listCategoryData);
      const result: boolean = graphqlApiResult(res.listNarejiroDevTables.items);
      if(result){
        setCatList(res.listNarejiroDevTables.items);
        catListRef.current = res.listNarejiroDevTables.items;
        // Set values for initial LOAD (cat*List required to set cat*)
        if(cat1List.length === 0){
            setCat1List(getCatListByCatType(1));
            setCat2List(getCatListByCatType(2));
            setCat3List(getCatListByCatType(3));
        };
      };
    };

    const callApiCreateKnowledge = async(createKnowledgeDataInput: CreateKnowledgeDataInputType) => {
      try {
        const res: any = await graphqlApiCall(createKnowledgeData(createKnowledgeDataInput));
        const result: boolean = graphqlApiResult(res.createNarejiroDevTable);
        if(result){
          setSuccessDialogMsg("なれっじ 「【ID：" + res.createNarejiroDevTable.SK + " 】" + res.createNarejiroDevTable.title + "」を作成しました！");
          setSuccessDialogOpen(true);
        }else{
          alert("Failed to create knowledge.");
        }
      } catch (error) {
        console.error('Error creating knowledge:', error);
        alert("An error occurred while creating knowledge.");
      }
    };

    const handleClose = () => {
        onClose();
    };

    const handleSubClose = () => {
        setCreateCatOpen(false);
    };

    const handleCatChange = (setter: Function, resetters: Function[]) => (event: ChangeEvent<HTMLInputElement>) => {
        operationRoute.current = SCREEN;
        resetters.forEach(reset => reset(UNSELECTED_CAT_ID));
        setter(event.target.value);
    };

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleCreateCatOpen = () => {
        setCreateCatOpen(true);
    };

    const handleSuccessDialogClose = () => {
        setSuccessDialogOpen(false);
        onClose();
        window.location.reload();
    };

    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
        setMarkdownValue(event.target.value);
    };

    const handleFullScreenToggle = () => {
        setIsFullScreen(!isFullScreen);
    };

    const handleCreateBtn = async () => {
        if (!title.trim()) {
            alert("タイトルを入力してください。");
            return;
        }
        if (!content.trim()) {
            alert("コンテンツを入力してください。");
            return;
        }
        const createKnowledgeDataInput: CreateKnowledgeDataInputType = {            
            cat1: cat1,
            cat2: cat2,
            cat3: cat3,
            title: title,
            content: content,
            createdBy: appUserId
        };
        callApiCreateKnowledge(createKnowledgeDataInput);
    };

    type newCatFromCreateCatDialogType = {
        newCat1: number;
        newCat2: number;
        newCat3: number;
    };

    const handleCatUpdate = async(newCatFromCreateCatDialog: newCatFromCreateCatDialogType) => {
        operationRoute.current = API;
        await callApiListCategoryDatas();
        setCat2(UNSELECTED_CAT_ID);
        setCat3(UNSELECTED_CAT_ID);
        setCat1List(getCatListByCatType(1));
        setCat2List(getCatListByParentCatId(newCatFromCreateCatDialog.newCat1));
        setCat3List(getCatListByParentCatId(newCatFromCreateCatDialog.newCat2));
        setCat1(newCatFromCreateCatDialog.newCat1);
        setCat2(newCatFromCreateCatDialog.newCat2);
        setCat3(newCatFromCreateCatDialog.newCat3);
    };

    // const callApiListCategoryDatas = async() => {
    //   const res: any = await graphqlApiCall(listCategoryData);
    //   const result: boolean = graphqlApiResult(res.listNarejiroDevTables.items);
    //   if(result){ setCatList(res.listNarejiroDevTables.items); };
    // };

    const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDragActive(true);
      }
    };

    const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
      setIsDragActive(false);
    };

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragActive(false);
      if (e.dataTransfer.files !== null && e.dataTransfer.files.length > 0) {
        if (e.dataTransfer.files.length === 1) {
          alert(e.dataTransfer.files[0].name);
        } else {
          alert("一度に貼り付け可能なファイル数は１つまでとなります");
        }
        e.dataTransfer.clearData();
      }
    };

    const autoUploadImage = useMemo(() => {
     return {
       uploadImage: true,
    //    imageUploadFunction,
     };
   }, []);

    return (
        <Dialog
            className={isFullScreen ? 'full-screen-dialog' : ''}
            fullScreen={isFullScreen}
            fullWidth
            maxWidth="lg"
            onClose={handleClose} 
            open={open}
        >
            <Grid container>
                <Grid item xs={6}>
                    <DialogTitle sx={{color: theme.palette.primary.main, fontWeight: "bold"}}>なれっじ作成</DialogTitle>
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
                                        id="createKnowledgeCat1"
                                        select
                                        label="カテゴリー(大)"
                                        value={cat1}
                                        onChange={handleCatChange(setCat1, [setCat2, setCat3])}
                                    >
                                        {cat1List
                                        // .filter((cat) => cat.catType === 1)
                                        .map((cat) => (
                                            <MenuItem key={cat.SK} value={cat.SK}>
                                            {cat.catName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        id="createKnowledgeCat2"
                                        select
                                        label="カテゴリー(中)"
                                        value={cat2}
                                        onChange={handleCatChange(setCat2, [setCat3])}
                                    >
                                        {cat2List
                                        // .filter((cat) => cat.catType === 2)
                                        .map((cat) => (
                                            <MenuItem key={cat.SK} value={cat.SK}>
                                            {cat.catName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        id="createKnowledgeCat3"
                                        select
                                        label="カテゴリー(小)"
                                        value={cat3}
                                        onChange={handleCatChange(setCat3, [])}
                                    >
                                        {cat3List
                                        // .filter((cat) => cat.catType === 3)
                                        .map((cat) => (
                                            <MenuItem key={cat.SK} value={cat.SK}>
                                            {cat.catName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <Button
                                        variant="contained"
                                        sx={{mt: 2, ml: 1 }}
                                        onClick={handleCreateCatOpen}
                                    >
                                        Create カテゴリー
                                    </Button>
                                </Box>
                                <Box>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">タイトル</InputLabel>
                                        <OutlinedInput
                                            id="createKnowledgeTitle"
                                            value={title}
                                            onChange={handleTitleChange}
                                            label="タイトル"
                                        />
                                    </FormControl>
                                </Box>
                                <Box
                                    onDragEnter={onDragEnter}
                                    onDragLeave={onDragLeave}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={onDrop}
                                >
                                    <TextField
                                        id="editKnowledgeContent"
                                        label="コンテンツ"
                                        placeholder="MultiLine with rows: 2 and rowsMax: 4"
                                        variant="outlined"
                                        multiline
                                        rows={isFullScreen ? windowHeight/35 : windowHeight/50}
                                        value={content}
                                        onChange={handleContentChange}
                                        style = {{width: "100%"}}
                                        fullWidth
                                    />
                                </Box>
                            </Box>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleCreateBtn} autoFocus>Create</Button>
                    </DialogActions>
                </Grid>
                <Grid item xs={6} sx={{pl: 3, pt: 1, pr: 1, pb: 1, borderLeft: 1, borderColor: "#ccc" }}>
                    <Box sx={{ overflowY: "scroll" }} style={{ height: isFullScreen ? windowHeight*0.98 : windowHeight*0.86 }}>
                        <IconButton
                        aria-label="fullScreen"
                        onClick={handleFullScreenToggle}
                        sx={{
                            position: 'absolute',
                            right: 40,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                        >
                            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                        </IconButton>
                        <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(markdownit().render(markdownValue))}}></div>
                    </Box>
                </Grid>
            </Grid>
            <CreateCategoryDialog
                open={createCatOpen}
                onClose={handleSubClose}
                catList={catList}
                handleCatUpdate={handleCatUpdate}
            />
            <SuccessDialog
                open={successDialogOpen}
                onClose={handleSuccessDialogClose}
                title="なれっじ新規作成成功"
                message={successDialogMsg}
            />
        </Dialog>
    );
}

export default CreateKnowledgeDialog;