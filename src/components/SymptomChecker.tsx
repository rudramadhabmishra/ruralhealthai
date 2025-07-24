import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Send, 
  Loader2, 
  Brain, 
  AlertCircle,
  CheckCircle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SymptomCheckerProps {
  onDiagnosis: (diagnosis: any) => void;
  onBack: () => void;
}

const SymptomChecker = ({ onDiagnosis, onBack }: SymptomCheckerProps) => {
  const [symptoms, setSymptoms] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const { toast } = useToast();

  // Initialize speech recognition
  useState(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSymptoms(prev => prev ? `${prev} ${transcript}` : transcript);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Could not access microphone. Please try typing your symptoms.",
          variant: "destructive",
        });
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  });

  const handleVoiceToggle = () => {
    if (!recognition) {
      toast({
        title: "Voice Not Supported",
        description: "Your browser doesn't support voice recognition. Please type your symptoms.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Please speak clearly about your symptoms.",
      });
    }
  };

  const handleSubmit = async () => {
    if (!symptoms.trim()) {
      toast({
        title: "Please describe your symptoms",
        description: "Enter your symptoms to get an AI assessment.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': 'AIzaSyCAG9CiUAFxR7x1Dm_DaWF0b7RtNqG28m0',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `As a medical AI assistant, please analyze these symptoms and provide a structured response: "${symptoms}". 

Please respond in JSON format with:
{
  "possibleConditions": ["condition1", "condition2", "condition3"],
  "severity": "low|medium|high",
  "recommendations": ["recommendation1", "recommendation2"],
  "urgency": "routine|urgent|emergency",
  "disclaimer": "This is not a substitute for professional medical advice"
}

Focus on common conditions and provide helpful but safe recommendations. Always include appropriate medical disclaimers.`
                }
              ]
            }
          ]
        }),
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]) {
        const resultText = data.candidates[0].content.parts[0].text;
        
        // Try to parse JSON response
        try {
          const jsonMatch = resultText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const diagnosis = JSON.parse(jsonMatch[0]);
            onDiagnosis({ ...diagnosis, symptoms, timestamp: new Date() });
          } else {
            // Fallback if JSON parsing fails
            onDiagnosis({
              possibleConditions: ["General consultation recommended"],
              severity: "medium",
              recommendations: [resultText],
              urgency: "routine",
              symptoms,
              timestamp: new Date()
            });
          }
        } catch (parseError) {
          // Fallback response
          onDiagnosis({
            possibleConditions: ["Medical consultation recommended"],
            severity: "medium", 
            recommendations: [resultText],
            urgency: "routine",
            symptoms,
            timestamp: new Date()
          });
        }
      }

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Assessment Error",
        description: "Unable to process symptoms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const commonSymptoms = [
    "Headache", "Fever", "Cough", "Fatigue", "Nausea", 
    "Stomach Pain", "Back Pain", "Dizziness", "Sore Throat"
  ];

  const handleSymptomClick = (symptom: string) => {
    setSymptoms(prev => prev ? `${prev}, ${symptom.toLowerCase()}` : symptom.toLowerCase());
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="mb-4"
          >
            ← Back to Home
          </Button>
        </div>
        
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Describe Your{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Symptoms
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI will analyze your symptoms and provide preliminary health insights
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 shadow-card border-0 bg-card/50 backdrop-blur-sm">
            {/* Quick Symptom Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Quick Select Common Symptoms
              </h3>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <Badge
                    key={symptom}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleSymptomClick(symptom)}
                  >
                    {symptom}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Text Input */}
            <div className="mb-6">
              <Textarea
                placeholder="Describe your symptoms in detail... (e.g., 'I have a headache and feeling dizzy for 2 days')"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-32 text-base resize-none border-border focus:border-primary"
              />
            </div>

            {/* Voice Input */}
            <div className="mb-6">
              <Button
                variant={isListening ? "destructive" : "outline"}
                onClick={handleVoiceToggle}
                className="w-full"
                disabled={isLoading}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    Voice Input
                  </>
                )}
              </Button>
            </div>

            {/* Submit Button */}
            <Button
              variant="medical"
              size="lg"
              onClick={handleSubmit}
              disabled={isLoading || !symptoms.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Symptoms...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Get AI Assessment
                </>
              )}
            </Button>

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Medical Disclaimer:</strong>{" "}
                  This AI assessment is for informational purposes only and should not 
                  replace professional medical advice, diagnosis, or treatment.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;