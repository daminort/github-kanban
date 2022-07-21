import { IssueState, Issue } from 'interfaces/issue.interface';
import { Repo } from 'interfaces/repo.interface';

interface IssueUser {
  login: string;
  url: string;
}

interface IssueDto {
  id: number;
  number: string;
  state: IssueState;
  title: string;
  user: IssueUser;
  assignee: IssueUser;
  created_at: string;
  repository_url: string;
}

interface IssuesResponse {
  list: Issue[];
  repo: Repo;
}

export type {
  IssueDto,
  IssuesResponse,
}
