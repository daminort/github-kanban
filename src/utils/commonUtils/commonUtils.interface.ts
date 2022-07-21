import { Issue, IssueStatus } from 'interfaces/issue.interface';

interface RepoInfo {
  owner: string;
  repoName: string;
}

type IssueLists = Record<IssueStatus, Issue[]>;

export type {
  RepoInfo,
  IssueLists,
}
