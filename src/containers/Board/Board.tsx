import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useIssuesCount } from 'context';
import { Column } from 'containers/Column';

const Board: FC = () => {
  const issuesCount = useIssuesCount();
  if (!issuesCount) {
    return null;
  }

  return (
    <Container className="bg-secondary bg-opacity-10 py-4 px-3">
      <Row>
        <Col xs={4}>
          <Column status="backlog" />
        </Col>
        <Col xs={4}>
          <Column status="progress" />
        </Col>
        <Col xs={4}>
          <Column status="done" />
        </Col>
      </Row>
    </Container>
  );
};

export {
  Board,
};
