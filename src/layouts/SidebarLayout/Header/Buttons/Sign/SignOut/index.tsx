import { useState, useEffect, useMemo, ChangeEvent, DragEvent } from 'react';
import { useUserContext } from 'src/contexts/UserContext';
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

interface SignOutProps {
    open: boolean;
    onClose: () => void;
}

function SignOut({ open, onClose }: SignOutProps) {

    const handleClose = () => {
        onClose();
    };

    return (
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
                <Avatar sx={{ bgcolor: teal[400] }}>
                <LockOpenTwoToneIcon />
                </Avatar>
                <Typography variant={"h5"} sx={{ mb: "30px" }}>
                Sign Out
                </Typography>
            </Grid>
            <Box mt={3}>
                サインアウトしました。
            </Box>
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
            <Button variant="contained" onClick={handleClose} autoFocus>OK</Button>
        </DialogActions>
        </Dialog>
    );
  };

export default SignOut;
  