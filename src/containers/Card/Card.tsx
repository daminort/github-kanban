import { FC } from 'react';
import LibCard from 'react-bootstrap/Card';

import { useIssue } from 'context';
import { CardProps } from './Card.props';
import s from './Card.module.css';

const Card: FC<CardProps> = ({ id }) => {
  const issue = useIssue(id);
  if (!issue) {
    return null;
  }

  const { title, number, created, user } = issue;
  const info = `#${number} opened ${created} ago by ${user}`;

  return (
    <LibCard className="w-100 mb-2">
      <LibCard.Body>
        <LibCard.Title className="fs-6">{title}</LibCard.Title>
        <LibCard.Text className={s.details}>{info}</LibCard.Text>
      </LibCard.Body>
    </LibCard>
  );
};

export {
  Card,
};
