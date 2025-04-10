import { useEffect, useRef, useState } from "react";

interface useIntersectionObserverProps {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

const useRefValue = <T,>(value: T) => {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
};

const useIntersectionObserver = <T extends HTMLElement>({
  root,
  rootMargin = "0px",
  threshold = 0.3,
  onIntersect,
}: useIntersectionObserverProps) => {
  const [target, setTarget] = useState<T | null>(null);

  const onIntersectRef = useRefValue(onIntersect);

  useEffect(() => {
    if (!target) return;

    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersectRef.current,
      { root, rootMargin, threshold },
    );
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [onIntersectRef, root, rootMargin, target, threshold]);

  return { setTarget };
};

export default useIntersectionObserver;
