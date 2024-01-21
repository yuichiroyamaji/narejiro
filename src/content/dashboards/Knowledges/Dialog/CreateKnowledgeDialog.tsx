import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Box,
  Card,
  CardHeader,
  Container,
  Grid,
  CardContent,
  Stack,
  Button,
  useTheme
} from '@mui/material';
import IconButton from '@mui/material/IconButton';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
// import { createSvgIcon } from '@mui/material/utils';

import SimpleMde from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import markdownit from 'markdown-it';
import DOMPurify from 'dompurify';
import highlightjs from 'highlight.js';
// import 'highlight.js/styles/atelier-lakeside-dark.css'

function CreateKnowledgeDialog(props) {
    const { onClose, knowledgeId, open } = props;
    const [markdownValue, setMarkdownValue] = useState<string>('hello');
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

    // const PlusIcon = createSvgIcon(
    //   // credit: plus icon from https://heroicons.com/
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     fill="none"
    //     viewBox="0 0 24 24"
    //     strokeWidth={1.5}
    //     stroke="currentColor"
    //   >
    //     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    //   </svg>,
    //   'Plus',
    // );
  
    useEffect(() => {
      const preview = document.getElementById('preview');
      if (preview) {
        preview.innerHTML = DOMPurify.sanitize(markdownit().render(markdownValue));
      }
    }, [markdownValue]);

    return (
        <Dialog
            // sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
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
                                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            label="タイトル"
                                        />
                                    </FormControl>
                                </Box>
                                {/* <Box>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">内容</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">Shopify APIのアクセス制限について</InputAdornment>}
                                            label="内容"
                                            multiline
                                            rows={4}
                                        />
                                    </FormControl>
                                </Box> */}
                                {/* <p>内容</p> */}
                                <Box sx={{ mt: 1, mb: 1, ml: 1 }}>
                                    <SimpleMde value={markdownValue} onChange={onChange}/>
                                </Box>
                            {/* <SimpleMde value={markdownValue} onChange={onChange} options={autoUploadImage}/> */}
                            </Box>
                        </Stack>
                    </DialogContent>
                </Grid>
                <Grid item xs={6} sx={{borderLeft: 1, borderColor: "#ccc"}}>
                    <FormControl fullWidth sx={{ p: 3 }}>
                        <Box dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(markdownit().render(markdownValue))}}></Box>
                    </FormControl>
                </Grid>
            </Grid>
        </Dialog>
    );
}

CreateKnowledgeDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    knowledgeId: PropTypes.string.isRequired
};

export default CreateKnowledgeDialog;