import { useRef, useState } from 'react';
import { useUserContext } from 'src/contexts/UserContext';

import { NavLink } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';

import { signOut } from 'aws-amplify/auth';
import SignOutDialog from 'src/layouts/SidebarLayout/Header/Buttons/Sign/SignOut';
import NowDevelopingDialog from 'src/content/pages/Status/NowDeveloping';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const {appUsername, setAppUsername} = useUserContext();
  const {isSignedIn, setIsSignedIn} = useUserContext();
  const [nowDevelopingDialogOpen, setnowDevelopingDialogOpen] = useState<boolean>(false);
  const [signOutOpen, setSignOutOpen] = useState<boolean>(false);

  const user = {
    name: appUsername,
    avatar: '/static/images/avatars/user_icon.png',
    jobtitle: ''
  };

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleSignOutOpen = (): void => {
    setSignOutOpen(true);
  };

  const handleSignOutClose = (): void => {
    setSignOutOpen(false);
  };

  const handleNowDevelopingOpen = (): void => {
    setnowDevelopingDialogOpen(true);
  };

  const handleNowDevelopingClose = (): void => {
    setnowDevelopingDialogOpen(false);
  };

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={user.name} src={user.avatar} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          {isSignedIn ? (<ExpandMoreTwoToneIcon sx={{ ml: 1 }} /> ) : null }
        </Hidden>
      </UserBoxButton>
      {isSignedIn ? (
        <Popover
          anchorEl={ref.current}
          onClose={handleClose}
          open={isOpen}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuUserBox sx={{ minWidth: 210 }} display="flex">
            <Avatar variant="rounded" alt={user.name} src={user.avatar} />
            <UserBoxText>
              <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
              <UserBoxDescription variant="body2">
                {user.jobtitle}
              </UserBoxDescription>
            </UserBoxText>
          </MenuUserBox>
          <Divider sx={{ mb: 0 }} />
          <List sx={{ p: 1 }} component="nav">
            {/* <ListItem button to="/management/profile/details" component={NavLink}> */}
            <ListItem button onClick={handleNowDevelopingOpen}>
              <AccountBoxTwoToneIcon fontSize="small" />
              <ListItemText primary="My Profile" />
            </ListItem>
            {/* <ListItem button to="/dashboards/messenger" component={NavLink}> */}
            <ListItem button onClick={handleNowDevelopingOpen}>
              <InboxTwoToneIcon fontSize="small" />
              <ListItemText primary="Messenger" />
            </ListItem>
            {/* <ListItem
              button
              to="/management/profile/settings"
              component={NavLink}
              onClick={handleNowDevelopingOpen}
            > */}
            <ListItem button onClick={handleNowDevelopingOpen}>
              <AccountTreeTwoToneIcon fontSize="small" />
              <ListItemText primary="Account Settings" />
            </ListItem>
          </List>
          <Divider />
            <Box sx={{ m: 1 }}>
              <Button color="primary" fullWidth onClick={handleSignOutOpen}>
                <LockOpenTwoToneIcon sx={{ mr: 1 }} />
                Sign out
              </Button>
            </Box>
        </Popover>
      ) : null}
      <SignOutDialog
        open={signOutOpen}
        onClose={handleSignOutClose}
      />
      <NowDevelopingDialog
        open={nowDevelopingDialogOpen}
        onClose={handleNowDevelopingClose}
      />
    </>
  );
}

export default HeaderUserbox;
