"use client";
import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";
import { IoWarningOutline } from "react-icons/io5";

import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <>
      <div className="flex min-h-[calc(100vh_-_60px)] w-full flex-col items-center justify-center gap-10">
        <IoWarningOutline className="text-9xl font-bold text-purple-600" />
        <h2 className="text-2xl font-bold">예상치 못한 오류가 발생했습니다.</h2>
        <p className="text-gray-500">{error.message}</p>
        <Button variant="purple" onClick={reset}>
          다시 시도
        </Button>
      </div>
      {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
      <NextError statusCode={0} />
    </>
  );
}
