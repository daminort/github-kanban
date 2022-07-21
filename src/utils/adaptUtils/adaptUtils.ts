import { IssueDto } from 'api';
import { Issue, IssueStatus } from 'interfaces/issue.interface';
import { Repo } from 'interfaces/repo.interface';
import { initRepo } from 'context';
import { formatUtils } from 'utils/formatUtils';

function adaptIssuesList(list: IssueDto[]): Issue[] {
  if (!Array.isArray(list)) {
    return [];
  }

  return list.map(item => {
    const { id, number, title, state, user, assignee, created_at } = item;
    let status: IssueStatus = 'backlog';
    if (state === 'open' && assignee?.login) {
      status = 'progress';
    }
    if (state === 'closed') {
      status = 'done';
    }

    return {
      id,
      number,
      title,
      status,
      created: formatUtils.fromNow(created_at),
      user: user?.login || 'NoName',
      assignee: assignee?.login || '',
      order: 0,
    }
  })
}

function extractIssues(list: Issue[], status: IssueStatus): Issue[] {
  if (!Array.isArray(list)) {
    return [];
  }

  return list
    .filter(item => item.status === status)
    .map((item, index) => ({
      ...item,
      order: index,
    }));
}

function extractRepo(list: IssueDto[]): Repo {
  if (!Array.isArray(list) || list.length === 0) {
    return initRepo;
  }

  const item = list[0];
  const { user, repository_url = '' } = item;
  const repoName = repository_url.split('/').reverse()[0];

  return {
    owner: user?.login,
    ownerURL: user?.url,
    repo: repoName,
    repoURL: repository_url,
  }
}

const adaptUtils = {
  adaptIssuesList,
  extractIssues,
  extractRepo,
};

export {
  adaptUtils,
}
