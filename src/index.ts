import { Hono } from 'hono';
import { env } from 'hono/adapter';

export interface Environment extends Record<string, string> {
  MY_VAR: string;
}

const app = new Hono();

app.get('/env', (c) => c.json(env<Environment>(c)));

export default app;
