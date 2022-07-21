import { FC, useState, useCallback } from 'react';

import { adaptUtils } from 'utils/adaptUtils';
import { commonUtils, IssueLists } from 'utils/commonUtils';
import { Issue, IssueStatus } from 'interfaces/issue.interface';
import { Repo } from 'interfaces/repo.interface';
import { ProviderProps, ReorderInfo } from './context.interface';
import { issuesContext, initRepo } from './context';

const { Provider } = issuesContext;

const IssuesProvider: FC<ProviderProps> = ({ children }) => {
  const [backlog, setBacklog] = useState<Issue[]>([]);
  const [progress, setProgress] = useState<Issue[]>([]);
  const [done, setDone] = useState<Issue[]>([]);
  const [repo, setRepo] = useState<Repo>(initRepo);

  const refreshList = useCallback((list: Issue[], status: IssueStatus) => {
    if (status === 'backlog') {
      setBacklog(list);
    }
    if (status === 'progress') {
      setProgress(list);
    }
    if (status === 'done') {
      setDone(list);
    }
  }, []);

  const refreshAll = useCallback((list: Issue[]) => {
    const backlog = adaptUtils.extractIssues(list, 'backlog');
    const progress = adaptUtils.extractIssues(list, 'progress');
    const done = adaptUtils.extractIssues(list, 'done');

    refreshList(backlog, 'backlog');
    refreshList(progress, 'progress');
    refreshList(done, 'done');
  }, [refreshList]);

  const refreshRepo = useCallback((repo: Repo) => {
    setRepo(repo);
  }, []);

  const reorderIssues = useCallback((info: ReorderInfo) => {
    const lists: IssueLists = {
      backlog,
      progress,
      done,
    };

    const result = commonUtils.moveIssue(info, lists);

    refreshList(result.backlog, 'backlog');
    refreshList(result.progress, 'progress');
    refreshList(result.done, 'done');

    commonUtils.storeOrder(repo.repoURL, result);
  }, [backlog, progress, done, repo, refreshList]);

  const value = {
    backlog,
    progress,
    done,
    repo,
    refreshList,
    refreshAll,
    refreshRepo,
    reorderIssues,
  }

  return (
    <Provider value={value}>
      {children}
    </Provider>
  )
};

export {
  IssuesProvider,
}
