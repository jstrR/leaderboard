import { createRef, memo, useEffect, useState } from "react";

import { AnimationWrapper } from "./AnimationWrapper";
import { generateRandom, users } from "../lib";

export const Leaderboard = memo(
  ({
    min,
    max,
    frequency,
  }: {
    min: number;
    max: number;
    frequency: number;
  }) => {
    const [topUsers, setTopUsers] = useState(users);

    useEffect(() => {
      // We can do immutable updates withins the interval since array of users is small
      const interval = setInterval(() => {
        //
        const userIdToRandom = generateRandom(1, users.length);
        setTopUsers((prevUsers) =>
          prevUsers
            .map((user) => ({
              ...user,
              score:
                user.id === userIdToRandom
                  ? generateRandom(min, max)
                  : user.score,
              updated: user.id === userIdToRandom,
            }))
            .sort((a, b) => b.score - a.score)
        );
      }, frequency);

      return () => clearInterval(interval);
    }, [frequency, max, min]);

    return (
      <section className="flex flex-col items-center justify-center space-y-4 pt-8 w-full">
        <h2 className="text-2xl font-bold text-slate-tight dark:text-white pb-4">
          Rankings
        </h2>
        <ul className="flex flex-col items-center justify-center space-y-2 w-full">
          <AnimationWrapper>
            {topUsers.map((user) => (
              <li
                key={user.id}
                className="px-6 py-4 text-slate-tight dark:text-white rounded-lg bg-indigo-500 w-full sm:w-48"
                ref={createRef()}
              >
                <div
                  className={`flex items-center justify-between transition-all duration-75 ease-in-out transform text-lg ${
                    user.updated ? "opacity-50" : "opacity-100"
                  }`}
                  role="rowgroup"
                >
                  <span className="font-medium">{user.name}</span>
                  <span>{user.score} pts</span>
                </div>
              </li>
            ))}
          </AnimationWrapper>
        </ul>
      </section>
    );
  }
);
