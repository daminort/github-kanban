import { createContext } from 'react';

import { IssuesContext } from './context.interface';

const initRepo = {
  owner: 'NoName',
  ownerURL: '',
  repo: 'No Repo',
  repoURL: '',
};

const initValue: IssuesContext = {
  backlog: [],
  progress: [],
  done: [],
  repo: initRepo,
  refreshList: () => {},
  refreshAll: () => {},
  refreshRepo: () => {},
}

const issuesContext = createContext<IssuesContext>(initValue);

export {
  issuesContext,
  initRepo,
}
