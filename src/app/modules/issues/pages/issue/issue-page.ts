import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { IssueService } from '../../services/issue.service';
import { IssueComment } from '../../components/issue-comment';

@Component({
  selector: 'issue-page',
  imports: [RouterLink, IssueComment],
  templateUrl: './issue-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuePage {
  #activatedRoute = inject(ActivatedRoute);
  #issueService = inject(IssueService);

  issueNumber = toSignal(
    this.#activatedRoute.paramMap.pipe(
      map((params) => Number(params.get('number') ?? 0)),
      tap((n) => this.#issueService.setIssueNumber(n)),
    ),
  );

  issueQuery = this.#issueService.issuesQuery;
  issueCommentsQuery = this.#issueService.issueCommentsQuery;
}
