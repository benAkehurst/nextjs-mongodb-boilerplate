import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <Container fluid>
      <Row>
        <Col>
          {session ? (
            <div>Session Exists</div>
          ) : (
            <div>Session Doesnt Exist</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
