import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesListPage } from './issues-list-page';

describe('IssuesListPage', () => {
  let component: IssuesListPage;
  let fixture: ComponentFixture<IssuesListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuesListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
