import { Endpoints } from '@octokit/types';

export type TListCommitsResponse = Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/commits']['response']['data'];
