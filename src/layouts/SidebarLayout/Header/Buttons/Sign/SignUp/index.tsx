import { useState, useEffect, useMemo, ChangeEvent, DragEvent } from 'react';
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
import { signUp } from 'aws-amplify/auth';
import { confirmSignUp, type ConfirmSignUpInput } from 'aws-amplify/auth';
import ConfirmSignUpDialog from './ConfirmSignUp';
import {APP_NAME} from 'src/common/constants';

interface SignUpProps {
    open: boolean;
    onClose: () => void;
}

function SignUpDialog({ open, onClose }: SignUpProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [signUpErr, setSignUpErr] = useState('');
    const [cognitoUserId, setCognitoUserId] = useState('');
    const [confirmSignUpOpen, setConfirmSignUpOpen] = useState<boolean>(false);

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
      // CognitoにてEmailをユーザ名として認証しているため、Emailをユーザ名にセット
      setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleClose = () => {
      setSignUpErr('');
      onClose();
    };

    const handleConfirmSignUpClose = (): void => {
      setConfirmSignUpOpen(false);
      handleClose();
    };

    type SignUpParameters = {
      username: string;
      password: string;
      email: string;
    };
  
    const handleSignUp = async ({
      username,
      password,
      email,
    }: SignUpParameters) => {
      console.log('【START】handleSignUp()');
      try {
        console.log('[CALLING API] Cognito SignUp');
        const { isSignUpComplete, userId, nextStep } = await signUp({
          username,
          password,
          options: {
            userAttributes: {
              email,
            },
            autoSignIn: false // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
          }
        });
        console.log(isSignUpComplete);
        console.log(userId);
        console.log(nextStep);
        console.log('[API SUCCESS] API returned response successfully');
        setConfirmSignUpOpen(true);
        setCognitoUserId(userId);
      } catch (error) {
        console.log('[API ERROR] Error messages returned from API');
        console.log(error);
        let errMsg = "";
        switch (error.name) {
            case 'EmptySignUpUsername':
                errMsg = "※メールアドレスが入力されていません。";
                break;
            case 'EmptySignUpPassword':
                errMsg = "※パスワードが入力されていません。";
                break;
            case 'UsernameExistsException':
                errMsg = "※入力されたメールアドレスは既に登録されています";
                break;
            default:
                errMsg = "※処理中にエラーが発生しました。システム管理者にお問い合わせください。[ERROR] " + error.message.toString();
                break;
        };
        console.log('[API ERROR] Error messages converted for users');
        console.log(errMsg);
        setSignUpErr(errMsg);
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
                            <Avatar sx={{ bgcolor: teal[400], mb: "30px" }}>
                            <LockOutlinedIcon />
                            </Avatar>
                            <Box sx={{ mb: "30px" }}>
                                <Typography color="primary" component="span" sx={{ fontSize: "1.5em", fontWeight: "bold", mr: "5px" }}>
                                    {APP_NAME}
                                </Typography>
                                <Typography component="span" sx={{ fontSize: "1.5em", fontWeight: "bold" }}>
                                    にサインアップ
                                </Typography>
                            </Box>
                            <Box sx={{ mb: "20px", fontSize: "1.1em" }}>
                                {APP_NAME}にアカウントを作成します。登録するEメールアドレスとパスワードを入力してください。
                            </Box>
                        </Grid>
                        <TextField
                            label="Eメールアドレス"
                            variant="standard"
                            sx={{ mb: "3%" }}
                            value={email}
                            onChange={handleEmailChange}
                            fullWidth
                            required />
                        <TextField
                            type="password"
                            label="パスワード"
                            variant="standard"
                            sx={{ mb: "3%" }}
                            value={password}
                            onChange={handlePasswordChange}
                            fullWidth
                            required />
                        {signUpErr && (
                            <Box sx={{ mt: "3%", color: "red" }} >
                                {signUpErr}
                            </Box>
                        )}
                        <Box mt={3}>
                            {/* <Button type="submit" color="primary" variant="contained" onClick={handleOnClick} fullWidth> */}                        
                            {/* <Button color="primary" onClick={() => handleSignIn({username: '1764fac8-9041-70bb-b79c-2087183f8394', password: '12345678'})}> */}
                            <Button type="submit" color="primary" variant="contained" onClick={() => handleSignUp({username, password, email})} fullWidth>
                            サインアップ
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
                        {/* <IconButton
                        aria-label="close"
                        onClick={() => setConfirmSignUpOpen(true)}
                        sx={{
                            position: 'absolute',
                            right: 20,
                            top: 8,
                            color: "red",
                        }}
                        >
                            <CloseIcon />
                        </IconButton> */}
                    </Paper>
                </Grid>
            </Dialog>
            <ConfirmSignUpDialog
                open={confirmSignUpOpen}
                onClose={handleConfirmSignUpClose}
                cognitoUserId={cognitoUserId}
                email={email}
            />
        </>
    );
  };

export default SignUpDialog;
  