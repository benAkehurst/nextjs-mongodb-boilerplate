import { signIn } from 'next-auth/react';
import classes from './GoogleLoginButton.module.scss';

export default function GoogleLoginButton() {
  return (
    <button
      className={classes.googleLoginButton}
      onClick={() => signIn('google')}
    >
      Sign in with Google
    </button>
  );
}
