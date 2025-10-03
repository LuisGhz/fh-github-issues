import { sleep } from '@helpers/sleep';
import { GithubIssue } from '../interfaces';
import { environment } from 'src/environments/environment.development';
import { State } from '../interfaces/github-issue.interface';

export const getIssues = async (state: State = State.All, labels: string[] = []) => {
  await sleep(3000);
  try {
    const params = new URLSearchParams();
    params.append('state', state);
    params.append('labels', labels.join(','));

    const response = await fetch(`${environment.baseUrl}/issues?${params}`, {
      headers: {
        Authorization: `Bearer ${environment.githubToken}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch issues');
    const data = (await response.json()) as GithubIssue[];
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
