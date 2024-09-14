import { motion } from "framer-motion";
import { BookOpen, Calendar, GraduationCap, History } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DigitalWallet() {
  const [balance, setBalance] = useState(5000.00);

  return (
    <Card className="w-[350px]">
      <motion.div
        initial={{ height: 100 }}
        animate={{ height: 420 }}
        transition={{ duration: 0.5 }}
        className="overflow-y-auto scrollbar-container"
      >
        <CardHeader className="sticky top-0 z-10 border-b bg-background">
          <CardTitle className="flex items-center gap-2 text-primary">
            <GraduationCap className="w-6 h-6" />
            ScholarVault Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="mb-6">
            <p className="mb-3 text-sm font-medium text-muted-foreground">Available Balance</p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-baseline"
            >
              <span className="items-center text-4xl font-bold">{balance.toFixed(2)}</span>
            </motion.div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="flex items-center gap-2 mb-2 font-semibold">
                <Calendar className="w-4 h-4" />
                Upcoming Payment
              </h3>
              <div className="p-3 rounded-md bg-muted">
                <p className="text-sm font-medium">Fall Semester Tuition</p>
                <p className="text-sm text-muted-foreground">Due: Aug 15, 2023</p>
                <p className="mt-1 text-sm font-bold">3,500.00</p>
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 mb-2 font-semibold">
                <History className="w-4 h-4" />
                Recent Transactions
              </h3>
              <ul className="space-y-2">
                {[
                  { desc: "Book Allowance", amount: 150.0, date: "Jul 1" },
                  { desc: "Summer Grant", amount: 2000.0, date: "Jun 15" },
                  
                ].map((transaction, index) => (
                  <li key={index} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-3 h-3" />
                      {transaction.desc}
                    </span>
                    <span
                      className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}
                    >
                      {transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </motion.div>
      <style jsx global>{`
        .scrollbar-container {
          scrollbar-width: thin;
          scrollbar-color: hsl(var(--primary)) hsl(var(--background));
        }
        .scrollbar-container::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-container::-webkit-scrollbar-track {
          background: hsl(var(--background));
        }
        .scrollbar-container::-webkit-scrollbar-thumb {
          background-color: hsl(var(--primary));
          border-radius: 20px;
          border: 2px solid hsl(var(--background));
        }
        .scrollbar-container {
          scroll-behavior: smooth;
        }
      `}</style>
    </Card>
  );
}