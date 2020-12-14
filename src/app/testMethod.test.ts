import testMethod from './testMethod';

test('Test File', async () => {
  await expect(testMethod()).rejects.toThrowError();
});
