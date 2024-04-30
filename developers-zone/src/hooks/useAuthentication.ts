import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User, signOut } from 'firebase/auth';

const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return {
    user,
    logout
  };
}