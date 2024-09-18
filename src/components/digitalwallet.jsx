'use client'

import { motion } from "framer-motion";
import { BookOpen, Calendar, GraduationCap, History, DollarSign } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DigitalWallet() {
  const [balance, setBalance] = useState(5000.00);

  return (
    <Card className="overflow-hidden shadow-lg border-spacing-2 bg-gradient-to-b from-white to-gray-50 rounded-xl">
    <div className="border-b border-gray-200 bg-gradient-to-r from-white to-gray-100">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
        <GraduationCap className="w-5 h-5 text-gray-600" />
        ScholarVault Wallet
      </h2>
    </div>
    <CardContent className="p-4 overflow-y-auto h-[calc(100%-60px)] custom-scrollbar">
      <div className="p-3 mb-4 rounded-lg shadow-inner bg-gradient-to-r from-white to-gray-100">
        <p className="mb-1 text-sm font-medium text-gray-600">Available Balance</p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-baseline"
        >
          <DollarSign className="mr-1 text-2xl text-green-500" />
          <span className="text-3xl font-bold text-gray-800">{balance.toFixed(2)}</span>
        </motion.div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
            <Calendar className="w-4 h-4 text-gray-500" />
            Upcoming Payment
          </h3>
          <div className="p-2 border border-gray-200 rounded-md shadow-sm bg-gradient-to-r from-white to-gray-50">
            <p className="text-sm font-medium text-gray-800">Fall Semester Tuition</p>
            <p className="text-xs text-gray-600">Due: Aug 10, 2023</p>
            <p className="mt-1 text-sm font-bold text-gray-600">$4,500.00</p>
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
            <History className="w-4 h-4 text-gray-500" />
            Recent Transactions
          </h3>
          <ul className="space-y-2">
            {[
              { desc: "Book Allowance", amount: 150.0, date: "Jul 1" },
              { desc: "Summer Grant", amount: 2000.0, date: "Jun 15" },
            ].map((transaction, index) => (
              <li key={index} className="flex items-center justify-between p-2 text-xs transition-all duration-300 border border-gray-200 rounded-md shadow-sm bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-white">
                <span className="flex items-center gap-2 text-gray-700">
                  <BookOpen className="w-3 h-3 text-gray-500" />
                  {transaction.desc}
                </span>
                <span
                  className={transaction.amount > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}
                >
                  {transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardContent>
  </Card>
  );
}