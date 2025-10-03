import { sleep } from '@helpers/sleep';
import { GithubLabel } from '../interfaces';

export const getLabels = async () => {
  await sleep(3000);
  try {
    const response = await fetch('https://api.github.com/repos/angular/angular/labels');
    if (!response.ok) throw new Error('Failed to fetch labels');
    const data = (await response.json()) as GithubLabel[];
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
