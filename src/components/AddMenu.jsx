'use client'

import { useState, useEffect } from 'react'
import { Bell, Search, X, User, Settings, HelpCircle, LogOut, Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from 'framer-motion'

export  function Menubar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(3)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme)
  }, [isDarkTheme])

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  const handleSearch = () => {
    console.log('Search Query:', searchQuery)
  }

  return (
    <div className="h-20 bg-white border-b border-gray-200 shadow-md">
      <div className="container px-6 mx-auto">
        <div className="flex items-center justify-end h-16 gap-4">
          {isSearchOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center w-1/2"
            >
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search scholarships..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full transition-all duration-300 ease-in-out bg-white border-gray-300 rounded-full focus:border-gray-500 focus:ring-gray-500"
                />
                <motion.div
                  whileTap={{ scale: 1.2 }}
                  className="absolute inset-y-0 flex items-center cursor-pointer right-3"
                  onClick={handleSearch}
                >
                  <Search className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                </motion.div>
              </div>
              <motion.div whileTap={{ scale: 1.2 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                >
                  <X className="w-5 h-5" />
                  <span className="sr-only">Close search</span>
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              >
                <Search className="w-5 h-5" />
                <span className="sr-only">Open search</span>
              </Button>
            </motion.div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="relative text-gray-600 hover:bg-gray-200 hover:text-gray-800 group">
                  <Bell className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:rotate-12" />
                  <span className="sr-only">Open notifications</span>
                  <AnimatePresence>
                    {unreadNotifications > 0 && (
                      <motion.span
                        key="notification-badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full"
                      >
                        {unreadNotifications}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="bg-white border-gray-200 w-80 bg-opacity-90 backdrop-blur-xl animate-in slide-in-from-top-10"
              sideOffset={5}
            >
              <DropdownMenuLabel className="font-semibold text-gray-800">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200" />
              {[
                { title: "New scholarship available", desc: "Check out the STEM Excellence Award" },
                { title: "Application deadline", desc: "Merit Scholarship closes in 3 days" },
                { title: "Recommendation received", desc: "Prof. Smith submitted your recommendation" }
              ].map((item, index) => (
                <DropdownMenuItem 
                  key={index}
                  className="transition-all duration-300 ease-in-out focus:bg-gray-100 focus:text-gray-800 hover:bg-gray-100 group"
                  onSelect={() => setUnreadNotifications(prev => Math.max(0, prev - 1))}
                >
                  <div className="flex flex-col transition-transform duration-100 group-hover:translate-x-1">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-sm text-gray-600">{item.desc}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-600 hover:bg-gray-200 hover:text-gray-800"
            >
              {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </motion.div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.2 }}>
                <Button variant="ghost" size="icon" className="relative hover:bg-gray-200 group">
                  <Avatar className="transition-transform duration-300 ease-in-out group-hover:scale-105">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback className="text-gray-600 bg-gray-200"><User className="w-4 h-4" /></AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Open user menu</span>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-white border-gray-200 bg-opacity-90 backdrop-blur-md animate-out slide-in-from-top-5"
              sideOffset={5}
            >
              <DropdownMenuLabel className="font-semibold text-gray-800">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200" />
              {[{ icon: User, label: "Profile" }, { icon: Settings, label: "Settings" }, { icon: HelpCircle, label: "Help" }, { icon: LogOut, label: "Log out" }]
                .map((menuItem, index) => (
                  <DropdownMenuItem 
                    key={index}
                    className="transition-all duration-300 ease-in-out focus:bg-gray-100 focus:text-gray-800 hover:bg-gray-100 group"
                  >
                    <menuItem.icon className="w-4 h-4 mr-2 text-gray-600 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                    {menuItem.label}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}