import { useState, createContext, useContext, ReactNode } from 'react';

type UserContextType = {
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  appUsername: string;
  setAppUsername: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserContext = createContext<UserContextType>(
//   {} as UserContextType
// );

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useCountContext must be used within a CountProvider');
  }
  return context;
  // return useContext(UserContext);
}

// type isSignedInType = {
//   isSignedIn: boolean;
//   setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
// };

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [appUsername, setAppUsername] = useState<string>('GuestUser');

  const value: UserContextType = {
    isSignedIn,
    setIsSignedIn,
    appUsername,
    setAppUsername,
  };

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
}

// export const defaultState = createContext<UserContextType>({
//   isSignedIn: false,
//   setIsSignedIn: () => {},
// });

// export const UserContextProvider = ({ children }) => {
//   // const [isSignedIn, setisSignedIn] = useState(false);
//   const [isSignedIn, setIsSignedIn] = useState<UserContextType>();
//   const value = { isSignedIn, setIsSignedIn };

//   return (
//     <UserContext.Provider value={value}>
//       {children}
//     </UserContext.Provider>
//   );
// };
