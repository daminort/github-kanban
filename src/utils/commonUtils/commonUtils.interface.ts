import { Issue, IssueStatus, ShortIssueStatus } from 'interfaces/issue.interface';

interface RepoInfo {
  owner: string;
  repoName: string;
}

type IssueLists = Record<IssueStatus, Issue[]>;

interface OrderInfo {
  s: ShortIssueStatus;
  o: number;
}

type OrderMap = Record<string, OrderInfo>;

export type {
  RepoInfo,
  IssueLists,
  OrderInfo,
  OrderMap,
}
