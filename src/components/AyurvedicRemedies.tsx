import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Info,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface Remedy {
  id: string;
  name: string;
  condition: string;
  ingredients: string[];
  preparation: string[];
  dosage: string;
  duration: string;
  precautions: string[];
  effectiveness: "mild" | "moderate" | "strong";
  difficulty: "easy" | "moderate" | "complex";
}

interface AyurvedicRemediesProps {
  onBack: () => void;
}

const AyurvedicRemedies = ({ onBack }: AyurvedicRemediesProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("all");

  const remedies: Remedy[] = [
    {
      id: "1",
      name: "Ginger Tea for Nausea",
      condition: "Nausea",
      ingredients: ["Fresh ginger (1 inch piece)", "Water (1 cup)", "Honey (optional)"],
      preparation: [
        "Peel and slice fresh ginger",
        "Boil water in a pot",
        "Add ginger slices and simmer for 5-10 minutes",
        "Strain and add honey if desired",
        "Drink warm"
      ],
      dosage: "1 cup, 2-3 times daily",
      duration: "3-5 days or until symptoms improve",
      precautions: ["Avoid if you have gallstones", "Consult doctor if pregnant"],
      effectiveness: "strong",
      difficulty: "easy"
    },
    {
      id: "2", 
      name: "Turmeric Milk for Cold",
      condition: "Cold",
      ingredients: ["Turmeric powder (1/2 tsp)", "Warm milk (1 cup)", "Black pepper (pinch)", "Honey (1 tsp)"],
      preparation: [
        "Heat milk in a saucepan",
        "Add turmeric powder and black pepper",
        "Stir well and bring to a gentle boil",
        "Remove from heat and add honey",
        "Drink warm before bedtime"
      ],
      dosage: "1 cup daily before bed",
      duration: "7-10 days",
      precautions: ["May stain teeth temporarily", "Avoid if lactose intolerant"],
      effectiveness: "moderate",
      difficulty: "easy"
    },
    {
      id: "3",
      name: "Mint Leaves for Headache",
      condition: "Headache", 
      ingredients: ["Fresh mint leaves (10-15)", "Water (1 cup)", "Lemon juice (1 tsp)"],
      preparation: [
        "Wash fresh mint leaves thoroughly",
        "Boil water and add mint leaves",
        "Steep for 5-7 minutes",
        "Strain and add lemon juice",
        "Drink warm or apply mint paste on forehead"
      ],
      dosage: "1 cup tea or topical application",
      duration: "As needed for relief",
      precautions: ["Test on small skin area first for topical use"],
      effectiveness: "mild",
      difficulty: "easy"
    },
    {
      id: "4",
      name: "Cinnamon Water for Digestive Issues",
      condition: "Stomach Pain",
      ingredients: ["Cinnamon stick (1 inch)", "Water (2 cups)", "Cardamom (2 pods)"],
      preparation: [
        "Boil water in a pot",
        "Add cinnamon stick and cardamom pods",
        "Simmer for 15-20 minutes",
        "Strain the liquid",
        "Drink warm on empty stomach"
      ],
      dosage: "1/2 cup twice daily",
      duration: "5-7 days",
      precautions: ["May lower blood sugar", "Avoid large quantities if diabetic"],
      effectiveness: "moderate",
      difficulty: "easy"
    }
  ];

  const conditions = ["all", "Headache", "Cold", "Nausea", "Stomach Pain", "Fever", "Cough"];

  const filteredRemedies = remedies.filter(remedy => {
    const matchesSearch = remedy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         remedy.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition = selectedCondition === "all" || remedy.condition === selectedCondition;
    return matchesSearch && matchesCondition;
  });

  const getEffectivenessColor = (effectiveness: string) => {
    switch (effectiveness) {
      case "strong": return "text-accent";
      case "moderate": return "text-primary";
      case "mild": return "text-muted-foreground";
      default: return "text-foreground";
    }
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="mb-4"
            >
              ← Back to Diagnosis
            </Button>
          </div>
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-healing bg-clip-text text-transparent">
                Ayurvedic
              </span>{" "}
              Home Remedies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Time-tested natural remedies from traditional Ayurvedic medicine for common health issues
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search remedies or conditions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {conditions.map((condition) => (
                <Button
                  key={condition}
                  variant={selectedCondition === condition ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCondition(condition)}
                >
                  {condition === "all" ? "All Conditions" : condition}
                </Button>
              ))}
            </div>
          </div>

          {/* Important Notice */}
          <Card className="mb-8 p-6 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-primary mb-2">Important Guidelines</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• These remedies are for mild conditions and general wellness</li>
                  <li>• Consult a healthcare provider for serious or persistent symptoms</li>
                  <li>• Stop use if you experience adverse reactions</li>
                  <li>• Not a substitute for professional medical treatment</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Remedies Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredRemedies.map((remedy) => (
              <Card key={remedy.id} className="p-6 shadow-card hover:shadow-glow transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <Leaf className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{remedy.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        For {remedy.condition}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <div className={`font-medium ${getEffectivenessColor(remedy.effectiveness)}`}>
                      {remedy.effectiveness} effect
                    </div>
                    <div className="text-muted-foreground">
                      {remedy.difficulty} to make
                    </div>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    Ingredients
                  </h4>
                  <ul className="text-sm space-y-1">
                    {remedy.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparation */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" />
                    Preparation
                  </h4>
                  <ol className="text-sm space-y-1">
                    {remedy.preparation.map((step, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-primary font-medium min-w-[20px]">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Dosage and Duration */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <h5 className="font-medium text-sm mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Dosage
                    </h5>
                    <p className="text-xs text-muted-foreground">{remedy.dosage}</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <h5 className="font-medium text-sm mb-1">Duration</h5>
                    <p className="text-xs text-muted-foreground">{remedy.duration}</p>
                  </div>
                </div>

                {/* Precautions */}
                {remedy.precautions.length > 0 && (
                  <div className="bg-destructive/10 p-3 rounded-lg">
                    <h5 className="font-medium text-sm mb-2 flex items-center gap-2 text-destructive">
                      <AlertTriangle className="w-4 h-4" />
                      Precautions
                    </h5>
                    <ul className="text-xs space-y-1">
                      {remedy.precautions.map((precaution, index) => (
                        <li key={index} className="text-muted-foreground">
                          • {precaution}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {filteredRemedies.length === 0 && (
            <Card className="p-12 text-center">
              <Leaf className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No remedies found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or condition filter
              </p>
            </Card>
          )}

          {/* Footer Disclaimer */}
          <Card className="mt-12 p-6 bg-muted/50">
            <div className="text-center">
              <h4 className="font-semibold mb-3">Traditional Wisdom Meets Modern Care</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These Ayurvedic remedies have been used for centuries and are based on traditional knowledge. 
                They work best as complementary care alongside modern medicine. Always inform your healthcare 
                provider about any home remedies you're using, especially if you're taking medications or have 
                underlying health conditions.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AyurvedicRemedies;