import { useState, useEffect } from 'react';
import { Grid, Button, AddTwoToneIcon, Typography, CreateKnowledgeDialog } from './index';

const PageHeader = () => {

  const [createOpen, setCreateOpen] = useState(false);

  const handleClickCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleClose = (value) => {
    setCreateOpen(false);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          なれじろうWEB版
        </Typography>
        <Typography variant="subtitle2">
          {/* {user.name}, these are your recent knowledges */}
          ECHub OMSに関する知見を中心としたなれっじ共有ツール
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => handleClickCreateOpen()}
        >
          Create なれっじ
        </Button>
        <CreateKnowledgeDialog
          open={createOpen}
          onClose={handleClose}
        />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
