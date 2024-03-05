export type { KnowledgeData, KnowledgeDataStatus } from 'src/models/knowledges';
export { KnowledgeDataDefault } from 'src/models/knowledges';
export {graphqlApiCall, graphqlApiResult} from 'src/graphql/apicall';
export {listKnowledgeDatas, listCat1s} from 'src/graphql/queries';
export {deleteKnowledgeData} from 'src/graphql/mutations';

export {API_URL, API_KEY, DEFAULT_TEXT} from 'src/common/constants';

export {default as PropTypes} from 'prop-types';
export {default as SimpleMde} from 'react-simplemde-editor';
export {default as markdownit} from 'markdown-it';
export {default as DOMPurify} from 'dompurify';
export {default as axios} from 'axios';
export {default as BulkActions} from './BulkActions';
export {default as Label} from 'src/components/Label';

export {default as RecentKnowledgesTable} from './RecentKnowledgesTable';
export {default as CreateKnowledgeDialog} from './Dialog/CreateKnowledgeDialog';
export {default as EditKnowledgeDialog} from './Dialog/EditKnowledgeDialog';
export {default as DeleteKnowledgeDialog} from './Dialog/DeleteKnowledgeDialog';
export {default as DisplayKnowledgeDialog} from './Dialog/DisplayKnowledgeDialog';
export {default as CreateCategoryDialog} from './Dialog/CreateCategoryDialog';

export {Box, Grid, Card, Stack, Button, Tooltip, Divider, FormControl, InputLabel, Checkbox, IconButton,
  Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableContainer,
  Menu, ListItemText, ListItem, List, Select, MenuItem, Typography, useTheme, CardHeader,} from '@mui/material';
export {default as InputAdornment} from '@mui/material/InputAdornment';
export {default as OutlinedInput} from '@mui/material/OutlinedInput';
export {default as TextField} from '@mui/material/TextField';
export {default as CloseIcon} from '@mui/icons-material/Close';
export {default as AddTwoToneIcon} from '@mui/icons-material/AddTwoTone';

export {default as DialogTitle} from '@mui/material/DialogTitle';
export {default as Dialog} from '@mui/material/Dialog';
export {default as DialogContent} from '@mui/material/DialogContent';
export {default as DialogContentText} from '@mui/material/DialogContentText';
export {default as DialogActions} from '@mui/material/DialogActions';

export {default as EditTwoToneIcon} from '@mui/icons-material/EditTwoTone';
export {default as DeleteTwoToneIcon} from '@mui/icons-material/DeleteTwoTone';
export {default as MoreVertTwoToneIcon} from '@mui/icons-material/MoreVertTwoTone';

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
