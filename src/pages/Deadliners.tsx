
import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Deadliners: React.FC = () => {
  return (
    <MainLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Deadliners</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Collaborate on time-sensitive projects with other remote professionals.
          Find help or offer your expertise to meet deadlines together.
        </p>
      </div>

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

      <div className="bg-primary/5 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
        <p className="mb-6 text-muted-foreground">
          Our deadline collaboration system connects professionals through a secure and efficient process.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <span className="text-lg font-bold">1</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Post or Browse</h3>
            <p className="text-sm text-muted-foreground">
              Post your project or browse available opportunities that match your skills.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <span className="text-lg font-bold">2</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Connect & Agree</h3>
            <p className="text-sm text-muted-foreground">
              Connect with potential collaborators, sign NDAs, and agree on terms.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <span className="text-lg font-bold">3</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Collaborate</h3>
            <p className="text-sm text-muted-foreground">
              Work together through our platform to meet your deadlines with confidence.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Deadliners;
