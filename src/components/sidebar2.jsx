import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Menu, X, Home, Settings, Users, FileText, BarChart, HelpCircle } from "lucide-react";
import { useState } from 'react';
import Logo from '../image/logo.png'; // Your logo
import VideoSrc from '../video/video.mp4'; // Your uploaded video

const navItems = [
  { name: 'Dashboard', icon: Home },
  { name: 'User Management', icon: Users, children: [
      { name: 'User List', icon: FileText },
      { name: 'User Roles', icon: Settings },
      { name: 'User Analytics', icon: BarChart },
    ]
  },
  { name: 'Content', icon: FileText, children: [
      { name: 'Articles', icon: FileText },
      { name: 'Categories', icon: Settings },
      { name: 'Tags', icon: Settings },
    ]
  },
  { name: 'Analytics', icon: BarChart },
  { name: 'Settings', icon: Settings },
  { name: 'Help & Support', icon: HelpCircle },
];

export function SideBar({ isOpen, toggleSidebar }) {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpand = (itemName) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName]
    );
  };

  const renderNavItems = (items, level = 0) => {
    return items.map((item, index) => (
      <motion.li key={item.name}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeInOut' }}>
        <motion.div className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${level === 0 ? 'hover:bg-accent' : 'hover:bg-accent/50'} transition-colors`}
          whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}
          onClick={() => item.children ? toggleExpand(item.name) : null}>
          <item.icon className="w-5 h-5" />
          {isOpen && <span className="flex-grow overflow-hidden whitespace-nowrap">{item.name}</span>}
          {item.children && isOpen && (
            <motion.div initial={false} animate={{ rotate: expandedItems.includes(item.name) ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          )}
        </motion.div>
        {item.children && isOpen && expandedItems.includes(item.name) && (
          <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }} className="mt-1 ml-4 space-y-1">
            {renderNavItems(item.children, level + 1)}
          </motion.ul>
        )}
      </motion.li>
    ));
  };

  const sidebarVariants = {
    open: { width: '300px', transition: { duration: 0.6, ease: 'easeInOut' }, opacity: 1 },
    closed: { width: '60px', transition: { duration: 0.6, ease: 'easeInOut' }, opacity: 0.9 },
  };

  return (
    <motion.div className="relative">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        className={`fixed top-0 right-0 w-full h-full object-cover z-0 transition-all mt-12 duration-300 ${isOpen ? 'w-[calc(100%-300px)] opacity-5' : 'w-full opacity-10'}`}
        style={{ transition: 'width 0.6s ease-in-out, opacity 0.8s ease-in-out' }}
      >
        <source src={VideoSrc} type="video/mp4" />
      </video>

      {/* Sidebar */}
      <motion.div
        className="fixed top-0 left-0 z-40 h-full border-r bg-background/95 backdrop-blur-sm"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        <Button
          variant="outline"
          size="icon"
          className={`fixed z-50 transition-all duration-300 top-4 ${isOpen ? 'left-[260px]' : 'left-4'} bg-background/50 backdrop-blur-sm hover:bg-background/80`}
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
        {isOpen && (
          <div className="py-1 border-b pl-9 ">
            <img src={Logo} alt="Logo" className="w-44 h-22" />
          </div>
        )}
        <ScrollArea className="h-full px-2">
          <nav className={`${isOpen ? 'py-2' : 'py-16'} transition-all duration-300`}>
            <ul className="space-y-2">{renderNavItems(navItems)}</ul>
          </nav>
        </ScrollArea>
      </motion.div>
    </motion.div>
  );
}
