'use client';
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GraduationCap, ChevronRight } from "lucide-react"

const applications = [
  { id: 1, title: "STEM Excellence Scholarship", amount: 5000, deadline: "2023-08-31" },
  { id: 2, title: "Future Leaders Grant", amount: 3000, deadline: "2023-09-15" },
  { id: 3, title: "Diversity in Tech Scholarship", amount: 4000, deadline: "2023-09-30" },
  { id: 4, title: "Women in Engineering Fund", amount: 3500, deadline: "2023-10-15" },
  { id: 5, title: "Environmental Studies Grant", amount: 2500, deadline: "2023-10-31" },
  { id: 6, title: "First-Generation College Scholarship", amount: 5000, deadline: "2023-11-15" },
  { id: 7, title: "Arts and Humanities Fellowship", amount: 3000, deadline: "2023-12-01" },
  { id: 8, title: "Global Citizenship Award", amount: 4500, deadline: "2023-12-15" },
]

export function Applications() {
  return (
    (<Card className="w-[80%] min-w-[30%] max-w-[130%px] mr-4">
      <CardHeader className="sticky top-0 z-10 border-b bg-background">
        <CardTitle className="flex items-center gap-2 text-primary">
          <GraduationCap className="w-6 h-6" />
          Scholarship Applications
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <ScrollArea className="h-[47.5vh] pr-4">
          <AnimatePresence>
            {applications.map((app) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-4">
                <Card className="transition-shadow duration-300 group hover:shadow-lg">
                  <CardContent className="p-4">
                    <h3
                      className="mb-2 text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                      {app.title}
                    </h3>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Amount: ${app.amount.toLocaleString()}
                    </p>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Deadline: {new Date(app.deadline).toLocaleDateString()}
                    </p>
                    <div className="flex items-center justify-between">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                          Know More
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90">
                          Apply Now <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>)
  );
}