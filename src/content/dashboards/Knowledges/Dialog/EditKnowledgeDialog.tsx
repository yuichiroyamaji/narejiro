import { useState, useEffect, useMemo, ChangeEvent } from 'react';
import {
    API_URL, API_KEY, DEFAULT_TEXT,
    Box, Grid, Stack, Button, useTheme,
    FormControl, InputLabel, InputAdornment, OutlinedInput, TextField, MenuItem, IconButton, CloseIcon,
    Dialog, DialogTitle, DialogContent, DialogActions,
    SimpleMde, markdownit, DOMPurify,
    CreateCategoryDialog
} from '../index';
import 'easymde/dist/easymde.min.css';

interface EditKnowledgeDialogProps {
    open: boolean;
    onClose: () => void;
    knowledgeId: number;
}

function EditKnowledgeDialog ({ open, onClose, knowledgeId }: EditKnowledgeDialogProps) {

    const [createCatOpen, setCreateCatOpen] = useState<boolean>(false);
    const [markdownValue, setMarkdownValue] = useState<string>(DEFAULT_TEXT.join('\n'));
    const [cat1, setCat1] = useState<number>(0);
    const [cat2, setCat2] = useState<number>(0);
    const [cat3, setCat3] = useState<number>(0);
    const theme = useTheme();

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
    }

    const handleMarkdownValueChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdownValue(event.target.value);
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
                                        value={knowledgeId}
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
                                            startAdornment={<InputAdornment position="start">ShopifyのAPI呼び出し回数について</InputAdornment>}
                                            label="タイトル"
                                        />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <TextField
                                        id="editKnowledgeContent"
                                        label="コンテンツ"
                                        placeholder="MultiLine with rows: 2 and rowsMax: 4"
                                        variant="outlined"
                                        multiline
                                        rows={15}
                                        maxRows={Infinity}
                                        value={markdownValue}
                                        onChange={handleMarkdownValueChange}
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
                    <Box sx={{ height: 730, overflowY: "scroll" }}>
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