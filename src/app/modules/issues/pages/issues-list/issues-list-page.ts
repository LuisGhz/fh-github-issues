import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IssuesService } from '../../services/issues.service';
import { LabelsSelector } from '../../components/labels-selector';

@Component({
  selector: 'issues-list-page',
  imports: [RouterLink, LabelsSelector],
  templateUrl: './issues-list-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuesListPage {
  issuesService = inject(IssuesService);

  get labelsQuery() {
    return this.issuesService.labelsQuery;
  }
}
