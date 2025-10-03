import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';

@Component({
  selector: 'issue-page',
  imports: [],
  templateUrl: './issue-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuePage {
  #activatedRoute = inject(ActivatedRoute);

  issueNumber = toSignal(
    this.#activatedRoute.paramMap.pipe(
      map((params) => Number(params.get('number') ?? 0)),
      tap(console.log),
    ),
  );
}
