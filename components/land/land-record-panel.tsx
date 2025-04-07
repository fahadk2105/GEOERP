"use client"

import { useState } from "react"
import { X, FileText, Plus, Download, Calendar, DollarSign, Users, FileCheck } from "lucide-react"
import type { LandParcel, LandTransaction } from "./land-record-types"

interface LandRecordPanelProps {
  parcel: LandParcel
  transactions: LandTransaction[]
  onClose: () => void
  onAddTransaction: (transaction: Omit<LandTransaction, "id">) => void
}

export default function LandRecordPanel({ parcel, transactions, onClose, onAddTransaction }: LandRecordPanelProps) {
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [newTransaction, setNewTransaction] = useState<Omit<LandTransaction, "id">>({
    parcelId: parcel.parcelId,
    type: "Acquisition",
    date: new Date().toISOString().split("T")[0],
    amount: 0,
    fromParty: "",
    toParty: "",
    documents: [],
    notes: "",
  })

  // Get current owner
  const currentOwner = parcel.ownershipHistory.find((record) => record.to === null)?.owner || "None"

  // Calculate total investment
  const totalInvestment = transactions.filter((t) => t.type === "Acquisition").reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <div>
          <h2 className="text-lg font-bold">{parcel.parcelId}</h2>
          <p className="text-sm text-gray-500">Land Record Details</p>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Parcel Details */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Parcel Information</h3>
          <div className="bg-white rounded-md border p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Area</span>
              <span className="text-sm font-medium">{parcel.area.toLocaleString()} sq.m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Usage</span>
              <span className="text-sm font-medium">{parcel.usage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Zone</span>
              <span className="text-sm font-medium">{parcel.zone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <span
                className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                  parcel.status === "Acquired"
                    ? "bg-green-100 text-green-800"
                    : parcel.status === "In Process"
                      ? "bg-yellow-100 text-yellow-800"
                      : parcel.status === "Disputed"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                }`}
              >
                {parcel.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Last Survey</span>
              <span className="text-sm font-medium">{parcel.lastSurvey}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Current Owner</span>
              <span className="text-sm font-medium">{currentOwner}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Investment</span>
              <span className="text-sm font-medium">₹{totalInvestment.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Ownership History */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Ownership History</h3>
          {parcel.ownershipHistory.length > 0 ? (
            <div className="bg-white rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      From
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      To
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {parcel.ownershipHistory.map((record, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm">{record.owner}</td>
                      <td className="px-4 py-2 text-sm">{record.from}</td>
                      <td className="px-4 py-2 text-sm">{record.to || "Present"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-md border p-4 text-center text-gray-500 text-sm">
              No ownership records found
            </div>
          )}
        </div>

        {/* Transactions */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-semibold">Transactions</h3>
            <button
              onClick={() => setShowAddTransaction(true)}
              className="text-xs bg-emerald-600 text-white px-2 py-1 rounded flex items-center"
            >
              <Plus size={14} className="mr-1" />
              Add Transaction
            </button>
          </div>

          {transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="bg-white rounded-md border p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-full mr-3 ${
                          transaction.type === "Acquisition"
                            ? "bg-green-100"
                            : transaction.type === "Dispute"
                              ? "bg-red-100"
                              : "bg-blue-100"
                        }`}
                      >
                        {transaction.type === "Acquisition" ? (
                          <FileCheck size={16} className="text-green-600" />
                        ) : transaction.type === "Dispute" ? (
                          <Users size={16} className="text-red-600" />
                        ) : (
                          <FileText size={16} className="text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{transaction.type}</h4>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    {transaction.amount > 0 && (
                      <div className="text-sm font-medium">₹{transaction.amount.toLocaleString()}</div>
                    )}
                  </div>

                  <div className="text-xs text-gray-600 mb-2">
                    {transaction.fromParty} {transaction.toParty ? `→ ${transaction.toParty}` : ""}
                  </div>

                  {transaction.notes && <div className="text-xs text-gray-600 mb-2">{transaction.notes}</div>}

                  {transaction.documents.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {transaction.documents.map((doc, index) => (
                        <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center">
                          <FileText size={12} className="mr-1" />
                          {doc}
                          <button className="ml-1 text-gray-500 hover:text-primary">
                            <Download size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-md border p-4 text-center text-gray-500 text-sm">
              No transactions found
            </div>
          )}
        </div>

        {/* Add Transaction Form */}
        {showAddTransaction && (
          <div className="bg-white rounded-md border p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-semibold">Add New Transaction</h3>
              <button onClick={() => setShowAddTransaction(false)} className="text-gray-500 hover:text-gray-700">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                >
                  <option value="Acquisition">Acquisition</option>
                  <option value="Sale">Sale</option>
                  <option value="Dispute">Dispute</option>
                  <option value="Listing">Listing</option>
                  <option value="Survey">Survey</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                      className="w-full border rounded-md pl-9 pr-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="number"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
                      className="w-full border rounded-md pl-9 pr-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Party</label>
                  <input
                    type="text"
                    value={newTransaction.fromParty}
                    onChange={(e) => setNewTransaction({ ...newTransaction, fromParty: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    placeholder="e.g., Government"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Party</label>
                  <input
                    type="text"
                    value={newTransaction.toParty}
                    onChange={(e) => setNewTransaction({ ...newTransaction, toParty: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    placeholder="e.g., Housing Society"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={newTransaction.notes}
                  onChange={(e) => setNewTransaction({ ...newTransaction, notes: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  rows={3}
                  placeholder="Add any additional notes here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Documents</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Document name (e.g., deed.pdf)"
                    className="flex-1 border rounded-l-md px-3 py-2 text-sm"
                  />
                  <button className="bg-gray-100 border border-l-0 rounded-r-md px-3 py-2 text-sm">Add</button>
                </div>
                <div className="text-xs text-gray-500 mt-1">No documents attached</div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowAddTransaction(false)} className="px-3 py-2 border rounded-md text-sm">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onAddTransaction(newTransaction)
                    setShowAddTransaction(false)
                    // Reset form
                    setNewTransaction({
                      parcelId: parcel.parcelId,
                      type: "Acquisition",
                      date: new Date().toISOString().split("T")[0],
                      amount: 0,
                      fromParty: "",
                      toParty: "",
                      documents: [],
                      notes: "",
                    })
                  }}
                  className="px-3 py-2 bg-emerald-600 text-white rounded-md text-sm"
                  disabled={
                    !newTransaction.fromParty || (newTransaction.type === "Acquisition" && !newTransaction.toParty)
                  }
                >
                  Save Transaction
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

