import { useContext } from 'react';

import { Issue, IssueStatus } from 'interfaces/issue.interface';
import { Repo } from 'interfaces/repo.interface';
import { initRepo, issuesContext } from './context';
import { IssuesContext } from './context.interface';

const useIssuesContext = () => useContext<IssuesContext>(issuesContext);

const useIssuesList = (status: IssueStatus): Issue[] => {
  const issues = useIssuesContext();
  return issues[status] || [];
}

const useRepo = (): Repo => {
  const issues = useIssuesContext();
  return issues.repo || initRepo;
}

const useIssue = (id: number): Issue | null => {
  const { backlog, progress, done } = useIssuesContext();
  const issue = [...backlog, ...progress, ...done].find(item => item.id === id);

  return issue || null;
}

const useIssuesCount = (): number => {
  const { backlog, progress, done } = useIssuesContext();
  return backlog.length + progress.length + done.length;
}

export {
  useIssuesContext,
  useIssuesList,
  useRepo,
  useIssue,
  useIssuesCount,
}
