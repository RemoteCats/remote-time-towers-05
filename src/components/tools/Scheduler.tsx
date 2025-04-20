
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Task {
  id: string;
  title: string;
  time: string;
  completed: boolean;
}

const Scheduler: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');
  
  const addTask = () => {
    if (!newTaskTitle.trim()) {
      toast({
        title: "Please enter a task title",
        variant: "destructive",
      });
      return;
    }
    
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTaskTitle,
      time: newTaskTime,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskTime('');
    
    toast({
      title: "Task added to schedule",
      description: `${newTaskTitle} scheduled for ${newTaskTime}`,
    });
  };
  
  const toggleTaskComplete = (id: string) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task removed",
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarClock className="mr-2 h-5 w-5" />
          Task Scheduler
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1"
          />
          <Input
            type="time"
            value={newTaskTime}
            onChange={(e) => setNewTaskTime(e.target.value)}
            className="w-32"
          />
          <Button onClick={addTask}>Add</Button>
        </div>
        
        <ul className="space-y-2">
          {tasks.length === 0 ? (
            <li className="text-center py-4 text-muted-foreground">
              No scheduled tasks. Add one to get started.
            </li>
          ) : (
            tasks.map(task => (
              <li 
                key={task.id}
                className="flex items-center justify-between p-3 rounded-md bg-secondary"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskComplete(task.id)}
                    className="mr-3 h-4 w-4"
                  />
                  <div className={task.completed ? 'line-through text-muted-foreground' : ''}>
                    <div className="font-medium">{task.title}</div>
                    {task.time && <div className="text-xs text-muted-foreground">{task.time}</div>}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeTask(task.id)}
                >
                  ×
                </Button>
              </li>
            ))
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Scheduler;
