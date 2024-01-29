import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreateCategoryDialog from './CreateCategoryDialog'
import {
  Box,
  Grid,
  Stack,
  Button,
  useTheme
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

import SimpleMde from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import markdownit from 'markdown-it';
import DOMPurify from 'dompurify';

const DEFAULT_TEXT = [
  '# h1: 文頭に「シャープ + スペース」',
  '---',
  '_【italic文字表記】文字列の前後にアンダースコアを記述する_',
  '## h2: 文頭に「シャープx2 + スペース」',
  '---',
  '**【bold(太字)表記】文字列の前後にアスタリスクx2を記述する**',
  '### h3: 文頭に「シャープx3 + スペース」',
  '---',
  '~~【取り消し線表記】文字列の前後に波じるしx2を記述する~~',
  '#### h4: 文頭に「シャープx4 + スペース」',
  '---',
  '` 【引用ハイライト】文字列の前後にバッククオートを記述する `',
  '##### h5: 文頭に「シャープx5 + スペース」',
  '---',
  '``` \n【引用ハイライト】複数行記述する時はバッククオートx3、\n及び「バックスラッシュ + n」を文全体の前後と、各行の最後に記述する\n ```',
  '###### h6: 文頭に「シャープx6 + スペース」',
  '---',
  '- 【箇条書き（黒丸）】文頭にハイフン',
  '- 【箇条書き（黒丸）】文頭にハイフン',
  '1. 【箇条書き（数字）】文頭に「数字 + . + スペース」',
  '1. 【箇条書き（数字）】文頭に「数字 + . + スペース」',
  '---',
  '[Linkは大カッコで囲った文字が表示文字、その後のカッコ内の部分がURL、さらにダブルクオート内はホバー時の表示文字](http://google.com "Google Home")',
];

type CreateKnowledgeDialogProps = {
    onClose: boolean;
    open: boolean;
};

function CreateKnowledgeDialog(props) {
    const { onClose, open } = props;
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
  
    const onChange = (value: string) => {
        setMarkdownValue(value);
    };

    return (
        <Dialog
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
                                        sx={{mt: 3, ml: 1 }}
                                        onClick={() => handleCreateCatOpen()}
                                    >
                                        Create カテゴリ
                                    </Button>
                                </Box>
                                <Box>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">タイトル</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">Markdownの記述方法について</InputAdornment>}
                                            label="タイトル"
                                        />
                                    </FormControl>
                                </Box>
                                <Box sx={{ mt: 1, mb: 1, ml: 1 }}>
                                    <SimpleMde value={markdownValue} onChange={onChange}/>
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
                    <Box sx={{ p: 3 }}>
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

CreateKnowledgeDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    knowledgeId: PropTypes.number.isRequired
};

export default CreateKnowledgeDialog;