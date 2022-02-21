import { PUBLIC_ENV, PRIVATE_ENV } from './env';

describe('[config] env', () => {
  it('should get PUBLIC_ENV', () => {
    expect(typeof PUBLIC_ENV.notionDbId).toEqual('string');
  });

  it('should get PRIVATE_ENV', () => {
    expect(typeof PRIVATE_ENV.notionIntegrationToken).toEqual('string');
  });
});
