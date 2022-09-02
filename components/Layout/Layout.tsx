import { Fragment, useContext } from 'react';
import classes from './Layout.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainHeader from './MainHeader';
import NotificationElement from '../UI/NotificationElement';
import NotificationContext from '../../store/NotificationContext';

export type LayoutProps = {
  children: React.ReactNode;
};

function Layout(props: LayoutProps) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      {activeNotification && (
        <div className={classes.notificationWrapper}>
          <NotificationElement
            title={activeNotification.title}
            message={activeNotification.message}
            status={activeNotification.status}
          />
        </div>
      )}
      <Container fluid>
        <Row>
          <Col>
            <main>{props.children}</main>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Layout;
