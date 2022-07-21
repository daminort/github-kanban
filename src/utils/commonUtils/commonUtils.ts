import { RepoInfo } from './commonUtils.interface';

function parseURL(url: string): RepoInfo {
  const parts = url.split('/').reverse();

  return {
    owner: parts[1] || 'OWNER',
    repoName: parts[0] || 'REPO',
  };
}

const commonUtils = {
  parseURL,
};

export {
  commonUtils,
}
