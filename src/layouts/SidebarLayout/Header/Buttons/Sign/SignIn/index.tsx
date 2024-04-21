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
import { signIn, type SignInInput } from 'aws-amplify/auth';

interface SignInProps {
    open: boolean;
    onClose: () => void;
    isSigned: boolean;
}

function SignIn({ open, onClose, isSigned }: SignInProps) {
    const {isSignedIn, setIsSignedIn} = useUserContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };  

    const handleClose = () => {
        onClose();
    };

    const handleOnClick = () =>{
        alert("onClicked !");
    };

    async function handleSignIn({ username, password }: SignInInput) {
        console.log(username);
        console.log(password);
      try {
        const { isSignedIn, nextStep } = await signIn({ username, password });
        console.log(isSignedIn);
        console.log(nextStep);
        alert("success!");
        setIsSignedIn(true);
      } catch (error) {
        console.log('error signing in', error);
        alert("error!");
      }
      handleClose();
    }

    return (
        
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
                        <Typography variant={"h5"} sx={{ mb: "30px" }}>
                        Sign In
                        </Typography>
                    </Grid>
                    <TextField
                        label="Username"
                        variant="standard"
                        sx={{ mb: "3%" }}
                        value={username}
                        onChange={handleUsernameChange}
                        fullWidth
                        required />
                    <TextField
                        type="password"
                        label="Password"
                        variant="standard"
                        sx={{ mb: "3%" }}
                        value={password}
                        onChange={handlePasswordChange}
                        fullWidth
                        required />
                    <Box mt={3}>
                        {/* <Button type="submit" color="primary" variant="contained" onClick={handleOnClick} fullWidth> */}                        
                        {/* <Button color="primary" onClick={() => handleSignIn({username: '1764fac8-9041-70bb-b79c-2087183f8394', password: '12345678'})}> */}
                        <Button type="submit" color="primary" variant="contained" onClick={() => handleSignIn({username, password})} fullWidth>
                        サインイン
                        </Button>
            
                        <Typography variant="caption">
                        <Link href="#">パスワードを忘れましたか？</Link>
                        </Typography>
                        <Typography variant="caption" display="block">
                        アカウントを持っていますか？
                        <Link href="#">アカウントを作成</Link>
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
    );
  };

export default SignIn;
  