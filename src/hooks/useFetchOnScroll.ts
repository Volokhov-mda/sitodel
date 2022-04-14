import React from "react";

export default function useFetchOnScroll(
  childRef: React.RefObject<HTMLElement>,
  callback: () => void
) {
  const observer = React.useRef<IntersectionObserver>();
  const unobserveWorker = React.useCallback(() => {
    childRef.current && observer.current?.unobserve(childRef.current);
  }, [childRef]);
  React.useEffect(() => {
    const options = {
      rootMargin: "0px",
      threshold: 0,
    };
    const child = childRef.current;

    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        console.log("1111")
        callback();
      }
    }, options);
    child && observer.current.observe(child);

    return unobserveWorker;
  }, [callback, childRef, unobserveWorker]);

  return [unobserveWorker];
}
