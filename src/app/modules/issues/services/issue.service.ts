import { inject, Injectable, signal } from '@angular/core';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { getIssueByNumber } from '../actions/get-issue-by-number.action';
import { getIssueComments } from '../actions/get-issue-comments.action';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  #issueNumber = signal<number | null>(null);
  #queryClient = inject(QueryClient);
  #MINUTE = 1000 * 60;
  #STALE_TIME = this.#MINUTE * 10; // 10 minutes

  issuesQuery = injectQuery(() => ({
    queryKey: ['issue', this.#issueNumber()],
    queryFn: () => getIssueByNumber(this.#issueNumber()!),
    enabled: this.#issueNumber() !== null,
    staleTime: this.#STALE_TIME,
  }));

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.#issueNumber(), 'comments'],
    queryFn: () => getIssueComments(this.#issueNumber()!),
    enabled: this.#issueNumber() !== null,
  }));

  setIssueNumber(number: number) {
    this.#issueNumber.set(number);
  }

  prefetchIssue(number: number) {
    this.#queryClient.prefetchQuery({
      queryKey: ['issue', number],
      queryFn: () => getIssueByNumber(number),
      staleTime: this.#STALE_TIME,
    });
  }
}
