import { useState } from "react";
import { Leaderboard } from "./components/Leaderboard";
import { LeaderboardForm } from "./components/LeaderboardForm";

function App() {
  const [leaderBoardConfig, setLeaderBoardConfig] = useState({
    min: 0,
    max: 1000,
    frequency: 1000,
  });

  return (
    <main className="w-full h-dvh flex flex-col items-center md:justify-center bg-white dark:bg-slate-800 overflow-auto py-16 px-12">
      <h1 className="text-3xl font-bold text-center dark:text-white text-slate-tight">
        Leaderboard
      </h1>
      <LeaderboardForm
        {...leaderBoardConfig}
        onSubmit={(values) => setLeaderBoardConfig(values)}
      />
      <Leaderboard {...leaderBoardConfig} />
    </main>
  );
}

export default App;
