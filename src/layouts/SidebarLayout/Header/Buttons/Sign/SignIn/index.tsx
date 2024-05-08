import { useState, useEffect, useMemo, ChangeEvent, DragEvent } from 'react';
import { useUserContext } from 'src/contexts/UserContext';
import SuccessDialog from '../SuccessDialog';
import SignUpDialog from '../SignUp';
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
import { signIn, type SignInInput } from 'aws-amplify/auth';
import {APP_NAME} from 'src/common/constants';
import { graphqlApiCall, graphqlApiResult } from 'src/graphql/apicall';
import { getUserDataByEmail } from 'src/graphql/queries';
import { string } from 'prop-types';

interface SignInProps {
    open: boolean;
    onClose: () => void;
}

function SignInDialog({ open, onClose }: SignInProps) {
    const {isSignedIn, setIsSignedIn} = useUserContext();
    const {appUsername, setAppUsername} = useUserContext();
    const [localAppUsername, setLocalAppUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [signInErr, setSignInErr] = useState<string>('');
    const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
    const [signUpOpen, setSignUpOpen] = useState<boolean>(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };  

    const handleClose = () => {
        setSignInErr('');
        onClose();
    };
  
    const handleSuccessDialogClose = (): void => {
        setSuccessDialogOpen(false);
        handleClose();
    };

    const handleSignUpOpen = (): void => {
        setSignUpOpen(true);
    };
  
    const handleSignUpClose = (): void => {
        setSignUpOpen(false);
    };

    type FormInputType = {
        email: string,
        password: string
    };

    const handleSignIn = async ({ email, password }: FormInputType) => {
        console.log('【START】handleSignIn()');
        const res: any = await callApiGetUserDataByEmail(email);
        const username = res.cognitoUserId;
        await congnitoSignIn({username, password});
        await setAppUsername(res.userName);
        console.log('【END】handleSignIn()');
    };

    const callApiGetUserDataByEmail = async(email: string) => {
        console.log('【START】callApiGetUserDataByEmail()');
        const res: any = await graphqlApiCall(getUserDataByEmail(email));
        const result: boolean = await graphqlApiResult(res);
        console.log('【END】callApiGetUserDataByEmail()');
        return res.getUserDataByEmail;
    };

    const congnitoSignIn = async ({ username, password }: SignInInput) => {
      console.log('【START】congnitoSignIn()');
      try {
        console.log('[CALLING API] Cognito SignIn');
        const { isSignedIn, nextStep } = await signIn({ username, password });
        console.log(isSignedIn);
        console.log(nextStep);
        console.log('[API SUCCESS] API returned response successfully');
        if(isSignedIn){
            setSignInErr('');
            setIsSignedIn(true);
            setSuccessDialogOpen(true);
            console.log("appUsername: " + appUsername);
        }else{
            throw new Error("isSignedIn is not true");
        };
      } catch (error) {
        console.log('[API ERROR] Error messages returned from API');
        console.log(error);
        let errMsg = "";
        switch (error.name) {
            case 'EmptySignInUsername':
                errMsg = "※メールアドレスが入力されていません。";
                break;
            case 'EmptySignInPassword':
                errMsg = "※パスワードが入力されていません。";
                break;
            case 'UserNotFoundException':
                errMsg = "※入力されたメールアドレスのアカウントは存在しません。";
                break;
            case 'NotAuthorizedException':
                errMsg = "※パスワードが間違っています。再度ご確認ください。";
                break;
            case 'UserAlreadyAuthenticatedException':
                errMsg = "※対象のアカウントはすでにサインインされています。";
                break;
            default:
                errMsg = "※処理中にエラーが発生しました。システム管理者にお問い合わせください。[ERROR] " + error.message.toString();
                break;
        };
        console.log('[API ERROR] Error messages converted for users');
        console.log(errMsg);
        setSignInErr(errMsg);
      }
      console.log('【END】congnitoSignIn()');
    }

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
                                <Typography color="primary" component="span" sx={{ fontSize: "1.5em", fontWeight: "bold", mr: "5px" }}>
                                    {APP_NAME}
                                </Typography>
                                <Typography component="span" sx={{ fontSize: "1.5em", fontWeight: "bold" }}>
                                    にサインイン
                                </Typography>
                            </Box>
                            <Box sx={{ mb: "30px", fontSize: "1.1em" }}>
                                {APP_NAME}のご利用ありがとうございます！
                                投稿者管理のため、なれっじの投稿･更新にはサインインをお願いしています。
                            </Box>
                        </Grid>
                        <TextField
                            type="email"
                            label="メールアドレス"
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
                        {signInErr && (
                            <Box sx={{ mt: "3%", color: "red" }} >
                                {signInErr}
                            </Box>
                        )}
                        <Box mt={3}>
                            {/* <Button type="submit" color="primary" variant="contained" onClick={handleOnClick} fullWidth> */}                        
                            {/* <Button color="primary" onClick={() => handleSignIn({username: '1764fac8-9041-70bb-b79c-2087183f8394', password: '12345678'})}> */}
                            <Button type="submit" color="primary" variant="contained" onClick={() => handleSignIn({email, password})} fullWidth>
                            サインイン
                            </Button>
                
                            <Typography variant="caption">
                            <Link href="#">パスワードを忘れましたか？</Link>
                            </Typography>
                            <Typography variant="caption" display="block" sx={{ mt: "10px" }}>
                                アカウントを持っていますか？
                                <Link 
                                    href="#"
                                    onClick={handleSignUpOpen}
                                    sx={{ 
                                        textDecoration: "underline", 
                                        m: "5px",
                                        p: "5px",
                                        fontSize: "1.2em", 
                                    }}>
                                        アカウントを作成
                                    </Link>
                            </Typography>
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
                source="SignIn"
            />
            <SignUpDialog
                open={signUpOpen}
                onClose={handleSignUpClose}
            />
        </>
    );
  };

export default SignInDialog;
  