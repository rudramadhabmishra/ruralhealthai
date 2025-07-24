import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  MapPin, 
  Leaf,
  Download,
  Share
} from "lucide-react";

interface DiagnosisProps {
  diagnosis: {
    possibleConditions: string[];
    severity: "low" | "medium" | "high";
    recommendations: string[];
    urgency: "routine" | "urgent" | "emergency";
    symptoms: string;
    timestamp: Date;
  };
  onShowHospitals: () => void;
  onShowRemedies: () => void;
  onBack: () => void;
}

const DiagnosisResults = ({ diagnosis, onShowHospitals, onShowRemedies, onBack }: DiagnosisProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-destructive";
      case "medium": return "text-primary";
      case "low": return "text-accent";
      default: return "text-foreground";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "emergency": return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case "urgent": return <Clock className="w-5 h-5 text-primary" />;
      case "routine": return <CheckCircle className="w-5 h-5 text-accent" />;
      default: return <CheckCircle className="w-5 h-5 text-accent" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString();
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="mb-4"
            >
              ← Back to Assessment
            </Button>
          </div>
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                AI Assessment
              </span>
            </h2>
            <p className="text-muted-foreground">
              Generated on {formatDate(diagnosis.timestamp)}
            </p>
          </div>

          {/* Main Results Card */}
          <Card className="p-8 mb-8 shadow-card border-0 bg-card/80 backdrop-blur-sm">
            {/* Urgency Banner */}
            <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-muted/50">
              {getUrgencyIcon(diagnosis.urgency)}
              <div>
                <h3 className="font-semibold">Urgency Level: {diagnosis.urgency.charAt(0).toUpperCase() + diagnosis.urgency.slice(1)}</h3>
                <p className="text-sm text-muted-foreground">
                  {diagnosis.urgency === "emergency" && "Seek immediate medical attention"}
                  {diagnosis.urgency === "urgent" && "Schedule an appointment soon"}
                  {diagnosis.urgency === "routine" && "Monitor symptoms and consider consultation"}
                </p>
              </div>
            </div>

            {/* Symptoms Summary */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Reported Symptoms</h3>
              <p className="text-muted-foreground bg-muted/30 p-4 rounded-lg">
                {diagnosis.symptoms}
              </p>
            </div>

            {/* Possible Conditions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Possible Conditions</h3>
              <div className="grid gap-3">
                {diagnosis.possibleConditions.map((condition, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(diagnosis.severity)} bg-current`} />
                    <span className="flex-1">{condition}</span>
                    <Badge variant="outline" className="text-xs">
                      {diagnosis.severity} risk
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                {diagnosis.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <Button 
                variant="medical" 
                size="lg" 
                onClick={onShowHospitals}
                className="w-full"
              >
                <MapPin className="w-5 h-5" />
                Find Nearby Hospitals
              </Button>
              
              <Button 
                variant="healing" 
                size="lg" 
                onClick={onShowRemedies}
                className="w-full"
              >
                <Leaf className="w-5 h-5" />
                Ayurvedic Remedies
              </Button>
            </div>
          </Card>

          {/* Additional Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
              Download Report
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4" />
              Share with Doctor
            </Button>
          </div>

          {/* Important Notice */}
          <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-primary mb-2">Important Medical Disclaimer</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This AI assessment is for informational purposes only and should not replace 
                  professional medical advice, diagnosis, or treatment. Always consult with a 
                  qualified healthcare provider for proper medical evaluation and treatment of 
                  your symptoms.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DiagnosisResults;