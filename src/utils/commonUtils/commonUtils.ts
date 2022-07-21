import { ReorderInfo } from 'context/context.interface';
import { Issue, IssueStatus, ShortIssueStatus } from 'interfaces/issue.interface';
import { RepoInfo, IssueLists, OrderInfo, OrderMap } from './commonUtils.interface';

function parseURL(url: string): RepoInfo {
  const parts = url.split('/').reverse();

  return {
    owner: parts[1] || 'OWNER',
    repoName: parts[0] || 'REPO',
  };
}

function shortStatus(status: IssueStatus): ShortIssueStatus {
  if (status === 'progress') {
    return 'p';
  }
  if (status === 'done') {
    return 'd';
  }

  return 'b';
}

function parseStatus(shortStatus: ShortIssueStatus): IssueStatus {
  if (shortStatus === 'p') {
    return 'progress';
  }
  if (shortStatus === 'd') {
    return 'done';
  }

  return 'backlog';
}

function reorderIssues(list: Issue[]): Issue[] {
  return list.map((item, index) => ({
    ...item,
    order: index,
  }));
}

function moveIssue(info: ReorderInfo, lists: IssueLists): IssueLists {

  const { itemID, sourceID, sourceIndex, targetID, targetIndex } = info;
  if (sourceID === targetID && sourceIndex === targetIndex) {
    return lists;
  }

  const clones: IssueLists = {
    backlog: [...lists.backlog],
    progress: [...lists.progress],
    done: [...lists.done],
  }

  const sourceList = clones[sourceID];
  const targetList = clones[targetID];
  const item = sourceList.find(i => i.id === itemID)!;

  sourceList.splice(sourceIndex, 1);
  targetList.splice(targetIndex, 0, item);

  item.status = targetID;

  const result: IssueLists = {
    backlog: reorderIssues(clones.backlog),
    progress: reorderIssues(clones.progress),
    done: reorderIssues(clones.done),
  };

  return result;
}

function storeOrder(url: string, lists: IssueLists): void {
  const issues = [
    ...lists.backlog,
    ...lists.progress,
    ...lists.done,
  ];

  const orders: OrderMap = issues.reduce((res, issue) => {
    const { id, status, order } = issue;
    const info: OrderInfo = {
      s: shortStatus(status),
      o: order,
    }
    res[String(id)] = info;

    return res;
  }, {} as OrderMap);

  localStorage.setItem(url, JSON.stringify(orders));
}

function restoreOrder(url: string, list: Issue[]): Issue[] {

  const json = localStorage.getItem(url) || '{}';
  const orders: OrderMap = JSON.parse(json) || {} as OrderMap;

  if (Object.keys(orders).length === 0) {
    return list;
  }

  for (const issue of list) {
    const info: OrderInfo = orders[String(issue.id)];
    if (info) {
      issue.status = parseStatus(info.s);
      issue.order = info.o;
    };
  }

  list.sort((a, b) => a.order - b.order);

  return list;
}

const commonUtils = {
  parseURL,
  reorderIssues,
  moveIssue,
  storeOrder,
  restoreOrder,
};

export {
  commonUtils,
}
