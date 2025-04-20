
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Mic, MicOff, Save } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface VoiceNotesProps {}

const VoiceNotes: React.FC<VoiceNotesProps> = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  
  // SpeechRecognition setup
  const recognitionRef = useRef<any>(null);
  
  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        setNotes(prev => prev + finalTranscript + ' ');
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
        toast({
          title: "Error occurred",
          description: `Speech recognition error: ${event.error}`,
          variant: "destructive"
        });
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);
  
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive"
      });
      return;
    }
    
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      toast({
        title: "Recording stopped",
        description: "You can edit your notes or start recording again."
      });
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak now to create your note."
      });
    }
  };
  
  const saveNote = () => {
    if (notes.trim()) {
      setSavedNotes([...savedNotes, notes]);
      setNotes('');
      toast({
        title: "Note saved",
        description: "Your note has been saved successfully."
      });
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mic className="mr-2 h-5 w-5" />
          Voice Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <Button
              onClick={toggleRecording}
              variant={isRecording ? "destructive" : "default"}
              className="flex items-center"
            >
              {isRecording ? (
                <>
                  <MicOff className="mr-2 h-4 w-4" /> Stop Recording
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" /> Start Recording
                </>
              )}
            </Button>
            
            <Button
              onClick={saveNote}
              variant="outline"
              disabled={!notes.trim()}
              className="flex items-center"
            >
              <Save className="mr-2 h-4 w-4" /> Save Note
            </Button>
          </div>
          
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Start recording or type your notes here..."
            className="h-32"
          />
          
          {savedNotes.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Saved Notes</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {savedNotes.map((note, index) => (
                  <div key={index} className="p-3 bg-secondary rounded-md text-sm">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceNotes;
