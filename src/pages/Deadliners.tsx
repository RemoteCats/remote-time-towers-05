import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeadlinerChat from "../components/DeadlinerChat";

const Deadliners: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("collaborate");
  
  return (
    <MainLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Deadliners</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Collaborate on time-sensitive projects with other remote professionals.
          Find help or offer your expertise to meet deadlines together.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mx-auto">
          <TabsTrigger value="collaborate">Collaborate</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        
        <TabsContent value="collaborate" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Need Help Meeting a Deadline?</CardTitle>
                <CardDescription>
                  Connect with qualified professionals who can assist with your project.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Post your deadline-driven project</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Set your budget and requirements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Get matched with verified professionals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Sign NDAs for confidential projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Complete your project on time</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Find Help</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Offer Your Expertise</CardTitle>
                <CardDescription>
                  Help others meet their deadlines while earning additional income.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>List your skills and availability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Set your rates and work preferences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Get matched with relevant projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Sign NDAs for client protection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Build your network and reputation</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Become a Deadliner</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Recent Collaborations</h2>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Type</TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Web Development</TableCell>
                      <TableCell>React, Node.js, MongoDB</TableCell>
                      <TableCell>3 days</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Completed
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">UI/UX Design</TableCell>
                      <TableCell>Figma, Adobe XD, Prototyping</TableCell>
                      <TableCell>5 days</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          In Progress
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Content Writing</TableCell>
                      <TableCell>SEO, Technical Writing, Copywriting</TableCell>
                      <TableCell>2 days</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Completed
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Video Editing</TableCell>
                      <TableCell>Premier Pro, After Effects</TableCell>
                      <TableCell>4 days</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Pending
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Mobile App</TableCell>
                      <TableCell>Flutter, Firebase</TableCell>
                      <TableCell>7 days</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          In Progress
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="community" className="mt-6">
          <div className="bg-primary/5 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Join Our Community</h2>
            <p className="mb-6 text-muted-foreground">
              Connect with other remote professionals and share knowledge, experiences, and opportunities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-lg font-bold">1</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Join Discussions</h3>
                <p className="text-sm text-muted-foreground">
                  Participate in topic-focused conversations about remote work challenges and solutions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Share Resources</h3>
                <p className="text-sm text-muted-foreground">
                  Contribute useful tools, articles, and resources to help fellow remote workers.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-lg font-bold">3</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Grow Network</h3>
                <p className="text-sm text-muted-foreground">
                  Build meaningful connections with professionals across different industries and time zones.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Remote Work Events</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="border-b pb-4">
                    <div className="font-medium">Remote Work Summit</div>
                    <div className="text-sm text-muted-foreground">June 15, 2025 • Virtual</div>
                    <div className="text-sm mt-1">Global gathering of remote workers sharing best practices and future trends.</div>
                  </li>
                  <li className="border-b pb-4">
                    <div className="font-medium">Async Communication Workshop</div>
                    <div className="text-sm text-muted-foreground">July 5, 2025 • Virtual</div>
                    <div className="text-sm mt-1">Learn effective async communication techniques for remote teams.</div>
                  </li>
                  <li>
                    <div className="font-medium">Time Management Masterclass</div>
                    <div className="text-sm text-muted-foreground">July 28, 2025 • Virtual</div>
                    <div className="text-sm mt-1">Strategies for managing your time effectively as a remote professional.</div>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Events</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Featured Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="border-b pb-4">
                    <div className="font-medium">The Remote Work Playbook</div>
                    <div className="text-sm text-muted-foreground">PDF Guide • 45 pages</div>
                    <div className="text-sm mt-1">Comprehensive guide to setting up your remote work environment for success.</div>
                  </li>
                  <li className="border-b pb-4">
                    <div className="font-medium">Client Communication Templates</div>
                    <div className="text-sm text-muted-foreground">Document Pack • 12 templates</div>
                    <div className="text-sm mt-1">Ready-to-use email and message templates for client communications.</div>
                  </li>
                  <li>
                    <div className="font-medium">Remote Work Tax Guide</div>
                    <div className="text-sm text-muted-foreground">Video Course • 8 lessons</div>
                    <div className="text-sm mt-1">Understanding taxes and compliance for global remote workers.</div>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Access Resource Library</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="chat" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">General Remote Work Chat</h2>
              <DeadlinerChat chatType="general" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Private Deal Discussions</h2>
              <DeadlinerChat chatType="private" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Deadliners;
