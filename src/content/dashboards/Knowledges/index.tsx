export {default as CreateKnowledgeDialog} from './Dialog/CreateKnowledgeDialog'
export {default as EditKnowledgeDialog} from './Dialog/EditKnowledgeDialog'
export {default as DeleteKnowledgeDialog} from './Dialog/DeleteKnowledgeDialog'
export {default as DisplayKnowledgeDialog} from './Dialog/DisplayKnowledgeDialog'
export {default as CreateCategoryDialog} from './Dialog/CreateCategoryDialog'

export {Box, Grid, Stack, Button, useTheme} from '@mui/material';

export {default as FormControl} from '@mui/material/FormControl';
export {default as InputLabel} from '@mui/material/InputLabel';
export {default as InputAdornment} from '@mui/material/InputAdornment';
export {default as OutlinedInput} from '@mui/material/OutlinedInput';
export {default as TextField} from '@mui/material/TextField';
export {default as Typography} from '@mui/material/Typography';
export {default as MenuItem} from '@mui/material/MenuItem';
export {default as IconButton} from '@mui/material/IconButton';
export {default as CloseIcon} from '@mui/icons-material/Close';
export {default as AddTwoToneIcon} from '@mui/icons-material/AddTwoTone';

export {default as DialogTitle} from '@mui/material/DialogTitle';
export {default as Dialog} from '@mui/material/Dialog';
export {default as DialogContent} from '@mui/material/DialogContent';
export {default as DialogContentText} from '@mui/material/DialogContentText';
export {default as DialogActions} from '@mui/material/DialogActions';

export {default as SimpleMde} from 'react-simplemde-editor';
export {default as markdownit} from 'markdown-it';
export {default as DOMPurify} from 'dompurify';

import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import RecentKnowledges from './RecentKnowledges';

function DashboardKnowledges() {
  return (
    <>
      <Helmet>
        <title>Knowledges Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentKnowledges />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardKnowledges;
