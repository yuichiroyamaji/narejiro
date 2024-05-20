import { useState, useEffect } from 'react';
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
import { teal } from "@mui/material/colors";
import {APP_NAME} from 'src/common/constants';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from "@mui/icons-material/Close";

interface SuccessDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

function SuccessDialog({ open, onClose, title, message }: SuccessDialogProps) {

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
                            <img src='/static/images/avatars/6.png' style={{ width: 110, height: 110 }}></img>
                        </Box>
                        {/* <Card>
                            <CardMedia
                                component="img"
                                alt="Description of the image"
                                width="50"
                                image="/static/images/avatars/6.png"
                                sx={{ mb: "30px" }}
                            />
                        </Card> */}
                        <CheckCircleIcon 
                            color="success"
                            sx={{ 
                                fontSize: 50,
                                color: teal[400],
                                position: 'absolute',
                                right: 150,
                                top: 30
                            }}
                        />
                        <Box sx={{ mb: "30px" }}>
                            <Typography component="span" sx={{ fontSize: "1.5em", fontWeight: "bold" }}>
                                {title}
                            </Typography>
                        </Box>
                        <Box sx={{ mb: "10px", fontSize: "1.1em" }}>
                            {message}
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

export default SuccessDialog;
  