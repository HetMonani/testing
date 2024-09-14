'use client'

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const scholarships = [
  { id: 1, name: "STEM Excellence Scholarship", progress: 75, deadline: "2023-08-15" },
  { id: 2, name: "Future Leaders Grant", progress: 40, deadline: "2023-09-01" },
  { id: 3, name: "Global Diversity Scholarship", progress: 90, deadline: "2023-07-30" },
  { id: 4, name: "Arts and Humanities Fund", progress: 60, deadline: "2023-08-31" },
  { id: 5, name: "Environmental Studies Award", progress: 80, deadline: "2023-08-20" },
  { id: 6, name: "Computer Science Innovation Grant", progress: 55, deadline: "2023-09-15" },
];

export function Progressbar() {
  const [showProgress, setShowProgress] = useState(false);
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollbarOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.3]);

  const scrollbarHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    setShowProgress(true);
  }, []);

  return (
    (<div className="container flex justify-end p-4 mx-auto">
      <div className="w-full max-w-md">
        <Card className="transition-all duration-300 ease-in-out hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Scholarship Application Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div
                ref={scrollRef}
                className="max-h-[49vh] overflow-y-auto pr-4 space-y-4 scrollbar-hide"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}>
                {scholarships.map((scholarship, index) => (
                  <motion.div
                    key={scholarship.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="h-2 overflow-hidden rounded-full bg-secondary">
                            <motion.div
                              className="h-full bg-primary"
                              initial={{ width: 0 }}
                              animate={{ width: showProgress ? `${scholarship.progress}%` : 0 }}
                              transition={{ duration: 1, delay: index * 0.2 }} />
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: index * 0.2 + 1 }}>
                              Progress: {scholarship.progress}%
                            </motion.span>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: index * 0.2 + 1 }}>
                              Deadline: {scholarship.deadline}
                            </motion.span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="absolute right-0.5 top-0 w-1.5 bg-gray-200 rounded"
                style={{ 
                  height: '100%',
                  originY: 0,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '6px',
                  background: 'rgba(155, 155, 155, 0.2)',
                  borderRadius: '3px'
                }}>
                <motion.div
                  className="w-full bg-primary rounded"
                  style={{
                    height: scrollbarHeight,
                    opacity: scrollbarOpacity,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }} />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>)
  );
}