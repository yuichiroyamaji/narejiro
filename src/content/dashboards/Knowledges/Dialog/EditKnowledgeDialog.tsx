import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import SimpleMde from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import markdownit from 'markdown-it';
import DOMPurify from 'dompurify';

import {
  Box,
  Grid,
  Stack,
  Button,
  useTheme,
  Hidden
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

const DEFAULT_TEXT = [
  '## ShopifyのAPI呼び出し回数について',
  '---',
  'ShopifyのAPI（REST API）では、契約プランによって呼び出し回数の制限が異なる。',
];

function EditKnowledgeDialog(props) {
    const { onClose, knowledgeId, open } = props;
    const [markdownValue, setMarkdownValue] = useState<string>(DEFAULT_TEXT.join('\n'));
    const [cat1, setCat1] = useState();
    const [cat2, setCat2] = useState();
    const [cat3, setCat3] = useState();
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
        onClose(knowledgeId);
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
  
    const onChange = (value: string) => {
      setMarkdownValue(value);
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
                                        id="standard-required"
                                        label="なれっじID"
                                        variant="filled"
                                        value={knowledgeId}
                                        InputProps={{
                                            readOnly: true
                                        }}
                                        // sx={{bgcolor: 'gray'}}
                                        disabled
                                    />
                                </Box>
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
                                    <Button
                                        size="small"
                                        variant="contained"
                                        // color="success"
                                        sx={{mt: 3, ml: 1 }}
                                    >
                                        Create カテゴリ
                                    </Button>
                                    {/* <PlusIcon color="secondary" /> */}
                                </Box>
                                <Box>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">タイトル</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            color="info"
                                            startAdornment={<InputAdornment position="start">ShopifyのAPI呼び出し回数について</InputAdornment>}
                                            label="タイトル"
                                        />
                                    </FormControl>
                                </Box>
                                <Box sx={{ mt: 1, mb: 1, ml: 1 }}>
                                    <SimpleMde value={markdownValue} onChange={onChange} options={autoUploadImage}/>
                                </Box>
                            </Box>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                        <Button variant="outlined" onClick={handleClose} autoFocus>OK</Button>
                    </DialogActions>
                </Grid>
                <Grid item xs={6} sx={{borderLeft: 1, borderColor: "#ccc", overflowY: "scroll" }}>
                    <FormControl fullWidth sx={{ p: 3 }}>
                        <Box dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(markdownit().render(markdownValue))}}></Box>
                    </FormControl>
                </Grid>
            </Grid>
        </Dialog>
    );
}

EditKnowledgeDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    knowledgeId: PropTypes.number.isRequired
};

export default EditKnowledgeDialog;