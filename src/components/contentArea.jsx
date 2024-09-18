import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menubar } from './AddMenu';
import { Applications } from './applications';
import { Sun, Book, Trophy, GraduationCap, Calendar, DollarSign, BookOpen, History } from 'lucide-react';

export function ContentArea({ isSidebarOpen }) {
  const [currentDate, setCurrentDate] = useState('');
  const [balance, setBalance] = useState(5000.00);

  // Format date as 'Day, Month Year'
  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString(undefined, options));
  }, []);

  return (
    <motion.div
      className="flex-1 h-screen bg-white"
      initial={{ marginLeft: '80px' }}
      animate={{ marginLeft: isSidebarOpen ? '280px' : '80px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, ease: 'easeInOut' }}
    >
      <Menubar />

      <div className='flex flex-col p-6 space-y-6 h-[calc(100vh-64px)] overflow-hidden'>
        <Card className="bg-white border-none shadow-lg rounded-xl">
          <div className="p-4 bg-gradient-to-r from-white to-gray-50">
            <h1 className="text-2xl font-bold text-gray-800">Hello Ankit</h1>
            <p className="mt-1 text-sm text-gray-600">{currentDate}</p>
          </div>
          <CardContent className="p-4">
            <p className="mb-3 text-sm text-gray-600">Your gateway to educational opportunities. Explore scholarships, track your applications, and manage your academic journey all in one place.</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="flex items-center p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                <Sun className="w-6 h-6 mr-2 text-yellow-500" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">New Opportunities</h3>
                  <p className="text-xs text-gray-600">5 new scholarships</p>
                </div>
              </div>
              <div className="flex items-center p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                <Book className="w-6 h-6 mr-2 text-blue-500" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">Active Applications</h3>
                  <p className="text-xs text-gray-600">3 in progress</p>
                </div>
              </div>
              <div className="flex items-center p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                <Trophy className="w-6 h-6 mr-2 text-green-500" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">Achievements</h3>
                  <p className="text-xs text-gray-600">2 scholarships Get</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='flex flex-1 space-x-6 overflow-hidden'>
          <div className="w-2/3 overflow-hidden">
            <Applications />
          </div>
          <div className="w-1/3 overflow-hidden">
            <DigitalWallet balance={balance} />
          </div>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #E5E7EB #F9FAFB;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F9FAFB;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E5E7EB;
          border-radius: 3px;
          border: 2px solid #F9FAFB;
        }
        .custom-scrollbar {
          scroll-behavior: smooth;
        }
      `}</style>
    </motion.div>
  );
}

function DigitalWallet({ balance }) {
  return (
    <Card className="h-full overflow-hidden shadow-lg border-spacing-1 bg-gradient-to-b from-white to-gray-50 rounded-xl">
      <div className="border-b border-gray-200 bg-gradient-to-r from-white to-gray-100">
        <h2 className="flex items-center h-16 gap-2 p-2 text-lg font-bold text-gray-800">
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
            <span className="text-3xl font-bold text-gray-800">${balance.toFixed(2)}</span>
          </motion.div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
              <Calendar className="w-4 h-4 text-gray-500" />
              Upcoming Payment
            </h3>
            <div className="p-2 border border-gray-200 rounded-md shadow-sm bg-gradient-to-r from-white to-gray-50">
              <p className="text-sm font-medium text-gray-800">Fall Semester Scholarship</p>
              <p className="text-xs text-gray-600">Due: 31/ 08/ 2024</p>
              <p className="mt-1 text-sm font-bold text-gray-600">$3,500.00</p>
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
