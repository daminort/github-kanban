import { ReactNode } from 'react';
import { Issue, IssueStatus } from 'interfaces/issue.interface';
import { Repo } from 'interfaces/repo.interface';

interface IssuesContext {
  backlog: Issue[];
  progress: Issue[];
  done: Issue[];
  repo: Repo;
  refreshList: (list: Issue[], status: IssueStatus) => void;
  refreshAll: (list: Issue[]) => void;
  refreshRepo: (repo: Repo) => void;
}

interface ProviderProps {
  children: ReactNode;
}

export type {
  ProviderProps,
  IssuesContext,
}
