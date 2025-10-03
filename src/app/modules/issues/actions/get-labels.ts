import { GithubLabel } from '../interfaces';

export const getLabels = async () => {
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
