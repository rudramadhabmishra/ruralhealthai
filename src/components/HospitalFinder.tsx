import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Navigation,
  Building2,
  Ambulance
} from "lucide-react";

interface Hospital {
  id: string;
  name: string;
  type: "government" | "private" | "clinic";
  distance: string;
  rating: number;
  specialties: string[];
  phone: string;
  address: string;
  emergency: boolean;
  coordinates: { lat: number; lng: number };
}

const HospitalFinder = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock hospital data - in real app, this would come from API
  const mockHospitals: Hospital[] = [
    {
      id: "1",
      name: "Rural District Hospital",
      type: "government",
      distance: "2.3 km",
      rating: 4.1,
      specialties: ["General Medicine", "Emergency", "Pediatrics"],
      phone: "+91 12345 67890",
      address: "Main Road, District Center",
      emergency: true,
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    {
      id: "2", 
      name: "Community Health Center",
      type: "government",
      distance: "5.7 km",
      rating: 3.8,
      specialties: ["General Medicine", "Maternity", "Vaccination"],
      phone: "+91 12345 67891",
      address: "Village Road, Sector 2",
      emergency: false,
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    {
      id: "3",
      name: "City Medical College Hospital",
      type: "government",
      distance: "15.2 km",
      rating: 4.5,
      specialties: ["Cardiology", "Neurology", "Oncology", "Emergency"],
      phone: "+91 12345 67892", 
      address: "Medical College Road, City Center",
      emergency: true,
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    {
      id: "4",
      name: "Apollo Rural Clinic",
      type: "private",
      distance: "8.1 km",
      rating: 4.3,
      specialties: ["General Medicine", "Diagnostics", "Consultation"],
      phone: "+91 12345 67893",
      address: "Highway Junction, Near Bus Stand",
      emergency: false,
      coordinates: { lat: 12.9716, lng: 77.5946 }
    }
  ];

  useEffect(() => {
    // Simulate loading and getting user location
    const timer = setTimeout(() => {
      setHospitals(mockHospitals);
      setLoading(false);
    }, 1500);

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Location access denied");
        }
      );
    }

    return () => clearTimeout(timer);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "government": return "bg-primary text-primary-foreground";
      case "private": return "bg-accent text-accent-foreground";
      case "clinic": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleDirections = (hospital: Hospital) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hospital.coordinates.lat},${hospital.coordinates.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-4 mx-auto w-64"></div>
              <div className="h-4 bg-muted rounded mb-8 mx-auto w-96"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-6">
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nearby{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Healthcare Facilities
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Find and connect with healthcare providers in your area
            </p>
          </div>

          {/* Emergency Banner */}
          <Card className="mb-8 p-6 bg-destructive/5 border-destructive/20">
            <div className="flex items-center gap-4">
              <Ambulance className="w-8 h-8 text-destructive" />
              <div className="flex-1">
                <h3 className="font-semibold text-destructive mb-1">Emergency Services</h3>
                <p className="text-sm text-muted-foreground">
                  For life-threatening emergencies, call 108 (India) or your local emergency number
                </p>
              </div>
              <Button variant="emergency" size="sm">
                Call 108
              </Button>
            </div>
          </Card>

          {/* Hospitals List */}
          <div className="space-y-6">
            {hospitals.map((hospital) => (
              <Card key={hospital.id} className="p-6 shadow-card hover:shadow-glow transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Hospital Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <Building2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-semibold">{hospital.name}</h3>
                          {hospital.emergency && (
                            <Badge variant="destructive" className="text-xs">
                              24/7 Emergency
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{hospital.distance}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{hospital.rating}</span>
                          </div>
                          <Badge className={getTypeColor(hospital.type)} variant="secondary">
                            {hospital.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{hospital.address}</p>
                        
                        {/* Specialties */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {hospital.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:w-48">
                    <Button 
                      variant="medical" 
                      size="sm" 
                      onClick={() => handleDirections(hospital)}
                      className="w-full"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleCall(hospital.phone)}
                      className="w-full"
                    >
                      <Phone className="w-4 h-4" />
                      Call Hospital
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Location Notice */}
          <Card className="mt-8 p-6 bg-muted/50">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Location Services</h4>
                <p className="text-sm text-muted-foreground">
                  {userLocation 
                    ? "Hospitals are sorted by distance from your current location." 
                    : "Enable location services for more accurate distance calculations and personalized recommendations."
                  }
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HospitalFinder;