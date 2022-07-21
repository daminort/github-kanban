import { FC, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { useIssuesCount, useIssuesContext } from 'context';
import { Column } from 'containers/Column';
import { IssueStatus } from 'interfaces/issue.interface';
import { ReorderInfo } from '../../context/context.interface';

const Board: FC = () => {
  const issuesCount = useIssuesCount();
  const { reorderIssues } = useIssuesContext();

  const onDragEnd = useCallback((result: DropResult) => {
    const { draggableId, source, destination } = result;
    const info: ReorderInfo = {
      itemID: +draggableId,
      sourceID: (source?.droppableId as IssueStatus),
      sourceIndex: source?.index || 0,
      targetID: (destination?.droppableId as IssueStatus),
      targetIndex: destination?.index || 0,
    };
    reorderIssues(info);
  }, [reorderIssues]);

  if (!issuesCount) {
    return null;
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
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
    </DragDropContext>
  );
};

export {
  Board,
};
