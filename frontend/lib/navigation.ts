export const ROUTE_CHANGE_EVENT = "pc:route-change-start";

export function startRouteTransition(destination: string) {
  const nextUrl = new URL(destination, window.location.href);
  if (
    nextUrl.origin !== window.location.origin ||
    (nextUrl.pathname === window.location.pathname &&
      nextUrl.search === window.location.search)
  ) {
    return;
  }

  window.dispatchEvent(new Event(ROUTE_CHANGE_EVENT));
}
