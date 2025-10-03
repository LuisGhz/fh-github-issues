import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GithubLabel } from '../interfaces';
import { CommonModule } from '@angular/common';
import { IssuesService } from '../services/issues.service';

@Component({
  selector: 'labels-selector',
  imports: [CommonModule],
  templateUrl: './labels-selector.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsSelector {
  #issuesService = inject(IssuesService);
  labels = input.required<GithubLabel[]>();

  isSelected(label: string) {
    return this.#issuesService.selectedLabels()().has(label);
  }

  toggleLabel(label: string) {
    this.#issuesService.toggleLabel(label);
  }
}
