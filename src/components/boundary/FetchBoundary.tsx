"use client";

import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { PropsWithChildren, Suspense } from "react";

import FetchError from "@/components/ui/FetchError";

const FetchBoundary = ({
  children,
  fallback,
}: PropsWithChildren<{ fallback: React.ReactNode }>) => {
  return (
    <ErrorBoundary errorComponent={({ reset }) => <FetchError reset={reset} />}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default FetchBoundary;
