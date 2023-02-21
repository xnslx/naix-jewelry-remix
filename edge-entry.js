import handleRequest from './app/entry.client';
import indexTemplate from './dist/worker/index';

// ReadableStream is bugged in Vercel Edge, overwrite with polyfill
import {ReadableStream} from 'web-streams-polyfill/ponyfill';
Object.assign(globalThis, {ReadableStream});

export default async (request, event) => {
  try {
    return await handleRequest(request, {
      indexTemplate,
      context: event,
    });
  } catch (error) {
    return new Response(error.message || error.toString(), {
      status: 500,
    });
  }
};
