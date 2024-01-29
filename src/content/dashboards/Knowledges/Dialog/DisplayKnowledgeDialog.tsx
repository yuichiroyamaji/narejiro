import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SimpleMde from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import markdownit from 'markdown-it';
import DOMPurify from 'dompurify';

import {
  Box,
  Grid,
  useTheme
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';

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

function DisplayKnowledgeDialog(props) {
    const { onClose, knowledgeId, open } = props;
    const [markdownValue, setMarkdownValue] = useState<string>(DEFAULT_TEXT.join('\n'));
    const theme = useTheme();

    const handleClose = () => {
        onClose(knowledgeId);
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
                    <Box sx={{ m: 3, height: 760, overflowY: "scroll", width: "100%" }}>
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(markdownit().render(markdownValue))}}></div>
                    </Box>
                </Grid>
            </Grid>
        </Dialog>
    );
}

DisplayKnowledgeDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    knowledgeId: PropTypes.number.isRequired
};

export default DisplayKnowledgeDialog;