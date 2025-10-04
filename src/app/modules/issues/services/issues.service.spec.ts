import { TestBed } from '@angular/core/testing';
import { IssuesService } from './issues.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';

describe('IssuesService', () => {
  let service: IssuesService;
  const queryClient = new QueryClient();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideTanStackQuery(queryClient)],
      teardown: { destroyAfterEach: true },
    });

    service = TestBed.inject(IssuesService);
  });

  it('should be created', async () => {
    const { data } = await service.labelsQuery.refetch();
    expect(data).toBeDefined();
    expect(data?.length).toBeGreaterThan(0);
  });
});
