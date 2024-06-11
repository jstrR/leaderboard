import React, { useState, useLayoutEffect, useEffect } from "react";

import {
  type LIChildWithRef,
  getChildrenOffsets,
  usePrevChildren,
  type ChildrenOffsets,
} from "../lib";

export const AnimationWrapper = ({ children }: React.PropsWithChildren) => {
  const [childrenOffsets, setChildrenOffsets] = useState<ChildrenOffsets>({});
  const [prevChildrenOffsets, setPrevChildrenOffsets] =
    useState<ChildrenOffsets>({});
  const prevChildren = usePrevChildren(children);

  useLayoutEffect(() => {
    setChildrenOffsets(getChildrenOffsets(children));
  }, [children]);

  useLayoutEffect(() => {
    setPrevChildrenOffsets(getChildrenOffsets(prevChildren));
  }, [prevChildren]);

  useEffect(() => {
    const hasPrevOffsets = Object.keys(prevChildrenOffsets).length;
    let animationFrame: number | null = null;
    let timeout: number | null = null;

    if (hasPrevOffsets) {
      React.Children.map(children, (child) => {
        const childNode = (child as LIChildWithRef).ref.current;
        if (!React.isValidElement(child) || !childNode) return;
        const prevOffset = prevChildrenOffsets[child.key as string];
        const currOffset = childrenOffsets[child.key as string];
        const changedPosition = prevOffset - currOffset;
        if (changedPosition) {
          animationFrame = requestAnimationFrame(() => {
            // invert child to old position
            childNode.style.transform = `translateY(${changedPosition}px)`;
            childNode.style.transition = "transform 0s, opacity 300s";

            timeout = setTimeout(() => {
              // remove transition to start the animation
              childNode.style.transform = "";
              childNode.style.transition = "transform 500ms, opacity 100s";
            }, 100);
          });
        }
      });
    }
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (timeout) clearTimeout(timeout);
    };
  }, [childrenOffsets, prevChildrenOffsets, children]);

  return children;
};
