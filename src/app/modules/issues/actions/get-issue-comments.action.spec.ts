import { environment } from 'src/environments/environment.development';
import { getIssueComments } from './get-issue-comments.action';

describe('getIssueComments', () => {
  const issueNumber = 1;
  const requestURL = `${environment.baseUrl}/issues/${issueNumber}/comments`;

  it('should fetch issue comments successfully', async () => {
    const mockIssue = { id: 1, number: 1, title: 'Test Issue', body: 'Test Issue Body' };
    const response = new Response(JSON.stringify(mockIssue), {
      status: 200,
      statusText: 'ok',
    });
    const spy = spyOn(globalThis, 'fetch').and.resolveTo(response);

    await getIssueComments(issueNumber);
    expect(spy).toHaveBeenCalledWith(requestURL, {
      headers: {
        Authorization: `Bearer ${environment.githubToken}`,
      },
    });
  });

  it('should throw an error if the response is not ok', async () => {
    const response = new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
    const spy = spyOn(globalThis, 'fetch').and.rejectWith(response);

    try {
      await getIssueComments(issueNumber);
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toEqual(`Failed to fetch issue (number: ${issueNumber}) comments`);
    }
  });
});
