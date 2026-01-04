import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Send,
  Bot,
  User,
  Sparkles,
  Dumbbell,
  Apple,
  TrendingUp,
  Heart,
  Loader2
} from 'lucide-react';
import { aiApi, type ChatMessage } from '../services/api';
import { toast } from 'sonner';

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm your AI health coach. I'm here to help you with fitness advice, meal suggestions, and answer any health-related questions. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      suggestions: [
        'Suggest a workout',
        'Plan my meals',
        'Track my progress',
        'Give health tips'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const quickActions = [
    { icon: Dumbbell, label: 'Workout Plan', color: 'bg-blue-100 text-blue-600' },
    { icon: Apple, label: 'Meal Suggestion', color: 'bg-green-100 text-green-600' },
    { icon: TrendingUp, label: 'Progress Check', color: 'bg-purple-100 text-purple-600' },
    { icon: Heart, label: 'Health Tips', color: 'bg-red-100 text-red-600' },
  ];

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputMessage.trim();
    if (!messageText || isLoading) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare conversation history (last 10 messages + new user message for context)
      // Exclude the initial greeting message from history
      const allMessages = [...messages, newUserMessage];
      const recentHistory: ChatMessage[] = allMessages
        .filter(msg => {
          // Exclude the initial greeting
          if (msg.sender === 'ai' && msg.text.includes("Hello! I'm your AI health coach")) {
            return false;
          }
          return true;
        })
        .slice(-10)
        .map(msg => ({
          sender: msg.sender,
          text: msg.text,
        }));

      // Get AI response
      const response = await aiApi.chat(messageText, recentHistory);

      if (response.success && response.data) {
        const aiResponse: Message = {
          id: messages.length + 2,
          sender: 'ai',
          text: response.data.message,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        };

        setMessages(prev => [...prev, aiResponse]);
      } else {
        throw new Error(response.message || 'Failed to get AI response');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get AI response. Please try again.';
      toast.error(errorMessage);
      
      // Show error message in chat
      const errorResponse: Message = {
        id: messages.length + 2,
        sender: 'ai',
        text: 'I apologize, but I encountered an error. Please try again in a moment.',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">AI Coach</h1>
        <p className="text-gray-600">Your personal fitness and nutrition assistant</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  AI Health Coach
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                    Online
                  </Badge>
                </CardTitle>
                <CardDescription>Powered by advanced AI algorithms</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px] p-6" ref={scrollAreaRef}>
              <div className="space-y-4">
                {isLoading && messages[messages.length - 1]?.sender === 'user' && (
                  <div className="flex gap-3">
                    <Avatar className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600">
                      <AvatarFallback>
                        <Bot className="w-5 h-5 text-white" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="inline-block p-4 rounded-lg bg-gray-100 text-gray-900">
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </div>
                    </div>
                  </div>
                )}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <Avatar className={`w-10 h-10 flex-shrink-0 ${
                      message.sender === 'ai' 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                        : 'bg-gray-200'
                    }`}>
                      <AvatarFallback>
                        {message.sender === 'ai' ? (
                          <Bot className="w-5 h-5 text-white" />
                        ) : (
                          <User className="w-5 h-5 text-gray-600" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex-1 ${message.sender === 'user' ? 'flex justify-end' : ''}`}>
                      <div
                        className={`inline-block p-4 rounded-lg max-w-[80%] ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.text}</p>
                        <p className={`text-xs mt-2 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-sm"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="Ask me anything about fitness, nutrition, or health..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1"
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading || !inputMessage.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleSendMessage(action.label)}
                >
                  <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center mr-3`}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  {action.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                AI Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                  <p className="text-gray-600">Personalized workout recommendations</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                  <p className="text-gray-600">Customized meal plans and recipes</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                  <p className="text-gray-600">Real-time progress tracking analysis</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                  <p className="text-gray-600">Health and wellness guidance</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                  <p className="text-gray-600">24/7 availability for support</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-900 mb-1">Premium AI Features</p>
                <p className="text-sm text-gray-600 mb-4">
                  Unlock advanced health insights and personalized coaching
                </p>
                <Button variant="outline" size="sm" className="bg-white">
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
