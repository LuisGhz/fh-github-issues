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
  #selectedLabels = signal(new Set<string>());

  labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));

  issuesQuery = injectQuery(() => ({
    queryKey: [
      'issues',
      {
        state: this.#selectedState(),
        labels: [...this.#selectedLabels()],
      },
    ],
    queryFn: () => getIssues(this.#selectedState(), Array.from(this.#selectedLabels())),
  }));

  selectedState() {
    return this.#selectedState.asReadonly();
  }

  selectedLabels() {
    return this.#selectedLabels.asReadonly();
  }

  showIssuesByState(state: State) {
    console.log(state);
    this.#selectedState.set(state);
  }

  toggleLabel(label: string) {
    const labels = new Set(this.#selectedLabels());
    console.log(labels);
    if (labels.has(label)) {
      labels.delete(label);
    } else {
      labels.add(label);
    }

    this.#selectedLabels.set(labels);
  }
}
