import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GithubIssue } from '../interfaces';

@Component({
  selector: 'issue-comment',
  imports: [],
  templateUrl: './issue-comment.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueComment {
  issue = input.required<GithubIssue>();
}
