import { RefreshSession } from '../domain/usecases/RefreshSession';

describe('RefreshSession usecase', () => {
  it('calls repository.refresh with provided args and returns response', async () => {
    const mockRepo = { refresh: jest.fn().mockResolvedValue({ accessToken: 'newA', refreshToken: 'newR' }) } as any;
    const usecase = new RefreshSession(mockRepo);
    const res = await usecase.execute('oldR', 30);
    expect(mockRepo.refresh).toHaveBeenCalledWith('oldR', 30);
    expect(res.accessToken).toBe('newA');
  });
});
