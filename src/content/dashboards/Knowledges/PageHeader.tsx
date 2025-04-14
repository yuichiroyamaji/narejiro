import { useState, useEffect } from 'react';
import { useUserContext } from 'src/contexts/UserContext';
import { Grid, Button, AddTwoToneIcon, Typography, CreateKnowledgeDialog, SignInDialog } from './index';

const PageHeader = () => {

  const {isSignedIn, setIsSignedIn} = useUserContext();

  const [createOpen, setCreateOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState<boolean>(false);

  const handleClickCreateOpen = () => {
    if(isSignedIn) {
      setCreateOpen(true);
    }else{
      setSignInOpen(true);
    };
  };

  const handleClose = () => {
    setCreateOpen(false);
    setSignInOpen(false);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          なれじろうWEB
        </Typography>
        <Typography variant="subtitle2">
          {/* {user.name}, these are your recent knowledges */}
          社内なれっじ共有ツール
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
      <SignInDialog
        open={signInOpen}
        onClose={handleClose}
      />
    </Grid>
  );
}

export default PageHeader;
