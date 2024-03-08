import { useState, useEffect, useMemo, ChangeEvent, DragEvent } from 'react';
import {
    API_URL, API_KEY, DEFAULT_TEXT, KnowledgeData,
    Box, Grid, Stack, Button, useTheme,
    FormControl, InputLabel, InputAdornment, OutlinedInput, TextField, MenuItem, IconButton, CloseIcon,
    Dialog, DialogTitle, DialogContent, DialogActions,
    SimpleMde, markdownit, DOMPurify,
    CreateCategoryDialog
} from '../index';
import 'easymde/dist/easymde.min.css';
// import { S3 } from 'aws-sdk';

interface EditKnowledgeDialogProps {
    open: boolean;
    onClose: () => void;
    knowledgeDataParam: KnowledgeData;
}

function EditKnowledgeDialog ({ open, onClose, knowledgeDataParam }: EditKnowledgeDialogProps) {

    const [createCatOpen, setCreateCatOpen] = useState<boolean>(false);
    const [markdownValue, setMarkdownValue] = useState<string>('');
    const [isDragActive, setIsDragActive] = useState<boolean>(false);
    const [cat1, setCat1] = useState<number>(0);
    const [cat2, setCat2] = useState<number>(0);
    const [cat3, setCat3] = useState<number>(0);
    const theme = useTheme();

    // useEffect(() => {
    //     console.log(knowledgeDataParam.content);
    //     setMarkdownValue(knowledgeDataParam.content);
    // }, [open]);

    const cat1s = [
      {
        value: 0,
        label: '未選択'
      },
      {
        value: 1,
        label: 'Mall'
      },
      {
        value: 2,
        label: 'Shopify'
      },
      {
        value: 3,
        label: 'Amazon'
      },
      {
        value: 4,
        label: 'Yahoo'
      },
      {
        value: 5,
        label: 'Rakuten'
      },
      {
        value: 6,
        label: 'EC-Cube'
      }
    ];

    const handleClose = () => {
        onClose();
    };

    const handleSubClose = () => {
        setCreateCatOpen(false);
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

    const handleCreateCatOpen = () => {
        setCreateCatOpen(true);
    };

    const handleKnowledgeContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdownValue(event.target.value);
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
            fullWidth
            maxWidth="lg"
            onClose={handleClose} 
            open={open}
        >
            <Grid container>
                <Grid item xs={6}>
                    <DialogTitle sx={{color: theme.palette.primary.main, fontWeight: "bold"}}>なれっじ編集</DialogTitle>
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
                                        required
                                        id="editKnowledgeKnowledgeId"
                                        label="なれっじID"
                                        variant="filled"
                                        value={knowledgeDataParam.SK}
                                        InputProps={{
                                            readOnly: true
                                        }}
                                        disabled
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        id="editKnowledgeCat1"
                                        select
                                        label="カテゴリー(大)"
                                        value={cat1}
                                        onChange={handleCat1Change}
                                    >
                                        {cat1s.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
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
                                        {cat1s.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
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
                                        {cat1s.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
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
                                            startAdornment={<InputAdornment position="start">{knowledgeDataParam.title}</InputAdornment>}
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
                                        rows={13}
                                        value={knowledgeDataParam.content}
                                        onChange={handleKnowledgeContentChange}
                                        style = {{width: "100%"}}
                                        fullWidth
                                    />
                                </Box>
                            </Box>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleClose} autoFocus>Edit</Button>
                    </DialogActions>
                </Grid>
                <Grid item xs={6} sx={{pl: 3, pt: 3, pr: 1, pb: 1, borderLeft: 1, borderColor: "#ccc" }}>
                    <Box sx={{ height: 700, overflowY: "scroll" }}>
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
            />
        </Dialog>
    );
}

export default EditKnowledgeDialog;