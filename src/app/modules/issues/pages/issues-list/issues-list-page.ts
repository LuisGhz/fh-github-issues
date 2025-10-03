import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesService } from '../../services/issues.service';
import { LabelsSelector } from '../../components/labels-selector';
import { IssueItem } from '../../components/issue-item';
import { State } from '../../interfaces/github-issue.interface';

@Component({
  selector: 'issues-list-page',
  imports: [CommonModule, LabelsSelector, IssueItem],
  templateUrl: './issues-list-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuesListPage {
  issuesService = inject(IssuesService);

  get labelsQuery() {
    return this.issuesService.labelsQuery;
  }

  get issuesQuery() {
    return this.issuesService.issuesQuery;
  }

  get selectedState() {
    return this.issuesService.selectedState();
  }

  showIssuesByState(newState: 'open' | 'closed' | 'all') {
    const state =
      newState === 'open' ? State.Open : newState === 'closed' ? State.Closed : State.All;
    this.issuesService.showIssuesByState(state);
  }
}
