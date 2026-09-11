import { useEffect, useState } from "react";

import { Budget } from "@/types/budget";

import {
  loadFromStorage,
  saveToStorage,
} from "@/lib/storage";


export function useBudgets() {

  const [budgets, setBudgets] =
    useState<Budget[]>([]);

  const [mounted, setMounted] =
    useState(false);


  useEffect(() => {

    const storedBudgets =
      loadFromStorage<Budget[]>(
        "budgets",
        []
      );

    setBudgets(storedBudgets);

    setMounted(true);

  }, []);


  useEffect(() => {

    if (!mounted) return;

    saveToStorage(
      "budgets",
      budgets
    );

  }, [
    budgets,
    mounted,
  ]);


  return {

    budgets,

    setBudgets,

    mounted,

  };

}