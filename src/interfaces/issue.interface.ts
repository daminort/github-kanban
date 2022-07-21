type IssueState = 'open' | 'closed';
type IssueStatus = 'backlog' | 'progress' | 'done';
type ShortIssueStatus = 'b' | 'p' | 'd';

interface Issue {
  id: number;
  number: string;
  status: IssueStatus;
  title: string;
  user: string;
  assignee: string;
  created: string;
  order: number;
}

export type {
  IssueState,
  IssueStatus,
  ShortIssueStatus,
  Issue,
}
