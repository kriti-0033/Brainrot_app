import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/quiz-hero.jpg";

interface StartPageProps {
  onStart: (email: string) => void;
}

const StartPage = ({ onStart }: StartPageProps) => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleStart = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to start the quiz.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    onStart(email);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8 animate-fade-in">
          <img 
            src={heroImage} 
            alt="Quiz Hero" 
            className="w-full max-w-2xl mx-auto rounded-lg shadow-elegant mb-8"
          />
          <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Knowledge Quiz Challenge
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test your knowledge with 15 challenging questions across various topics. 
            You have 30 minutes to complete the quiz.
          </p>
        </div>

        <Card className="max-w-md mx-auto animate-scale-in shadow-glow">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Ready to Start?</CardTitle>
            <CardDescription>
              Enter your email address to begin the quiz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-center"
                onKeyPress={(e) => e.key === 'Enter' && handleStart()}
              />
            </div>
            <Button 
              onClick={handleStart} 
              className="w-full" 
              variant="hero"
              size="lg"
            >
              Start Quiz Challenge
            </Button>
            
            <div className="text-sm text-muted-foreground text-center space-y-1">
              <p>• 15 questions across multiple topics</p>
              <p>• 30 minutes time limit</p>
              <p>• Navigate freely between questions</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StartPage;