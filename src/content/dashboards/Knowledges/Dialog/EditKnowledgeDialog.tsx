import { useState, useEffect, useRef, useMemo, ChangeEvent, DragEvent } from 'react';
import {
    markdownit, DOMPurify, KnowledgeDataType, CreateCategoryDialog, FullscreenIcon, FullscreenExitIcon,
    Box, Grid, Stack, Button, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, UNSELECTED_CAT_ID, SCREEN, API, LOAD,
    FormControl, InputLabel, InputAdornment, OutlinedInput, TextField, MenuItem, IconButton, CloseIcon, useUserContext, SuccessDialog,
    graphqlApiCall, graphqlApiResult, listCategoryData, CategoryDataType, CategoryDataDefault, updateKnowledgeData, UpdateKnowledgeDataInputType
} from '../index';
import 'easymde/dist/easymde.min.css';
// import { S3 } from 'aws-sdk';

interface EditKnowledgeDialogProps {
    open: boolean;
    onClose: () => void;
    knowledgeDataParam: KnowledgeDataType;
}

function EditKnowledgeDialog ({ open, onClose, knowledgeDataParam }: EditKnowledgeDialogProps) {

    const {appUserId, setAppUserId} = useUserContext();
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [createCatOpen, setCreateCatOpen] = useState<boolean>(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
    const [successDialogMsg, setSuccessDialogMsg] = useState<string>('');
    const [markdownValue, setMarkdownValue] = useState<string>('');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isDragActive, setIsDragActive] = useState<boolean>(false);
    const [catList, setCatList] = useState<CategoryDataType[]>(CategoryDataDefault);
    const [cat1, setCat1] = useState<number>(0);
    const [cat2, setCat2] = useState<number>(0);
    const [cat3, setCat3] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const theme = useTheme();
    const [cat1List, setCat1List] = useState<Array<CategoryDataType>>([]);
    const [cat2List, setCat2List] = useState<Array<CategoryDataType>>([]);
    const [cat3List, setCat3List] = useState<Array<CategoryDataType>>([]);
    const cat1Ref = useRef<number>(0);
    const cat2Ref = useRef<number>(0);
    const cat3Ref = useRef<number>(0);
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
            setCat1List(getCatListByCatType(1));
            setCat1(knowledgeDataParam.cat1.SK);
            setCat2(knowledgeDataParam.cat2.SK);
            setCat3(knowledgeDataParam.cat3.SK);
            setTitle(knowledgeDataParam.title);
            setContent(knowledgeDataParam.content);
            setMarkdownValue(knowledgeDataParam.content);
            setSuccessDialogMsg("なれっじ 【ID：" + knowledgeDataParam.SK + " 】の内容を更新しました！");
        };
    }, [open]);

    useEffect(() => {
        console.log("useEffect TRIGGERED => cat1");
        console.log(cat1);
        if(operationRoute.current === SCREEN){
            if(cat1 === UNSELECTED_CAT_ID){
                setCat2List(getEmptyCatList());
                setCat3List(getEmptyCatList());
            }else{
                setCat2List(getCatListByParentCatId(cat1));
                setCat3List(getEmptyCatList());
            }
        };
    }, [cat1]);

    useEffect(() => {
        console.log("useEffect TRIGGERED => cat2");
        console.log(cat2);
        if(operationRoute.current === SCREEN){
            if(cat2 === UNSELECTED_CAT_ID){
                setCat3List(getEmptyCatList());
            }else{
                setCat3List(getCatListByParentCatId(cat2));
            }
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

    const callApiUpdateKnowledge = async(updateKnowledgeDataInput: UpdateKnowledgeDataInputType) => {
      const res: any = await graphqlApiCall(updateKnowledgeData(updateKnowledgeDataInput));
      const result: boolean = graphqlApiResult(res.updateNarejiroDevTable);
      if(result){ setSuccessDialogOpen(true); };
    };

    const handleClose = () => {
        onClose();
    };

    const handleSubClose = () => {
        setCreateCatOpen(false);
    };

    const handleCat1Change = (event) => {
        operationRoute.current = SCREEN;
        setCat3(UNSELECTED_CAT_ID);
        setCat2(UNSELECTED_CAT_ID);
        setCat1(event.target.value);
    };

    const handleCat2Change = (event) => {
        operationRoute.current = SCREEN;
        setCat3(UNSELECTED_CAT_ID);
        setCat2(event.target.value);
    };

    const handleCat3Change = (event) => {
        operationRoute.current = SCREEN;
        setCat3(event.target.value);
    };

    const handleTitleChange = (event) => {
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

    const handleEditBtn = () => {
        const updateKnowledgeDataInput = {
            SK: knowledgeDataParam.SK,
            cat1: cat1,
            cat2: cat2,
            cat3: cat3,
            title: title,
            content: content,
            updatedBy: appUserId
        };
        callApiUpdateKnowledge(updateKnowledgeDataInput);
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
        // const promises = [
        //     new Promise<void>((resolve) => {
        //         cat1Ref.current = newCatFromCreateCatDialog.newCat1;
        //         setCat1(newCatFromCreateCatDialog.newCat1);
        //         resolve();
        //     }),
        //     new Promise<void>((resolve) => {
        //         cat2Ref.current = newCatFromCreateCatDialog.newCat2;
        //         setCat2(newCatFromCreateCatDialog.newCat2);
        //         resolve();
        //     }),
        //     new Promise<void>((resolve) => {
        //         cat3Ref.current = newCatFromCreateCatDialog.newCat3;
        //         setCat3(newCatFromCreateCatDialog.newCat3);
        //         // if(cat3List.length != 0){setCat3(newCatFromCreateCatDialog.newCat3);};
        //         resolve();
        //     }),
        // ];
        // await Promise.all(promises);
    };

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

    // const imageUploadFunction = (file) => {
    //     // 保存先の参照を作成
    //     const storage = firebase.storage();
    //     const storageRef = storage.ref(`images`);
    //     const imagesRef = storageRef.child(file.name);
    //     // 画像をアップロード
    //     const upLoadTask = imagesRef.put(file);
    //     // エラー処理や画像の保存が完了した後の処理
    //     upLoadTask.on(
    //       "state_changed",
    //       (snapshot) => {
    //         console.log("snapshot", snapshot);
    //       },
    //       (error) => {
    //         console.log("エラーが発生しました", error);
    //       },
    //       () => {upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
    //           // アップロードしたURLを取得してマークダウンに埋め込む
    //           setMarkdown((preMardown) => {
    //             return preMardown + `![image](${downloadURL})`;
    //             });
    //           );
    //         });
    //       }
    //     );
    //   };

    const autoUploadImage = useMemo(() => {
     return {
       uploadImage: true,
    //    imageUploadFunction,
     };
   }, []);
  
    // useEffect(() => {
    //   const preview = document.getElementById('preview');
    //   if (preview) {
    //     preview.innerHTML = DOMPurify.sanitize(markdownit().render(markdownValue));
    //   }
    // }, [markdownValue]);

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
                    <DialogTitle sx={{color: theme.palette.primary.main, fontWeight: "bold"}}>なれっじ編集 【ID：{knowledgeDataParam.SK} 】</DialogTitle>
                    <DialogContent dividers>
                        <Stack direction="row">
                            <Box
                                width="100%"
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width:'25ch'}
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <Box>
                                    <TextField
                                        id="editKnowledgeCat1"
                                        select
                                        label="カテゴリー(大)"
                                        value={cat1}
                                        onChange={handleCat1Change}
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
                                        id="editKnowledgeCat2"
                                        select
                                        label="カテゴリー(中)"
                                        value={cat2}
                                        onChange={handleCat2Change}
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
                                        id="editKnowledgeCat3"
                                        select
                                        label="カテゴリー(小)"
                                        value={cat3}
                                        onChange={handleCat3Change}
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
                                        onClick={() => handleCreateCatOpen()}
                                    >
                                        Create カテゴリー
                                    </Button>
                                </Box>
                                <Box>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">タイトル</InputLabel>
                                        <OutlinedInput
                                            id="editKnowledgeTitle"
                                            color="info"
                                            // startAdornment={<InputAdornment position="start">{knowledgeDataParam.title}</InputAdornment>}
                                            label="タイトル"
                                            value={title}
                                            onChange={handleTitleChange}
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
                        <Button variant="contained" onClick={handleEditBtn} autoFocus>Edit</Button>
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
                catList={catListRef.current}
                handleCatUpdate={handleCatUpdate}
            />
            <SuccessDialog
                open={successDialogOpen}
                onClose={handleSuccessDialogClose}
                title="なれっじ更新成功"
                message={successDialogMsg}
            />
        </Dialog>
    );
}

export default EditKnowledgeDialog;