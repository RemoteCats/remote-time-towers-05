import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const remoteWorkData = [
  { country: "United States", value: 86, previousValue: 78 },
  { country: "Canada", value: 82, previousValue: 75 },
  { country: "United Kingdom", value: 78, previousValue: 70 },
  { country: "Germany", value: 74, previousValue: 68 },
  { country: "Australia", value: 72, previousValue: 65 },
  { country: "Japan", value: 65, previousValue: 52 },
  { country: "India", value: 79, previousValue: 65 },
];
// Add one more data point for a sleeker look
const remoteTechData = [
  { sector: "Dev", value: 40 },
  { sector: "Design", value: 28 },
  { sector: "Marketing", value: 18 },
  { sector: "Support", value: 14 },
];

const growthData = [
  { name: "Jan", growth: 4.5 },
  { name: "Feb", growth: 5.2 },
  { name: "Mar", growth: 6.1 },
  { name: "Apr", growth: 5.8 },
  { name: "May", growth: 7.2 },
  { name: "Jun", growth: 8.5 },
  { name: "Jul", growth: 9.3 },
  { name: "Aug", growth: 10.2 },
  { name: "Sep", growth: 11.5 },
  { name: "Oct", growth: 12.8 },
  { name: "Nov", growth: 13.2 },
  { name: "Dec", growth: 14.5 },
];

const insightsData = [
  {
    title: "Software Development",
    percentage: 28,
    change: "+3.2%",
    positive: true,
  },
  {
    title: "Design & Creative",
    percentage: 22,
    change: "+2.7%",
    positive: true,
  },
  {
    title: "Marketing",
    percentage: 19,
    change: "+1.5%",
    positive: true,
  },
  {
    title: "Content Creation",
    percentage: 17,
    change: "+4.1%",
    positive: true,
  },
  {
    title: "Customer Support",
    percentage: 14,
    change: "-0.8%",
    positive: false,
  },
];

const Analytics: React.FC = () => {
  return (
    <MainLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Remote Work Analytics</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Data-driven insights into global remote work trends and growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Remote Workers</CardTitle>
            <CardDescription>Worldwide</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">35.7M</div>
            <p className="text-sm text-green-600">+12.4% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average Productivity</CardTitle>
            <CardDescription>Compared to office work</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+22%</div>
            <p className="text-sm text-green-600">+3.5% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Cost Savings</CardTitle>
            <CardDescription>Per remote employee yearly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$11,000</div>
            <p className="text-sm text-green-600">+7.2% from last year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Remote Work Growth Trend</CardTitle>
            <CardDescription>Annual growth rate percentage</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {/* Sleeker curved line chart instead of bar */}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="growth" fill="#6E59A5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Remote Work Countries</CardTitle>
            <CardDescription>Percentage of workforce working remotely</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={remoteWorkData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="country" />
                <Tooltip />
                <Bar dataKey="value" fill="#9b87f5" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Add Doughnut or stacked Bar for sectors breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Remote Tech Sectors</CardTitle>
            <CardDescription>Sleek stacked bar</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={remoteTechData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 15, bottom: 5 }}
                barCategoryGap="20%"
              >
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="sector" />
                <Tooltip />
                <Bar dataKey="value" fill="#FEC6A1" radius={[0, 16, 16, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Benefits of Remote Work</CardTitle>
            <CardDescription>Most reported advantages</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Improved work-life balance (87%)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Increased productivity (78%)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Reduced commuting stress (92%)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Location independence (76%)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Cost savings (68%)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Remote Job Categories</CardTitle>
            <CardDescription>Distribution by industry and growth rate</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Percentage</TableHead>
                  <TableHead className="text-right">YoY Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {insightsData.map((item) => (
                  <TableRow key={item.title}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="text-right">{item.percentage}%</TableCell>
                    <TableCell
                      className={`text-right ${
                        item.positive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.change}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Challenges of Remote Work</CardTitle>
            <CardDescription>Areas for improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">⚠</span>
                <span>Communication difficulties (62%)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">⚠</span>
                <span>Social isolation (54%)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">⚠</span>
                <span>Work-home boundary blurring (49%)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">⚠</span>
                <span>Collaboration challenges (45%)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">⚠</span>
                <span>Time zone coordination (41%)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Analytics;
