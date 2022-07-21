import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IssuesProvider } from 'context';
import { Form } from 'containers/Form';
import { Breadcrumbs } from 'containers/Breadcrumbs';
import { Board } from 'containers/Board';

const App = () => {

  return (
    <IssuesProvider>
      <Container>
        <Row>
          <Col>
            <Form />
          </Col>
        </Row>
        <Row>
          <Col>
            <Breadcrumbs />
          </Col>
        </Row>
        <Row>
          <Col>
            <Board />
          </Col>
        </Row>
      </Container>
    </IssuesProvider>
  );
}

export {
  App
}
