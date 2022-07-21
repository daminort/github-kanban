import { ReorderInfo } from 'context/context.interface';
import { Issue } from 'interfaces/issue.interface';
import { RepoInfo, IssueLists } from './commonUtils.interface';

function parseURL(url: string): RepoInfo {
  const parts = url.split('/').reverse();

  return {
    owner: parts[1] || 'OWNER',
    repoName: parts[0] || 'REPO',
  };
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

  const result: IssueLists = {
    backlog: reorderIssues(clones.backlog),
    progress: reorderIssues(clones.progress),
    done: reorderIssues(clones.done),
  };

  return result;
}

const commonUtils = {
  parseURL,
  reorderIssues,
  moveIssue,
};

export {
  commonUtils,
}
