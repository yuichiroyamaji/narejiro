import { useState, useEffect, ChangeEvent, DragEvent } from 'react';
import {
    DEFAULT_TEXT, Box, Grid, Stack, Button, useTheme, FormControl, InputLabel, InputAdornment, OutlinedInput, 
    TextField, MenuItem, IconButton, CloseIcon, Dialog, DialogTitle, DialogContent, DialogActions,
    SimpleMde, markdownit, DOMPurify, CreateCategoryDialog, FullscreenIcon, FullscreenExitIcon
} from '../index';
import 'easymde/dist/easymde.min.css';

interface CreateKnowledgeDialogProps {
    open: boolean;
    onClose: (value: boolean) => void;
}

function CreateKnowledgeDialog ({ open, onClose }: CreateKnowledgeDialogProps) {

    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [createCatOpen, setCreateCatOpen] = useState<boolean>(false);
    const [textFieldValue, setTextFieldValue] = useState<String>(DEFAULT_TEXT.join('\n'));
    const [markdownValue, setMarkdownValue] = useState<string>(DEFAULT_TEXT.join('\n'));
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isDragActive, setIsDragActive] = useState<boolean>(false);
    const [cat1, setCat1] = useState<number>(0);
    const [cat2, setCat2] = useState<number>(0);
    const [cat3, setCat3] = useState<number>(0);
    const theme = useTheme();

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

    useEffect(() => {
        const handleResize = () => { setWindowHeight(window.innerHeight); };
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize); };
    }, []);

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
    };

    const handleKnowledgeContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextFieldValue(event.target.value);
        setMarkdownValue(event.target.value);
    };

    const handleFullScreenToggle = () => {
        setIsFullScreen(!isFullScreen);
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
                                            id="createKnowledgeTitle"
                                            startAdornment={<InputAdornment position="start">Markdownの記述方法について</InputAdornment>}
                                            label="タイトル"
                                        />
                                    </FormControl>
                                </Box>
                                {/* <Box sx={{ mt: 1, mb: 1, ml: 1 }}>
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
                                </Box> */}
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
                                        value={textFieldValue}
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
                        <Button variant="contained" onClick={handleClose} autoFocus>Create</Button>
                    </DialogActions>
                </Grid>
                {/* <Grid item xs={6} sx={{pl: 3, pt: 1, pr: 1, pb: 1, borderLeft: 1, borderColor: "#ccc" }}>
                    <Box sx={{ height: 760, overflowY: "scroll" }}>
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(markdownit().render(markdownValue))}}></div>
                    </Box>
                </Grid> */}
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
            />
        </Dialog>
    );
}

export default CreateKnowledgeDialog;