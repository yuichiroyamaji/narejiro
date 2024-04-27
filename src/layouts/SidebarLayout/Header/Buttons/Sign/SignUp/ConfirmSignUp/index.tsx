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
    Dialog
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { teal } from "@mui/material/colors";
import { confirmSignUp, type ConfirmSignUpInput } from 'aws-amplify/auth';

interface SignUpProps {
    open: boolean;
    onClose: () => void;
    username: string;
}

function ConfirmSignUpDialog({ open, onClose, username }: SignUpProps) {
    const {isSignedIn, setIsSignedIn} = useUserContext();
    const [confirmationCode, setConfirmationCode] = useState('');
    const [confirmSignUpErr, setConfirmSignUpErr] = useState('');

    const handleConfirmationCodeChange = (e) => {
      setConfirmationCode(e.target.value);
    };

    const handleClose = () => {
        setConfirmSignUpErr('');
        onClose();
    };

    type ConfirmSignUpInput = {
      username: string;
      confirmationCode: string;
    };

    const handleSignUpConfirmation = async ({
      username,
      confirmationCode
    }: ConfirmSignUpInput) => {
      try {
        const { isSignUpComplete, nextStep } = await confirmSignUp({
          username,
          confirmationCode
        });
        setIsSignedIn(true);
      } catch (error) {
        console.log('error confirming sign up', error);
        setConfirmSignUpErr(error.message);
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
                <Grid>
                    <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                    }}
                    >
                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Avatar sx={{ bgcolor: teal[400] }}>
                            <LockOutlinedIcon />
                            </Avatar>
                            <Typography variant={"h5"} sx={{ mb: "30px", fontSize: "1.5em" }}>
                                確認コードを入力
                            </Typography>
                        </Grid>
                        <TextField
                            label="Confirmation Code"
                            variant="standard"
                            sx={{ mb: "3%" }}
                            value={confirmationCode}
                            onChange={handleConfirmationCodeChange}
                            fullWidth
                            required />
                        {confirmSignUpErr && (
                            <Box sx={{ mt: "3%", color: "red" }} >
                                ※処理中にエラーが発生しました。システム管理者にお問い合わせください。[ERROR] {confirmSignUpErr.toString()}
                            </Box>
                        )}
                        <Box mt={3}>
                            {/* <Button type="submit" color="primary" variant="contained" onClick={handleOnClick} fullWidth> */}                        
                            {/* <Button color="primary" onClick={() => handleSignIn({username: '1764fac8-9041-70bb-b79c-2087183f8394', password: '12345678'})}> */}
                            <Button type="submit" color="primary" variant="contained" onClick={() => handleSignUpConfirmation({username, confirmationCode})} fullWidth>
                            確認コード送信
                            </Button>
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
                    </Paper>
                </Grid>
            </Dialog>
        </>
    );
  };

export default ConfirmSignUpDialog;
  