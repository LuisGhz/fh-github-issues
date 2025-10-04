import { environment } from 'src/environments/environment.development';
import { getIssueByNumber } from './get-issue-by-number.action';

describe('GetIssueByNumberAction', () => {
  const number = 1;
  const mockIssue = { id: 1, number: 1, title: 'Test Issue', body: 'Test Issue Body' };

  it('should fetch the issue by number', async () => {
    const requestURL = `${environment.baseUrl}/issues/${number}`;
    const response = new Response(JSON.stringify(mockIssue), {
      status: 200,
      statusText: 'OK',
    });
    spyOn(globalThis, 'fetch').and.resolveTo(response);
    await getIssueByNumber(number);
    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: {
        Authorization: `Bearer ${environment.githubToken}`,
      },
    });
  });

  it('should fetch the issue by number', async () => {
    const requestURL = `${environment.baseUrl}/issues/${number}`;
    const response = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
    spyOn(globalThis, 'fetch').and.rejectWith(response);
    try {
      await getIssueByNumber(number);
      expect(true).toBeFalse(); // Force fail if no error is thrown
    } catch (error) {
      expect(error).toBe(`Failed to fetch issue number ${number}`);
    }
  });
});
