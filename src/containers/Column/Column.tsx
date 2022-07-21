import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Droppable } from 'react-beautiful-dnd';

import { useIssuesList } from 'context';
import { IssueStatus } from 'interfaces/issue.interface';
import { Card } from 'containers/Card';

import { ColumnProps } from './Column.props';

const titles: Record<IssueStatus, string> = {
  backlog: 'Backlog',
  progress: 'In Progress',
  done: 'Completed',
};

const style = {
  height: '100%',
  padding: '0.25rem',
  border: 'none',
}

const overStyle = {
  ...style,
  border: '1px dashed blue',
}

const Column: FC<ColumnProps> = ({ status }) => {
  const list = useIssuesList(status);
  const title = titles[status];

  return (
    <Container className="h-100">
      <Row>
        <Col>
          <p className="fs-4 fw-bold px-1">{title}</p>
        </Col>
      </Row>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={snapshot.isDraggingOver ? overStyle : style}
            {...provided.droppableProps}
          >
            {list.map(issue => {
              return (
                <Row key={issue.id}>
                  <Col>
                    <Card id={issue.id} />
                  </Col>
                </Row>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Container>
  );
};

export {
  Column,
};
