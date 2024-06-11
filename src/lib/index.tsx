import React, { useEffect, useRef } from "react";

export type ChildrenOffsets = {
  [key: string]: number;
};

export type LIChildWithRef = React.ReactNode & {
  ref: React.RefObject<HTMLLIElement>;
};

export type User = {
  id: number;
  name: string;
  score: number;
  updated: boolean;
};

export const generateRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getChildrenOffsets = (children: React.ReactNode) => {
  const offsets: ChildrenOffsets = {};
  React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const refNode = (child as LIChildWithRef).ref.current;
      if (refNode) {
        const { offsetTop } = refNode;
        if (child.key) {
          offsets[child.key as string] = offsetTop;
        }
      }
    }
  });

  return offsets;
};

export const usePrevChildren = <T,>(value: T) => {
  const prevChildrenRef = useRef<T>();

  useEffect(() => {
    prevChildrenRef.current = value;
  }, [value]);

  return prevChildrenRef.current;
};

export const users: User[] = [
  {
    id: 1,
    name: "John",
    score: 100,
    updated: false,
  },
  {
    id: 2,
    name: "Jane",
    score: 90,
    updated: false,
  },
  {
    id: 3,
    name: "Doe",
    score: 80,
    updated: false,
  },
  {
    id: 4,
    name: "Smith",
    score: 70,
    updated: false,
  },
  {
    id: 5,
    name: "Alice",
    score: 60,
    updated: false,
  },
  {
    id: 6,
    name: "Bob",
    score: 50,
    updated: false,
  },
  {
    id: 7,
    name: "Charlie",
    score: 40,
    updated: false,
  },
  {
    id: 8,
    name: "David",
    score: 30,
    updated: false,
  },
  {
    id: 9,
    name: "Eve",
    score: 20,
    updated: false,
  },
  {
    id: 10,
    name: "Frank",
    score: 10,
    updated: false,
  },
];
