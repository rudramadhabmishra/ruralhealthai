import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import SymptomChecker from "@/components/SymptomChecker";
import DiagnosisResults from "@/components/DiagnosisResults";
import HospitalFinder from "@/components/HospitalFinder";
import AyurvedicRemedies from "@/components/AyurvedicRemedies";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<"hero" | "symptoms" | "diagnosis" | "hospitals" | "remedies">("hero");
  const [diagnosis, setDiagnosis] = useState<any>(null);

  const handleStartAssessment = () => {
    setCurrentStep("symptoms");
  };

  const handleDiagnosis = (diagnosisData: any) => {
    setDiagnosis(diagnosisData);
    setCurrentStep("diagnosis");
  };

  const handleShowHospitals = () => {
    setCurrentStep("hospitals");
  };

  const handleShowRemedies = () => {
    setCurrentStep("remedies");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "hero":
        return <HeroSection />;
      case "symptoms":
        return <SymptomChecker onDiagnosis={handleDiagnosis} />;
      case "diagnosis":
        return diagnosis ? (
          <DiagnosisResults 
            diagnosis={diagnosis} 
            onShowHospitals={handleShowHospitals}
            onShowRemedies={handleShowRemedies}
          />
        ) : null;
      case "hospitals":
        return <HospitalFinder />;
      case "remedies":
        return <AyurvedicRemedies />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentStep()}
      
      {/* Navigation for development/testing */}
      {currentStep !== "hero" && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
          <button
            onClick={() => setCurrentStep("hero")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary/90 transition-colors text-sm"
          >
            ← Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
