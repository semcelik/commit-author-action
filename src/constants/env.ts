import fs from 'fs';
import { WebhookPayload } from '@actions/github/lib/interfaces';

const GITHUB_EVENT: WebhookPayload = JSON.parse(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')
);

export { GITHUB_EVENT };
