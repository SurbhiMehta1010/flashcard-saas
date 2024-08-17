import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: ['/sign-in*', '/sign-up*'],
});

export const config = {
  matcher: [
    '/((?!api|static|_next|favicon.ico|sign-in|sign-up).*)',
  ],
};
