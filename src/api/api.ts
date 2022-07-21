import axios, { AxiosResponse, AxiosRequestHeaders } from 'axios';

import { adaptUtils } from 'utils/adaptUtils';
import { IssueDto, IssuesResponse } from './issue.dto';

async function getIssues(owner: string, repoName: string, token: string = ''): Promise<IssuesResponse> {

  const url = `https://api.github.com/repos/${owner}/${repoName}/issues`;
  const headers: AxiosRequestHeaders = {
    'Accept': 'application/vnd.github+json',
  };
  if (token) {
    headers.Authorization = `token: ${token}`;
  };

  const response: AxiosResponse<IssueDto[]> = await axios.get(url, {
    headers,
    params: {
      state: 'all',
    },
  });
  const list = adaptUtils.adaptIssuesList(response?.data);
  const repo = adaptUtils.extractRepo(response?.data);

  return {
    list,
    repo,
  };
}

const api = {
  getIssues,
};

export {
  api,
}
