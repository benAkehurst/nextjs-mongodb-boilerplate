import Link from 'next/link';
import { appConfig } from '../../app-config';
import { useSession, signOut } from 'next-auth/react';
import classes from './MainHeader.module.scss';
import GoogleLoginButton from '../UI/GoogleLoginButton';
import Button from 'react-bootstrap/Button';

function MainHeader() {
  const { data: session } = useSession();
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">{appConfig.appName}</Link>
      </div>
      <div className={classes.navLinks}>
        <nav className={classes.navigation}>
          {session ? (
            <Button variant="secondary" size="sm">
              <Link href="/">signed in</Link>
            </Button>
          ) : null}
        </nav>
        {session ? (
          <div>
            <Button variant="info" size="sm" onClick={() => signOut()}>
              Sign out
            </Button>
          </div>
        ) : (
          <GoogleLoginButton />
        )}
      </div>
    </header>
  );
}

export default MainHeader;
