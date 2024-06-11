import { useState } from "react";

type FormValues = {
  min: number;
  max: number;
  frequency: number;
};

export const LeaderboardForm = ({
  min,
  max,
  frequency,
  onSubmit,
}: FormValues & {
  onSubmit: (form: FormValues) => void;
}) => {
  const [form, setForm] = useState({ min, max, frequency });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      className="flex items-center justify-center flex-col md:flex-row gap-4 pt-8"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="min"
        className="text-lg font-bold text-slate-tight dark:text-white"
      >
        Min
      </label>
      <input
        id="min"
        type="number"
        placeholder="Min"
        min={form.min}
        value={form.min}
        onChange={handleChange}
        name="min"
        className="w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />
      <label
        htmlFor="max"
        className="text-lg font-bold text-slate-tight dark:text-white"
      >
        Max
      </label>
      <input
        id="max"
        type="number"
        placeholder="Max"
        max={form.max}
        min={form.min}
        value={form.max}
        onChange={handleChange}
        name="max"
        className="w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />
      <label
        htmlFor="frequency"
        className="text-lg font-bold text-slate-tight dark:text-white"
      >
        Frequency
      </label>
      <input
        id="frequency"
        placeholder="Frequency"
        value={form.frequency}
        onChange={handleChange}
        min={500}
        name="frequency"
        className="w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-24 font-semibold inline-flex leading-6 items-center rounded-md shadow justify-center text-white bg-indigo-500 hover:bg-indigo-400 p-2 mt-4 md:mt-0 md:ml-4"
      >
        Submit
      </button>
    </form>
  );
};
