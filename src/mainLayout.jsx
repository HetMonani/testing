'use client';
import { useState } from 'react';
import { SideBar } from './components/sidebar2';
import { ContentArea } from './components/contentArea';

export function MainLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle sidebar open/close
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Render Sidebar and pass the state and toggle function */}
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Render Content Area and pass whether the sidebar is open */}
      <ContentArea isSidebarOpen={isSidebarOpen} />
    </div>
  );
}
