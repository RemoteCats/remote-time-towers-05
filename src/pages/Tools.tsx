
import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MusicPlayer from "../components/MusicPlayer";
import Calculator from "../components/tools/Calculator";
import Scheduler from "../components/tools/Scheduler";
import VoiceNotes from "../components/tools/VoiceNotes";

interface Tool {
  name: string;
  description: string;
  icon: string;
  url: string;
  category: string;
}

const tools: Tool[] = [
  {
    name: "Notion",
    description: "All-in-one workspace for notes, tasks, wikis, and databases.",
    icon: "📝",
    url: "https://notion.so",
    category: "Productivity",
  },
  {
    name: "Slack",
    description: "Channel-based messaging platform for team communication.",
    icon: "💬",
    url: "https://slack.com",
    category: "Communication",
  },
  {
    name: "Zoom",
    description: "Video conferencing tool for virtual meetings and webinars.",
    icon: "📹",
    url: "https://zoom.us",
    category: "Communication",
  },
  {
    name: "Asana",
    description: "Work management platform for teams to track and organize work.",
    icon: "📅",
    url: "https://asana.com",
    category: "Project Management",
  },
  {
    name: "Trello",
    description: "Visual tool for organizing work using boards, lists, and cards.",
    icon: "📋",
    url: "https://trello.com",
    category: "Project Management",
  },
  {
    name: "Figma",
    description: "Collaborative interface design tool for teams.",
    icon: "🎨",
    url: "https://figma.com",
    category: "Design",
  },
  {
    name: "GitHub",
    description: "Platform for version control and collaboration for code.",
    icon: "📊",
    url: "https://github.com",
    category: "Development",
  },
  {
    name: "Calendly",
    description: "Automated scheduling tool for setting up meetings.",
    icon: "📅",
    url: "https://calendly.com",
    category: "Productivity",
  },
  {
    name: "Loom",
    description: "Video messaging for work, record quick videos for async communication.",
    icon: "🎥",
    url: "https://www.loom.com",
    category: "Communication",
  },
  {
    name: "Miro",
    description: "Online collaborative whiteboard platform for teams.",
    icon: "🖌️",
    url: "https://miro.com",
    category: "Collaboration",
  },
  {
    name: "Toggl",
    description: "Time tracking software for teams and freelancers.",
    icon: "⏱️",
    url: "https://toggl.com",
    category: "Productivity",
  },
  {
    name: "1Password",
    description: "Password manager for teams and individuals.",
    icon: "🔒",
    url: "https://1password.com",
    category: "Security",
  },
  {
    name: "Clockify",
    description: "Time tracking app for teams and freelancers.",
    icon: "⏰",
    url: "https://clockify.me",
    category: "Productivity",
  },
  {
    name: "Hunter.io",
    description: "Email finder and lead generation tool.",
    icon: "📧",
    url: "https://hunter.io",
    category: "Communication",
  },
  {
    name: "Krisp",
    description: "Noise cancelling app for calls.",
    icon: "🔇",
    url: "https://krisp.ai",
    category: "Communication",
  },
  {
    name: "Grammarly",
    description: "Writing assistance tool for error-free writing.",
    icon: "✍️",
    url: "https://grammarly.com",
    category: "Productivity",
  },
  {
    name: "Motivate.Clock",
    description: "Daily motivation quotes and reminders for remote workers.",
    icon: "💪",
    url: "https://motivateclock.com",
    category: "Motivation",
  },
];

const Tools: React.FC = () => {
  const categories = [...new Set(tools.map((tool) => tool.category))];
  const [activeTab, setActiveTab] = useState<string>("external-tools");

  return (
    <MainLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Remote Work Tools</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Essential tools and resources to boost your remote work productivity.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mx-auto">
          <TabsTrigger value="external-tools">External Tools</TabsTrigger>
          <TabsTrigger value="built-in-tools">Built-in Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="external-tools" className="mt-6">
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools
                  .filter((tool) => tool.category === category)
                  .map((tool) => (
                    <Card key={tool.name} className="hover:shadow-lg transition-all">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{tool.icon}</span>
                            <CardTitle>{tool.name}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {tool.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                          <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                            Visit Site
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="built-in-tools" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Productivity Tools</h2>
              <div className="space-y-6">
                <MusicPlayer />
                <Calculator />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Organization Tools</h2>
              <div className="space-y-6">
                <Scheduler />
                <VoiceNotes />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Tools;
