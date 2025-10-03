import { sleep } from '@helpers/sleep';
import { GithubLabel } from '../interfaces';
import { environment } from 'src/environments/environment.development';

export const getLabels = async () => {
  await sleep(3000);
  try {
    const response = await fetch(`${environment.baseUrl}/labels`, {
      headers: {
        Authorization: `Bearer ${environment.githubToken}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch labels');
    const data = (await response.json()) as GithubLabel[];
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
