import { FC } from 'react';
import LibCard from 'react-bootstrap/Card';
import { Draggable } from 'react-beautiful-dnd';

import { useIssue } from 'context';
import { CardProps } from './Card.props';
import s from './Card.module.css';

const Card: FC<CardProps> = ({ id }) => {
  const issue = useIssue(id);
  if (!issue) {
    return null;
  }

  const { title, number, created, user, order } = issue;
  const info = `#${number} opened ${created} ago by ${user}`;

  return (
    <Draggable draggableId={String(id)} index={order}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <LibCard className="w-100 mb-2">
            <LibCard.Body>
              <LibCard.Title className="fs-6">{title}</LibCard.Title>
              <LibCard.Text className={s.details}>{info}</LibCard.Text>
            </LibCard.Body>
          </LibCard>
        </div>
      )}
    </Draggable>
  );
};

export {
  Card,
};
