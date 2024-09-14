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

export function Menubar() {
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
    // Handle the search logic here, e.g., send the search query to an API
    console.log('Search Query:', searchQuery)
  }

  return (
    <div className="border-b shadow-md bg-background border-primary/5">
      <div className="container px-6 mx-auto">
        <div className="flex items-center justify-end h-20 gap-4">
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
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full transition-all duration-300 ease-in-out rounded-full bg-background border-primary focus:border-primary focus:ring-primary"
                />
                <motion.div
                  whileTap={{ scale: 1.2 }}
                  className="absolute inset-y-0 flex items-center cursor-pointer right-3"
                  onClick={handleSearch} // Trigger search query on click
                >
                  <Search className="w-5 h-5 text-primary hover:text-primary-foreground" />
                </motion.div>
              </div>
              <motion.div whileTap={{ scale: 1.2 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 text-primary hover:bg-primary/40 hover:text-primary-foreground"
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
                className="text-primary hover:bg-primary/20 hover:text-primary-foreground"
              >
                <Search className="w-5 h-5" />
                <span className="sr-only">Open search</span>
              </Button>
            </motion.div>
          )}

          {/* Notifications and other menu items remain the same */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="relative text-primary hover:bg-primary/20 hover:text-primary-foreground group">
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
              className="w-80 bg-background/90 backdrop-blur-xl border-primary/90 animate-in slide-in-from-top-10"
              sideOffset={5}
            >
              <DropdownMenuLabel className="font-semibold text-primary">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-primary/30" />
              {[{ title: "New message", desc: "You have a new message from John Doe" }, { title: "Task completed", desc: "Project X has been marked as complete" }, { title: "System update", desc: "A new system update is available" }]
                .map((item, index) => (
                  <DropdownMenuItem 
                    key={index}
                    className="transition-all duration-300 ease-in-out focus:bg-primary/50 focus:text-primary-foreground hover:bg-primary/50 group"
                    onSelect={() => setUnreadNotifications(prev => Math.max(0, prev - 1))}
                  >
                    <div className="flex flex-col transition-transform duration-100 group-hover:translate-x-1">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-sm text-muted-foreground">{item.desc}</span>
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
              className="text-primary hover:bg-primary/20 hover:text-primary-foreground"
            >
              {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </motion.div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.2 }}>
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/20 group">
                  <Avatar className="transition-transform duration-300 ease-in-out group-hover:scale-105">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback className="bg-primary/20 text-primary"><User className="w-4 h-4" /></AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Open user menu</span>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-background/80 backdrop-blur-md border-primary/90 animate-out slide-in-from-top-5"
              sideOffset={5}
            >
              <DropdownMenuLabel className="font-semibold text-primary">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-primary/30" />
              {[{ icon: User, label: "Profile" }, { icon: Settings, label: "Settings" }, { icon: HelpCircle, label: "Help" }, { icon: LogOut, label: "Log out" }]
                .map((menuItem, index) => (
                  <DropdownMenuItem 
                    key={index}
                    className="transition-all duration-300 ease-in-out focus:bg-primary/50 focus:text-primary-foreground hover:bg-primary/50 group"
                  >
                    <menuItem.icon className="w-4 h-4 mr-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
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