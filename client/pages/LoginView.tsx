
import React from 'react';
import { Page, User } from '../App';
import AuthView from './AuthView';

interface LoginViewProps {
  navigateTo: (page: Page) => void;
  onLogin: (user: User) => void;
}

const LoginView: React.FC<LoginViewProps> = (props) => {
  return <AuthView initialMode="login" navigateTo={props.navigateTo} onAuthSuccess={props.onLogin} />;
};

export default LoginView;
