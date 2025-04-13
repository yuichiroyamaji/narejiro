import { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box, Menu, IconButton, Button, ListItemText, ListItem, List, Typography
} from '@mui/material';
import { DeleteTwoToneIcon, MoreVertTwoToneIcon } from './index';
import NowDevelopingDialog from 'src/content/pages/Status/NowDeveloping';

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

function BulkActions() {
  const [onMenuOpen, menuOpen] = useState<boolean>(false);
  const moreRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [nowDevelopingDialogOpen, setnowDevelopingDialogOpen] = useState<boolean>(false);

  const openMenu = (): void => {
    menuOpen(true);
  };

  const closeMenu = (): void => {
    menuOpen(false);
  };

  const handleOpen = (): void => {
    setOpen(true);
    setnowDevelopingDialogOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
    setnowDevelopingDialogOpen(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            Bulk actions:
          </Typography>
          <ButtonError
            sx={{ ml: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
            onClick={handleOpen}
          >
            Delete
          </ButtonError>
        </Box>
        <IconButton
          color="primary"
          onClick={openMenu}
          ref={moreRef}
          sx={{ ml: 2, p: 1 }}
        >
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>

      <Menu
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        <List sx={{ p: 1 }} component="nav">
          <ListItem button>
            <ListItemText primary="Bulk delete selected" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Bulk edit selected" />
          </ListItem>
        </List>
      </Menu>
      <NowDevelopingDialog
        open={nowDevelopingDialogOpen}
        onClose={handleClose}
      />
    </>
  );
}

export default BulkActions;
