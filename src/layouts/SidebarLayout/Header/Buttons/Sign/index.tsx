import { useRef, useState, useEffect, useContext } from 'react';
import { useUserContext } from 'src/contexts/UserContext';
import { graphqlApiCall, graphqlApiResult } from 'src/graphql/apicall';
import { getUserDataByCognitoUserId } from 'src/graphql/queries';

import {
  Button,
  Tooltip,
} from '@mui/material';

import SignInDialog from './SignIn';
import SignOutDialog from './SignOut';

import { styled } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';

import { getCurrentUser } from 'aws-amplify/auth';

import { Amplify } from 'aws-amplify';
import config from 'src/aws-exports';
Amplify.configure(config);

function HeaderSign() {

  const ref = useRef<any>(null);
  const {isSignedIn, setIsSignedIn} = useUserContext();
  const {appUserId, setAppUserId} = useUserContext();
  const {appUsername, setAppUsername} = useUserContext();
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
        console.log("isSignedIn: " + isSignedIn);
        const res = await callApiGetUserDataByCognitoUserId(userId);
        setAppUserId(res.SK);
        setAppUsername(res.userName);
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

  useEffect(() => {
    console.log("appUserId: " + appUserId);
  }, [appUserId]);

  useEffect(() => {
    console.log("appUsername: " + appUsername);
  }, [appUsername]);

  const handleSignInOpen = (): void => {
    setSignInOpen(true);
  };

  const handleSignInClose = (): void => {
    setSignInOpen(false);
  };

  const handleSignOutOpen = (): void => {
    setSignOutOpen(true);
  };

  const handleSignOutClose = (): void => {
    setSignOutOpen(false);
  };

  const callApiGetUserDataByCognitoUserId = async(cognitoUserId: string) => {
      console.log('【START】callApiGetUserDataByCognitoUserId()');
      const res: any = await graphqlApiCall(getUserDataByCognitoUserId(cognitoUserId));
      const result: boolean = graphqlApiResult(res);
      console.log('【END】callApiGetUserDataByCognitoUserId()');
      return res.getUserDataByCognitoUserId;
  };

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
      <SignInDialog
        open={signInOpen}
        onClose={handleSignInClose}
      />
      <SignOutDialog
        open={signOutOpen}
        onClose={handleSignOutClose}
      />
    </>
  );
}

export default HeaderSign;
