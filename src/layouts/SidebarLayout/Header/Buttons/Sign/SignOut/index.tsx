import { useState, useEffect, useMemo, ChangeEvent, DragEvent } from 'react';
import { useUserContext } from 'src/contexts/UserContext';
import { signOut } from 'aws-amplify/auth';
import SuccessDialog from '../SuccessDialog';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    Stack,
    TextField,
    Typography,
    IconButton,
    Dialog,
    DialogActions
} from "@mui/material";
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { teal } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import {APP_NAME} from 'src/common/constants';

interface SignOutProps {
    open: boolean;
    onClose: () => void;
}

function SignOutDialog({ open, onClose }: SignOutProps) {
    const {isSignedIn, setIsSignedIn} = useUserContext();
    const {appUsername, setAppUsername} = useUserContext();
    const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);

    const handleClose = () => {
        onClose();
    };
  
    const handleSuccessDialogClose = (): void => {
        setSuccessDialogOpen(false);
        handleClose();
    };

    const handleSignOutSuccessOpen = () => {
        handleSignOut();
        setSuccessDialogOpen(true);
    };

    const handleSignOut = async () => {
      try {
        await signOut();
        setIsSignedIn(false);
        setAppUsername('GuestUser');
      } catch (error) {
        console.log('error signing out: ', error);
      }
    };

    return (
        <>
            <Dialog
                fullWidth
                maxWidth="xs"
                onClose={handleClose} 
                open={open}
            >
                <Grid sx={{ p: 4 }}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Avatar sx={{ bgcolor: teal[400], mb: "30px", width: 55, height: 55 }}>
                        <LockOpenTwoToneIcon sx={{ fontSize: 35 }} />
                        </Avatar>
                        <Box sx={{ mb: "30px" }}>
                            <Typography color="primary" component="span" sx={{ fontSize: "1.5em", fontWeight: "bold", mr: "5px" }}>
                                {APP_NAME}
                            </Typography>
                            <Typography component="span" sx={{ fontSize: "1.5em", fontWeight: "bold" }}>
                                からサインアウト
                            </Typography>
                        </Box>
                        <Box sx={{ fontSize: "1.1em" }}>
                            {APP_NAME}からサインアウトします。よろしいですか？
                        </Box>
                    </Grid>
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
                </Grid>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} sx={{ mb: 1.5 }} autoFocus>Cancel</Button>
                    <Button variant="contained" onClick={handleSignOutSuccessOpen} sx={{ mr: 1.5, mb: 1.5 }} autoFocus>OK</Button>
                </DialogActions>
            </Dialog>
            <SuccessDialog 
                open={successDialogOpen}
                onClose={handleSuccessDialogClose}
                source="SignOut"
            />
        </>
    );
  };

export default SignOutDialog;
  