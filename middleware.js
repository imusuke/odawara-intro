import { next } from '@vercel/functions';

function unauthorized() {
  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="odawara-intro", charset="UTF-8"',
      'Cache-Control': 'no-store'
    }
  });
}

function decodeBasicToken(token) {
  try {
    return atob(token);
  } catch (_err) {
    return '';
  }
}

export default function middleware(request) {
  var expectedUser = process.env.BASIC_AUTH_USER;
  var expectedPass = process.env.BASIC_AUTH_PASSWORD;

  // If credentials are not configured on Vercel, block access by default.
  if (!expectedUser || !expectedPass) {
    return unauthorized();
  }

  var authHeader = request.headers.get('authorization') || '';
  if (!authHeader.startsWith('Basic ')) {
    return unauthorized();
  }

  var decoded = decodeBasicToken(authHeader.slice(6));
  var separator = decoded.indexOf(':');
  if (separator < 0) {
    return unauthorized();
  }

  var user = decoded.slice(0, separator);
  var pass = decoded.slice(separator + 1);
  if (user !== expectedUser || pass !== expectedPass) {
    return unauthorized();
  }

  return next();
}

export var config = {
  matcher: '/:path*'
};
