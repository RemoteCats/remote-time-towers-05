
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  senderName: string;
  timestamp: Date;
  isPrivate?: boolean;
}

interface ChatProps {
  chatType: 'private' | 'general';
}

const DeadlinerChat: React.FC<ChatProps> = ({ chatType = 'general' }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to the Remote Clocker chat!',
      sender: 'other',
      senderName: 'System',
      timestamp: new Date(),
      isPrivate: false
    },
    {
      id: '2',
      text: chatType === 'private' 
        ? 'This is a private chat for deadline collaborations. You can discuss project details and arrangements here.' 
        : 'This is the general Remote PMO chat. Discuss remote work tips, opportunities, and experiences.',
      sender: 'other',
      senderName: 'System',
      timestamp: new Date(),
      isPrivate: chatType === 'private'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'private'>(chatType);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      senderName: 'Anonymous User',
      timestamp: new Date(),
      isPrivate: activeTab === 'private'
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulate a response in private chat
    if (activeTab === 'private') {
      setTimeout(() => {
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your message. Let's discuss the project details further. When is your deadline?",
          sender: 'other',
          senderName: 'Collaborator',
          timestamp: new Date(),
          isPrivate: true
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }, 2000);
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          {activeTab === 'private' ? 'Private Deal Chat' : 'Remote PMO General Chat'}
        </CardTitle>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'general' | 'private')}>
        <TabsList className="mx-4">
          <TabsTrigger value="general">General Chat</TabsTrigger>
          <TabsTrigger value="private">Private Deals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="flex-1 mt-0">
          <div className="h-[400px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages
                .filter(m => !m.isPrivate)
                .map(message => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{getInitials(message.senderName)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className={`rounded-lg p-3 ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary'
                        }`}>
                          {message.text}
                        </div>
                        <div className={`text-xs mt-1 text-muted-foreground ${
                          message.sender === 'user' ? 'text-right' : ''
                        }`}>
                          {message.senderName} • {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            
            <CardContent className="pt-2 pb-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1"
                />
                <Button type="submit">Send</Button>
              </form>
            </CardContent>
          </div>
        </TabsContent>
        
        <TabsContent value="private" className="flex-1 mt-0">
          <div className="h-[400px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages
                .filter(m => m.isPrivate)
                .map(message => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{getInitials(message.senderName)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className={`rounded-lg p-3 ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}>
                          {message.text}
                        </div>
                        <div className={`text-xs mt-1 text-muted-foreground ${
                          message.sender === 'user' ? 'text-right' : ''
                        }`}>
                          {message.senderName} • {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            
            <CardContent className="pt-2 pb-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your private message here..."
                  className="flex-1"
                />
                <Button type="submit">Send</Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">
                Private messages are end-to-end encrypted and only visible to you and your collaborator.
              </p>
            </CardContent>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default DeadlinerChat;
