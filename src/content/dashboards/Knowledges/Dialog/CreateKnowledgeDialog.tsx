import { useState, useEffect } from 'react';
import {
    Box, Grid, Stack, Button, useTheme,
    FormControl, InputLabel, InputAdornment, OutlinedInput, TextField, MenuItem, IconButton, CloseIcon,
    Dialog, DialogTitle, DialogContent, DialogActions,
    SimpleMde, markdownit, DOMPurify,
    CreateCategoryDialog
} from '../index';
import 'easymde/dist/easymde.min.css';

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
    open: boolean;
    onClose: (value: boolean) => void;
};

const CreateKnowledgeDialog = ({ open, onClose }: CreateKnowledgeDialogProps) => {

    const [createCatOpen, setCreateCatOpen] = useState<boolean>(false);
    const [markdownValue, setMarkdownValue] = useState<string>(DEFAULT_TEXT.join('\n'));
    const [cat1, setCat1] = useState<number>(0);
    const [cat2, setCat2] = useState<number>(0);
    const [cat3, setCat3] = useState<number>(0);

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

    const theme = useTheme();

    const handleClose = () => {
        onClose(false);
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
  
    const handleMarkdownValueChange = (value: string) => {
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
                                        id="createKnowledgeCat1"
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
                                        id="createKnowledgeCat2"
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
                                        id="createKnowledgeCat3"
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
                                        size="small"
                                        variant="contained"
                                        sx={{mt: 3, ml: 1 }}
                                        onClick={() => handleCreateCatOpen()}
                                    >
                                        Create カテゴリー
                                    </Button>
                                </Box>
                                <Box>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">タイトル</InputLabel>
                                        <OutlinedInput
                                            id="createKnowledgeTitle"
                                            startAdornment={<InputAdornment position="start">Markdownの記述方法について</InputAdornment>}
                                            label="タイトル"
                                        />
                                    </FormControl>
                                </Box>
                                <Box sx={{ mt: 1, mb: 1, ml: 1 }}>
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
                                    <SimpleMde value={markdownValue} onChange={handleMarkdownValueChange}/>
                                </Box>
                            </Box>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                        <Button variant="outlined" onClick={handleClose} autoFocus>Create</Button>
                    </DialogActions>
                </Grid>
                <Grid item xs={6} sx={{pl: 3, pt: 1, pr: 1, pb: 1, borderLeft: 1, borderColor: "#ccc" }}>
                    <Box sx={{ height: 760, overflowY: "scroll" }}>
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

export default CreateKnowledgeDialog;