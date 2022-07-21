import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useIssuesList } from 'context';
import { IssueStatus } from 'interfaces/issue.interface';
import { Card } from 'containers/Card';

import { ColumnProps } from './Column.props';

const titles: Record<IssueStatus, string> = {
  backlog: 'Backlog',
  progress: 'In Progress',
  done: 'Completed',
};

const Column: FC<ColumnProps> = ({ status }) => {
  const list = useIssuesList(status);
  const title = titles[status];

  return (
    <Container>
      <Row>
        <Col>
          <p className="fs-4 fw-bold">{title}</p>
        </Col>
      </Row>
      {list.map(issue => {
        return (
          <Row key={issue.id}>
            <Col>
              <Card id={issue.id} />
            </Col>
          </Row>
        )
      })}
    </Container>
  );
};

export {
  Column,
};
