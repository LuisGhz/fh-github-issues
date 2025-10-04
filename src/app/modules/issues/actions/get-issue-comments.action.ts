import { sleep } from '@helpers/sleep';
import { GithubIssue } from '../interfaces';
import { environment } from 'src/environments/environment.development';

export const getIssueComments = async (number: number) => {
  await sleep(3000);
  try {
    const response = await fetch(`${environment.baseUrl}/issues/${number}/comments`, {
      headers: {
        Authorization: `Bearer ${environment.githubToken}`,
      },
    });
    if (!response.ok) throw new Error(`Failed to fetch issue (number: ${number}) comments`);
    const data = (await response.json()) as GithubIssue[];
    return data;
  } catch (error) {
    console.log(error);
    throw `Failed to fetch issue (number: ${number}) comments`;
  }
};
