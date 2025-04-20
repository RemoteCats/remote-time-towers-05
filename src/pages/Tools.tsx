
import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

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
];

const Tools: React.FC = () => {
  const categories = [...new Set(tools.map((tool) => tool.category))];

  return (
    <MainLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Remote Work Tools</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Essential tools and resources to boost your remote work productivity.
        </p>
      </div>

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
    </MainLayout>
  );
};

export default Tools;
