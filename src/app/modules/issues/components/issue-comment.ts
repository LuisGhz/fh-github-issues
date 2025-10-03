import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { GithubIssue } from '../interfaces';

@Component({
  selector: 'issue-comment',
  imports: [MarkdownModule],
  templateUrl: './issue-comment.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueComment {
  issue = input.required<GithubIssue>();
}
