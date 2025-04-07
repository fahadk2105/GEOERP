import { AlertCircle, CheckCircle2, Clock } from "lucide-react"

import { cn } from "@/lib/utils"

const maintenanceItems = [
  {
    id: 1,
    title: "Elevator Maintenance - Building A",
    date: "2023-03-30",
    status: "completed",
    priority: "medium",
  },
  {
    id: 2,
    title: "Water Pump Repair - Building C",
    date: "2023-04-01",
    status: "pending",
    priority: "high",
  },
  {
    id: 3,
    title: "Garden Landscaping",
    date: "2023-04-05",
    status: "scheduled",
    priority: "low",
  },
  {
    id: 4,
    title: "Security System Update",
    date: "2023-04-02",
    status: "pending",
    priority: "high",
  },
  {
    id: 5,
    title: "Roof Inspection - Building B",
    date: "2023-04-10",
    status: "scheduled",
    priority: "medium",
  },
]

export default function MaintenanceAlerts() {
  return (
    <div className="space-y-4">
      {maintenanceItems.map((item) => (
        <div key={item.id} className="flex items-center gap-4 rounded-lg border p-4">
          <div>
            {item.status === "completed" ? (
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            ) : item.status === "pending" ? (
              <AlertCircle className={cn("h-8 w-8", item.priority === "high" ? "text-red-500" : "text-yellow-500")} />
            ) : (
              <Clock className="h-8 w-8 text-blue-500" />
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-medium">{item.title}</h4>
            <p className="text-sm text-muted-foreground">
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <span
              className={cn(
                "rounded-full px-2 py-1 text-xs font-medium",
                item.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : item.status === "pending"
                    ? item.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800",
              )}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

