import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GithubIssue } from '../interfaces';
import { IssueService } from '../services/issue.service';

@Component({
  selector: 'issue-item',
  imports: [RouterLink, CommonModule],
  templateUrl: './issue-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueItem {
  #issueService = inject(IssueService);
  issue = input.required<GithubIssue>();
  isOpen = computed(() => this.issue().state === 'open');

  prefetchIssue() {
    this.#issueService.prefetchIssue(this.issue().number);
  }
}
