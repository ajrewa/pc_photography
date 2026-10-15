"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loader from "@/components/loader";
import { ROUTE_CHANGE_EVENT } from "@/lib/navigation";

function RouteTransitionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const routeKeyRef = useRef(routeKey);

  useEffect(() => {
    function stopLoading() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsLoading(false);
    }

    function startLoading() {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsLoading(true);
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        timeoutRef.current = null;
      }, 15000);
    }

    function handlePopState() {
      const currentRoute = `${window.location.pathname}?${new URLSearchParams(
        window.location.search,
      ).toString()}`;

      if (currentRoute === routeKeyRef.current) {
        stopLoading();
        return;
      }

      startLoading();
    }

    function handleHashChange() {
      const currentRoute = `${window.location.pathname}?${new URLSearchParams(
        window.location.search,
      ).toString()}`;
      if (currentRoute === routeKeyRef.current) stopLoading();
    }

    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank" || link.hasAttribute("download")) {
        return;
      }

      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        (destination.pathname === window.location.pathname &&
          destination.search === window.location.search)
      ) {
        return;
      }

      startLoading();
    }

    document.addEventListener("click", handleClick, true);
    window.addEventListener(ROUTE_CHANGE_EVENT, startLoading);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("pageshow", stopLoading);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener(ROUTE_CHANGE_EVENT, startLoading);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("pageshow", stopLoading);
      window.removeEventListener("hashchange", handleHashChange);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    routeKeyRef.current = routeKey;
    setIsLoading(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, [routeKey]);

  return <Loader show={isLoading} />;
}

export default function RouteTransitionLoader() {
  return (
    <Suspense fallback={null}>
      <RouteTransitionTracker />
    </Suspense>
  );
}
