import { context, getOctokit } from '@actions/github';
import { getInput } from '@actions/core';

import { INPUT } from 'constants/io';
import { TListCommitsResponse } from 'types/octokit';

const token = getInput(INPUT.GITHUB_TOKEN, { required: true });
const octokit = getOctokit(token);

export async function fetchCommitsInPullRequest(
  pullRequestNumber: number
): Promise<TListCommitsResponse> {
  const response = await octokit.pulls.listCommits({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: pullRequestNumber,
  });
  return response.data;
}
