"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

interface PageFlipWrapperProps {
  flipKey: string | number;
  direction: "left" | "right";
  children: ReactNode;
}

export default function PageFlipWrapper({
  flipKey,
  direction,
  children,
}: PageFlipWrapperProps) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [animPhase, setAnimPhase] = useState<"idle" | "out" | "in">("idle");
  const prevKey = useRef(flipKey);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (prevKey.current !== flipKey) {
      setAnimPhase("out");
      prevKey.current = flipKey;

      const timeoutIdle = setTimeout(() => {
        setDisplayChildren(children);
        setAnimPhase("in");

        setTimeout(() => {
          setAnimPhase("idle");
        }, 250);
      }, 250);

      return () => clearTimeout(timeoutIdle);
    } else {
      setDisplayChildren(children);
    }
  }, [flipKey, children]);

  const currentChildren = animPhase === "idle" ? children : displayChildren;

  let animClass = "";
  if (animPhase === "out") {
    animClass = direction === "right" ? "flip-out-left" : "flip-out-right";
  } else if (animPhase === "in") {
    animClass = direction === "right" ? "flip-in-left" : "flip-in-right";
  }

  return (
    <div
      className={`page-flip-container ${animClass}`}
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      {currentChildren}
    </div>
  );
}
