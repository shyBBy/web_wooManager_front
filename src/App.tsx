import React from 'react';
import './App.css';
import {useAuth} from "./hooks/useAuth";
import {AuthenticatedApp} from "./views/AuthenticatedApp";
import { UnAuthenticatedApp } from './views/UnAuthenticatedApp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {

    const {user} = useAuth()

  return (
    <>
        {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
        <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
}

