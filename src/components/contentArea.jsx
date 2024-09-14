import { Card, CardHeader, CardContent, CardDescription } from './ui/card';
import { motion } from 'framer-motion';
import Profile from '../image/profile.png';
import { useEffect, useState } from 'react';
import { Menubar } from './AddMenu';

import { DigitalWallet } from './digitalwallet';
import { Applications } from './applications';
  
export function ContentArea({ isSidebarOpen }) {
  // State to hold current date
  const [currentDate, setCurrentDate] = useState('');

  // Set current date when the component loads
  useEffect(() => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString(undefined, options));
  }, []);

  return (
    <motion.div
      className="flex-1 overflow-auto bg-background"
      initial={{ marginLeft: '60px' }}
      animate={{ marginLeft: isSidebarOpen ? '300px' : '60px' }} // Adjust based on sidebar state
      transition={{ type: 'spring', stiffness: 120, damping: 20, ease: 'easeInOut' }}
    >
      {/* Menubar at the top */}
      <Menubar />

      <div className='flex flex-col justify-between p-4'>
        <Card className="mb-3">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Text Content */}
            <div className='flex flex-col '>
              {/* Display Current Date */}
              <CardHeader className="pt-1 text-sm text-gray-500">{currentDate}</CardHeader>

              <CardContent className="text-xl font-semibold">Welcome</CardContent>
              <CardDescription className="text-gray-600">Hello, how are you?</CardDescription>
            </div>

            {/* Profile Image */}
            <img src={Profile} alt="Profile" className="object-cover w-32 bg-gray-400 rounded-full " />
          </div>
        </Card>
      <div className='flex justify-between'>
      <Applications></Applications>
      <DigitalWallet></DigitalWallet>
        
      </div>
      </div>
    </motion.div>
    
  );
}
