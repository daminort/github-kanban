import { ReactNode } from 'react';
import { Issue, IssueStatus } from 'interfaces/issue.interface';
import { Repo } from 'interfaces/repo.interface';

interface ProviderProps {
  children: ReactNode;
}

interface ReorderInfo {
  itemID: number;
  sourceID: IssueStatus;
  sourceIndex: number;
  targetID: IssueStatus;
  targetIndex: number;
}

interface IssuesContext {
  backlog: Issue[];
  progress: Issue[];
  done: Issue[];
  repo: Repo;
  refreshList: (list: Issue[], status: IssueStatus) => void;
  refreshAll: (list: Issue[]) => void;
  refreshRepo: (repo: Repo) => void;
  reorderIssues: (info: ReorderInfo) => void;
}

export type {
  ProviderProps,
  ReorderInfo,
  IssuesContext,
}
