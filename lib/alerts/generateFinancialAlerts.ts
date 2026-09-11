import { Budget } from "@/types/budget";
import { Goal } from "@/types/goal";
import { Transaction } from "@/types/transaction";

export type FinancialAlert = {
  id: string;
  type: "success" | "warning" | "danger" | "info";
  title: string;
  message: string;
  priority: number;
};

export function generateFinancialAlerts(
  budgets: Budget[],
  goals: Goal[],
  transactions: Transaction[],
  savingRate: number
): FinancialAlert[] {

  const alerts: FinancialAlert[] = [];


  /* =========================
     BUDGET ALERTS
  ========================= */

  budgets.forEach((budget) => {

    const spent =
      transactions
        .filter(
          (transaction) =>
            transaction.type === "Expense" &&
            transaction.category === budget.category
        )
        .reduce(
          (total, transaction) =>
            total + transaction.amount,
          0
        );

    const percentage =
      budget.limit > 0
        ? (spent / budget.limit) * 100
        : 0;


    if (percentage >= 100) {

      alerts.push({
        id: `budget-exceeded-${budget.id}`,
        type: "danger",
        title: "Budget Exceeded",
        message:
          `${budget.category} has exceeded its budget.`,
        priority: 1,
      });

    } else if (percentage >= 80) {

      alerts.push({
        id: `budget-warning-${budget.id}`,
        type: "warning",
        title: "Budget Almost Full",
        message:
          `${budget.category} has reached ${percentage.toFixed(0)}% of its budget.`,
        priority: 2,
      });

    }

  });


  /* =========================
     GOAL ALERTS
  ========================= */

  goals.forEach((goal) => {

    const percentage =
      goal.targetAmount > 0
        ? (goal.currentAmount / goal.targetAmount) * 100
        : 0;


    if (percentage >= 100) {

      alerts.push({
        id: `goal-completed-${goal.id}`,
        type: "success",
        title: "Goal Completed 🎉",
        message:
          `${goal.name} has reached its target.`,
        priority: 4,
      });

    }

  });


  /* =========================
     SAVING RATE ALERT
  ========================= */

  if (savingRate < 20) {

    alerts.push({
      id: "low-saving-rate",
      type: "warning",
      title: "Low Saving Rate",
      message:
        "Your saving rate is below 20%. Consider reducing expenses.",
      priority: 3,
    });

  }


  /* =========================
     SORT BY PRIORITY
  ========================= */

  return alerts.sort(
    (a, b) =>
      a.priority - b.priority
  );

}