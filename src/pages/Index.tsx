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

  const handleBackToHome = () => {
    setCurrentStep("hero");
    setDiagnosis(null);
  };

  const handleBackToSymptoms = () => {
    setCurrentStep("symptoms");
  };

  const handleBackToDiagnosis = () => {
    setCurrentStep("diagnosis");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "hero":
        return <HeroSection onStartAssessment={handleStartAssessment} />;
      case "symptoms":
        return (
          <SymptomChecker 
            onDiagnosis={handleDiagnosis} 
            onBack={handleBackToHome}
          />
        );
      case "diagnosis":
        return diagnosis ? (
          <DiagnosisResults 
            diagnosis={diagnosis} 
            onShowHospitals={handleShowHospitals}
            onShowRemedies={handleShowRemedies}
            onBack={handleBackToSymptoms}
          />
        ) : (
          <HeroSection onStartAssessment={handleStartAssessment} />
        );
      case "hospitals":
        return <HospitalFinder onBack={handleBackToDiagnosis} />;
      case "remedies":
        return <AyurvedicRemedies onBack={handleBackToDiagnosis} />;
      default:
        return <HeroSection onStartAssessment={handleStartAssessment} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentStep()}
    </div>
  );
};

export default Index;
