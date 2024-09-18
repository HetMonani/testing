import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Menu, X, Home, Settings, Users, FileText, BarChart, HelpCircle, Upload } from "lucide-react";
import { useState } from 'react';

import logo from '../image/logo.png';


const navItems = [
  { name: 'Dashboard', icon: Home },
  { name: 'User Management', icon: Users, children: [
      { name: 'Profile Manage', icon: FileText },
      { name: 'Applied ScholarShips', icon: Settings },
      { name: 'Transaction', icon: BarChart },
    ]
  },
  { name: 'My Documents', icon: FileText, children: [
      { name: 'images', icon: FileText },
      { name: 'Profile detail', icon: Settings },
      { name: 'bank detail', icon: Settings },
    ]
  },
  { name: 'Upload', icon: Upload }, // Changed from 'Analytics' to 'Upload'
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
        <motion.div className={`NavItem flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${level === 0 ? 'hover:bg-accent' : 'hover:bg-accent/50'} transition-colors`}
          whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}
          onClick={() => item.children ? toggleExpand(item.name) : null}>
          <item.icon className="w-6 h-6 NavItemIcon" />
          {isOpen && <span className="flex-grow overflow-hidden NavItemText whitespace-nowrap">{item.name}</span>}
          {item.children && isOpen && (
            <motion.div initial={false} animate={{ rotate: expandedItems.includes(item.name) ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
              <ChevronDown className="w-4 h-4 ExpandIcon" />
            </motion.div>
          )}
        </motion.div>
        {item.children && isOpen && expandedItems.includes(item.name) && (
          <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }} className="mt-1 ml-4 space-y-1 Submenu">
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
    <motion.div className="relative SidebarWrapper">
      <motion.div
        className="fixed top-0 left-0 z-40 h-full border-r shadow-lg Sidebar bg-background/95 backdrop-blur-sm"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        <Button
          variant="outline"
          size="icon"
          className={`SidebarToggle fixed z-50 transition-all duration-300 top-4 ${isOpen ? 'left-[260px]' : 'left-4'} bg-background/50 backdrop-blur-sm hover:bg-background/80`}
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="w-4 h-4 CloseIcon" /> : <Menu className="w-4 h-4 MenuIcon" />}
        </Button>
        {isOpen && (
          <div className="flex items-center justify-start h-20 pl-3 border-b shadow-md border-primary/10 LogoContainer" >
            <img src={logo} alt="Logo" className="w-[50%] h-[9vh] LogoImage" />
          </div>
        )}
        <ScrollArea className="h-full px-2 SidebarScrollArea">
          <nav className={`${isOpen ? 'NavOpen py-2' : 'NavClosed py-16'} transition-all duration-300`}>
            <ul className="space-y-2 NavList">{renderNavItems(navItems)}</ul>
          </nav>
        </ScrollArea>
      </motion.div>
    </motion.div>
  );
}