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

function DisplayKnowledgeDialog(props) {
    const { onClose, knowledgeId, open } = props;
    const [markdownValue, setMarkdownValue] = useState<string>("###  ShopifyのAPI呼出し回数制限 ```Shopify: 4/sec | ShopifyPlus: 20/sec```  ");
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
  
    const onChange = (value: string) => {
      setMarkdownValue(value);
    };
  
    useEffect(() => {
      const preview = document.getElementById('preview');
      if (preview) {
        preview.innerHTML = DOMPurify.sanitize(markdownit().render(markdownValue));
      }
    }, [markdownValue]);

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            onClose={handleClose} 
            open={open}
        >
            <Grid container>
                <Grid item style={{display: 'none'}}>
                    <Box>
                        <SimpleMde value={markdownValue} onChange={onChange}/>
                    </Box>
                </Grid>
                <Grid item sx={{borderLeft: 1, borderColor: "#ccc"}}>
                    <FormControl fullWidth sx={{ p: 3 }}>
                        <Box dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(markdownit().render(markdownValue))}}></Box>
                    </FormControl>
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