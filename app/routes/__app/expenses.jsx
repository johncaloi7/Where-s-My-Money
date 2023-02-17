import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "../../components/expenses/ExpensesList";
import { getExpenses } from "../../data/expenses.server";
import { requireUserSession } from "../../data/auth.server";

export default function ExpensesSharedLayout() {
  const expenses = useLoaderData();

  const hasExpenses = expenses && expenses.length > 0;
  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {hasExpenses ? (
          <ExpensesList expenses={expenses} />
        ) : (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding expenses</Link>
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);

  return expenses;
}