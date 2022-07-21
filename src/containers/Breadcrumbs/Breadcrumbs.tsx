import { FC } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { useRepo } from 'context/context.hooks';

const Breadcrumbs: FC = () => {
  const { owner, ownerURL, repo, repoURL } = useRepo();
  if (!ownerURL) {
    return null;
  }

  return (
    <Breadcrumb className="pt-3 pb-3 fs-5 fw-bold">
      <Breadcrumb.Item href={ownerURL}>{owner}</Breadcrumb.Item>
      <Breadcrumb.Item href={repoURL}>{repo}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export {
  Breadcrumbs,
};
