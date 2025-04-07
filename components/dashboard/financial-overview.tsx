"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    income: 440000,
    expenses: 240000,
  },
  {
    name: "Feb",
    income: 450000,
    expenses: 220000,
  },
  {
    name: "Mar",
    income: 448000,
    expenses: 260000,
  },
  {
    name: "Apr",
    income: 470000,
    expenses: 280000,
  },
  {
    name: "May",
    income: 452000,
    expenses: 245000,
  },
  {
    name: "Jun",
    income: 458000,
    expenses: 250000,
  },
]

export default function FinancialOverview() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(value) =>
              new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "PKR",
                maximumFractionDigits: 0,
              }).format(value)
            }
          />
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "PKR",
                maximumFractionDigits: 0,
              }).format(Number(value))
            }
          />
          <Legend />
          <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

