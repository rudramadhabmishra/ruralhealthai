import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stethoscope, Heart, MapPin, Mic } from "lucide-react";
import heroImage from "@/assets/healthcare-hero.jpg";

interface HeroSectionProps {
  onStartAssessment: () => void;
}

const HeroSection = ({ onStartAssessment }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-primary opacity-10" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Icon Animation */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-glow rounded-full blur-xl opacity-30 animate-pulse" />
              <Card className="relative p-6 bg-card/80 backdrop-blur-sm border-0 shadow-glow">
                <Stethoscope className="w-16 h-16 text-primary mx-auto" />
              </Card>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            <span className="text-foreground">Healthcare</span>
            <br />
            <span className="text-foreground">For</span>{" "}
            <span className="bg-gradient-healing bg-clip-text text-transparent">
              Rural Communities
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Get instant symptom assessment, AI-powered preliminary diagnosis, 
            and connect with healthcare providers in your area. Accessible healthcare 
            is just a conversation away.
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105">
              <Heart className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">AI Diagnosis</h3>
              <p className="text-sm text-muted-foreground">
                Advanced AI analyzes symptoms for preliminary health assessment
              </p>
            </Card>
            
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105">
              <MapPin className="w-8 h-8 text-accent mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Find Hospitals</h3>
              <p className="text-sm text-muted-foreground">
                Locate nearby healthcare facilities and specialists
              </p>
            </Card>
            
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105">
              <Stethoscope className="w-8 h-8 text-secondary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Home Remedies</h3>
              <p className="text-sm text-muted-foreground">
                Traditional Ayurvedic solutions for common health issues
              </p>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="medical" 
              size="xl"
              className="group"
              onClick={onStartAssessment}
            >
              <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Start Voice Assessment
            </Button>
            
            <Button 
              variant="healing" 
              size="xl"
              className="group"
              onClick={onStartAssessment}
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Text Consultation
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Multilingual Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span>Privacy Protected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;