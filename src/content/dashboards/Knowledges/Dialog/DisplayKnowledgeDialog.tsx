import { useState, useEffect } from 'react';
import { Box, Grid, useTheme, IconButton, CloseIcon, Dialog, markdownit, DOMPurify } from '../index';

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

type DisplayKnowledgeDialogProps = {
  open: boolean;
  onClose: () => void;
  knowledgeId: number;
};

const DisplayKnowledgeDialog = ({ open, onClose, knowledgeId }: DisplayKnowledgeDialogProps) => {

    const [markdownValue, setMarkdownValue] = useState<string>(DEFAULT_TEXT.join('\n'));
    const theme = useTheme();

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            onClose={handleClose} 
            open={open}
        >
            <Grid container>
                <Grid item>
                    <Box sx={{ m: 3, width: "100%" }}>
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
        </Dialog>
    );
}

export default DisplayKnowledgeDialog;