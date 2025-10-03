import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueByNumber } from '../actions/get-issue-by-number.action';
import { getIssueComments } from '../actions/get-issue-comments.action';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  #issueNumber = signal<number | null>(null);

  issuesQuery = injectQuery(() => ({
    queryKey: ['issue', this.#issueNumber()],
    queryFn: () => getIssueByNumber(this.#issueNumber()!),
    enabled: this.#issueNumber() !== null,
  }));

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.#issueNumber(), 'comments'],
    queryFn: () => getIssueComments(this.#issueNumber()!),
    enabled: this.#issueNumber() !== null,
  }));

  setIssueNumber(number: number) {
    this.#issueNumber.set(number);
  }
}
