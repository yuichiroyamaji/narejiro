import { useRef, useState, useEffect, useContext } from 'react';
import { useUserContext } from 'src/contexts/UserContext';

import {
  Button,
  Tooltip,
} from '@mui/material';

import SignIn from './SignIn';
import SignOut from './SignOut';

import { styled } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';

import { signUp } from 'aws-amplify/auth';
import { signOut } from 'aws-amplify/auth';
import { fetchAuthSession } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';

import { Amplify } from 'aws-amplify';
import config from 'src/aws-exports';
Amplify.configure(config);

function HeaderSign() {

  const ref = useRef<any>(null);
  const {isSignedIn, setIsSignedIn} = useUserContext();
  const [signInOpen, setSignInOpen] = useState<boolean>(false);
  const [signOutOpen, setSignOutOpen] = useState<boolean>(false);

  useEffect(() => {
    const currentAuthenticatedUser = async () => {
      try {
        const { username, userId, signInDetails } = await getCurrentUser();
        console.log(`The username: ${username}`);
        console.log(`The userId: ${userId}`);
        console.log(`The signInDetails: ${signInDetails}`);
        setIsSignedIn(true);
        console.log(isSignedIn);
      } catch (error) {
        console.log('error currentAuthenticatedUser', error);
        setIsSignedIn(false);
      }
    };
    currentAuthenticatedUser();
  }, []);

  useEffect(() => {
    console.log("[StateChangeDetected] isSignedIn : " + isSignedIn);
  }, [isSignedIn]);

  const handleSignInOpen = (): void => {
    setSignInOpen(true);
  };

  const handleSignInClose = (): void => {
    setSignInOpen(false);
  };

  const handleSignOutOpen = (): void => {
    handleSignOut();
    setSignOutOpen(true);
  };

  const handleSignOutClose = (): void => {
    setSignOutOpen(false);
  };

  type SignUpParameters = {
    username: string;
    password: string;
    email: string;
    phone_number: string;
  };

  async function handleSignUp({
    username,
    password,
    email,
    phone_number
  }: SignUpParameters) {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            phone_number
          },
          // optional
          autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        }
      });

      console.log(userId);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      setIsSignedIn(false);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <>
      {isSignedIn ?
        <Tooltip arrow title="SignOut">
          <Button color="primary" onClick={handleSignOutOpen}>
            <LockOpenTwoToneIcon />
          </Button>
        </Tooltip>
      :
        <Tooltip arrow title="SignIn">
          <Button color="primary" onClick={handleSignInOpen}>
            <LockIcon />
          </Button>
        </Tooltip>
      }
      <SignIn
        open={signInOpen}
        onClose={handleSignInClose}
        isSigned={isSignedIn}
      />
      <SignOut
        open={signOutOpen}
        onClose={handleSignOutClose}
      />
    </>
  );
}

export default HeaderSign;
