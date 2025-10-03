import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getLabels } from '../actions/get-labels.action';
import { getIssues } from '../actions/get-issues.action';
import { State } from '../interfaces/github-issue.interface';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  #selectedState = signal<State>(State.All);

  labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));

  issuesQuery = injectQuery(() => ({
    queryKey: ['issues', this.#selectedState()],
    queryFn: () => getIssues(this.#selectedState()),
  }));

  selectedState() {
    return this.#selectedState.asReadonly();
  }

  showIssuesByState(state: State) {
    console.log(state);
    this.#selectedState.set(state);
  }
}
