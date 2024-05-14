// import { useState, useEffect } from 'react';
import {
    Button,
    Box,
    Grid,
    Typography,
    Dialog,
    DialogActions,
    IconButton,
    Card,
    CardMedia
} from "@mui/material";
import {APP_NAME} from 'src/common/constants';
import CloseIcon from "@mui/icons-material/Close";

interface NowDevelopingDialogProps {
    open: boolean;
    onClose: () => void;
}

function NowDevelopingDialog({ open, onClose }: NowDevelopingDialogProps) {

    const handleClose = () => {
        onClose();
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
                        <Box sx={{ mb: "30px" }}>
                            <img src='/static/images/avatars/kojichu.png' style={{ width: 90 }}></img>
                        </Box>
                        <Box sx={{ mb: "30px" }}>
                            <Typography component="span" sx={{ fontSize: "1.5em", fontWeight: "bold" }}>
                                只今、開発中
                            </Typography>
                        </Box>
                        <Box sx={{ mb: "10px", fontSize: "1.1em" }}>
                            機能公開までしばらくお待ちください。
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
                    <Button variant="contained" onClick={handleClose} sx={{ mr: 1.5, mb: 1.5 }} autoFocus>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    );
  };

export default NowDevelopingDialog;
  