
import React from 'react';
import { Page, User } from '../App';
import AuthView from './AuthView';

interface SignUpViewProps {
  navigateTo: (page: Page) => void;
  onSignUp: (user: User) => void;
}

const SignUpView: React.FC<SignUpViewProps> = (props) => {
  return <AuthView initialMode="signup" navigateTo={props.navigateTo} onAuthSuccess={props.onSignUp} />;
};

export default SignUpView;
