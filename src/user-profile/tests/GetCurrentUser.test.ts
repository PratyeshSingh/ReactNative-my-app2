import { GetCurrentUser } from '../domain/usecases/GetCurrentUser';

describe('GetCurrentUser usecase', () => {
  it('calls repository.authMe with provided token and returns user', async () => {
    const mockRepo = { authMe: jest.fn().mockResolvedValue({ id: 1, username: 'e' }) } as any;
    const usecase = new GetCurrentUser(mockRepo);
    const res = await usecase.execute('token123');
    expect(mockRepo.authMe).toHaveBeenCalledWith('token123');
    expect(res.id).toBe(1);
  });
});
