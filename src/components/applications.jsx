'use client';
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GraduationCap, Calendar, DollarSign, ChevronRight } from "lucide-react"
import { Description } from '@radix-ui/react-dialog';

const applications = [
  { id: 1, title: "Merit-Based High School Scholarship", amount: 5000, deadline: "2024-10-12", color: "bg-gradient-to-r from-white to-yellow-50" ,Description:"A scholarship for students who have excelled in their 10th-grade exams, providing financial assistance to pursue higher education"},
  { id: 2, title: "National Talent Search Scholarship (NTSS)", amount: 7500, deadline: "2024-09-15", color: "bg-gradient-to-r from-white to-blue-50" ,Description:"Awarded to students who show exceptional academic talent and have cleared the NTSS exam after their 10th grade."},
  { id: 3, title: "Undergraduate Excellence Scholarship", amount: 3000, deadline: "2024-09-30", color: "bg-gradient-to-r from-white to-green-50" ,Description:"This scholarship supports students who have performed well in their 12th board exams and are enrolling in UG courses"},
  { id: 4, title: "Science Stream Scholarship", amount: 4000, deadline: "2024-10-15", color: "bg-gradient-to-r from-white to-purple-50" ,Description:"For students pursuing science courses after 12th, this scholarship offers financial support for tuition fees and related expenses."},
  { id: 5, title: "Postgraduate Research Fellowship", amount: 2500, deadline: "2024-10-31", color: "bg-gradient-to-r from-white to-pink-50" ,Description:"For students who are pursuing their postgraduate studies and engaging in research. Provides funds for tuition and research materials."},
]

export  function Applications() {
  return (
    <Card className="ma[70%]x-w-4xl mx-auto overflow-hidden bg-white border-spacing-1 shadow-lg w- rounded-xl">
      <div className="p-6 border bg-gradient-to-r from-white to-gray-100">
        <h2 className="flex items-center text-2xl font-bold text-gray-800">
          <GraduationCap className="w-8 h-8 mr-2 text-gray-600" />
          Applications
        </h2>
      </div>
      <ScrollArea className="h-[calc(100vh-200px)] px-6 py-4">
        <AnimatePresence>
          {applications.map((app) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-6">
              <Card className="overflow-hidden transition-all duration-300 border border-gray-200 group hover:shadow-xl">
                <CardContent className="p-0">
                  <div className={`p-6 ${app.color}`}>
                    <h3 className="mb-2 text-xl font-semibold text-gray-800">{app.title}</h3>
                    <div className="flex items-center justify-between text-gray-700">
                      <p className="flex items-center">
                        <DollarSign className="w-5 h-5 mr-1 text-green-600" />
                        ${app.amount.toLocaleString()}
                      </p>
                      <p className="flex items-center">
                        <Calendar className="w-5 h-5 mr-1 text-red-600" />
                        {new Date(app.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <p className="mb-4 text-gray-600">
                     {app.Description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        className="text-gray-600 transition-colors duration-300 border-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white">
                        Learn More
                      </Button>
                      <Button
                        className="text-white transition-all duration-300 shadow-md bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 hover:shadow-lg">
                        Apply Now <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>
    </Card>
  );
}
