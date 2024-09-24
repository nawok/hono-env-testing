import { describe, expect, it } from 'bun:test';
import app, { type Environment } from '.';

const MOCK_ENV: Environment = {
  MY_VAR: 'mocked-env'
};

describe('Environment', () => {
  it('Should return environment variables', async () => {
    const res = await app.request('/env');
    expect(res.status).toBe(200);

    const env = await res.json();
    expect(env).toHaveProperty('MY_VAR');
    expect(env.MY_VAR).toBe(process.env.MY_VAR); // passes
  });

  it('Should contain overrides from MOCK_ENV', async () => {
    const res = await app.request('/env', {}, MOCK_ENV);
    expect(res.status).toBe(200);

    const env = await res.json();
    expect(env).toHaveProperty('MY_VAR');
    expect(env.MY_VAR).toBe(MOCK_ENV.MY_VAR); // fails
  });
});
