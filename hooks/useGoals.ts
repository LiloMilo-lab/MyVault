import { useEffect, useState } from "react";

import { Goal } from "@/types/goal";

import {
  loadFromStorage,
  saveToStorage,
} from "@/lib/storage";

export function useGoals() {
  const [goals, setGoals] =
    useState<Goal[]>([]);

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    const storedGoals =
      loadFromStorage<Goal[]>(
        "goals",
        []
      );

    setGoals(storedGoals);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    saveToStorage(
      "goals",
      goals
    );
  }, [
    goals,
    mounted,
  ]);

  return {
    goals,
    setGoals,
    mounted,
  };
}