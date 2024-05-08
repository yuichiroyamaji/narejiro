import { useState, useEffect, useMemo, ChangeEvent, DragEvent } from 'react';
import { useUserContext } from 'src/contexts/UserContext';
import { graphqlApiCall, graphqlApiResult } from 'src/graphql/apicall';
import { createUserData } from 'src/graphql/mutations';
import SuccessDialog from '../../SuccessDialog';
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
    cognitoUserId: string;
    email: string;
}

function ConfirmSignUpDialog({ open, onClose, cognitoUserId, email }: SignUpProps) {
    const [usernameForApiParam, setUsernameForApiParam] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [confirmSignUpErr, setConfirmSignUpErr] = useState('');
    const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        const [namePart] = email.split('@');
        setUsernameForApiParam(namePart);
    }, [open]);

    const callApiCreateUserData = async() => {
      const res: any = await graphqlApiCall(createUserData(cognitoUserId, email, usernameForApiParam));
      const result: boolean = graphqlApiResult(res.createNarejiroDevTable);
    };

    const handleConfirmationCodeChange = (e) => {
      setConfirmationCode(e.target.value);
    };

    const handleClose = () => {
        setConfirmSignUpErr('');
        onClose();
    };

    const handleSuccessDialogClose = (): void => {
        setSuccessDialogOpen(false);
        handleClose();
    };

    type ConfirmSignUpInput = {
      username: string;
      confirmationCode: string;
    };

    const handleSignUpConfirmation = async ({
      username,
      confirmationCode
    }: ConfirmSignUpInput) => {
        console.log('handleSignUpConfirmation()');
      try {
        console.log('[CALLING API] Cognito SignUpConfirm');
        const { isSignUpComplete, nextStep } = await confirmSignUp({
          username,
          confirmationCode
        });
        console.log(isSignUpComplete);
        console.log(nextStep);
        if(isSignUpComplete){
            callApiCreateUserData();
            setConfirmSignUpErr('');
            setSuccessDialogOpen(true);
        }else{
            throw new Error("isSignUpComplete is not true");
        };
      } catch (error) {
        console.log('[API ERROR] Error messages returned from API');
        console.log(error);
        let errMsg = "";
        switch (error.name) {
            case 'UserAlreadyAuthenticatedException':
                errMsg = "※対象のアカウントはすでにサインインされています。";
                break;
            default:
                errMsg = "※処理中にエラーが発生しました。システム管理者にお問い合わせください。[ERROR] " + error.message.toString();
                break;
        };
        console.log('[API ERROR] Error messages converted for users');
        console.log(errMsg);
        setConfirmSignUpErr(errMsg);
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
                            <Avatar sx={{ bgcolor: teal[400], mb: "30px", width: 55, height: 55 }}>
                            <LockOutlinedIcon sx={{ fontSize: 35 }} />
                            </Avatar>
                            <Box sx={{ mb: "30px" }}>
                                <Typography component="span" sx={{ fontSize: "1.5em", fontWeight: "bold" }}>
                                    確認コード入力
                                </Typography>
                            </Box>
                            <Box sx={{ mb: "30px", fontSize: "1.1em" }}>
                                メールアドレスに送信された確認コードを入力してください。
                                （見つからない場合は迷惑メールフォルダもご確認ください）
                            </Box>
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
                                {confirmSignUpErr};
                            </Box>
                        )}
                        <Box mt={3}>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                onClick={() => handleSignUpConfirmation({username: cognitoUserId, confirmationCode: confirmationCode})}
                                fullWidth
                            >
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
            <SuccessDialog
                open={successDialogOpen}
                onClose={handleSuccessDialogClose}
                source="SignUp"
            />
        </>
    );
  };

export default ConfirmSignUpDialog;
  