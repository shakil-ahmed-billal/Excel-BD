import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';

const useAuth = () => {
  const user = useContext(AuthContext);
  if (!user) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return user;
}

export default useAuth