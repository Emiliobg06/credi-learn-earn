import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PitchPresentation } from "@/components/PitchPresentation";
import { OnboardingTutorial } from "@/components/OnboardingTutorial";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Pitch = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tutorialCompleted, setTutorialCompleted] = useState(false);

  const handleTutorialComplete = (data: Record<string, string>) => {
    console.log("Tutorial completed with data:", data);
    setTutorialCompleted(true);
    toast({
      title: "¡Tutorial completado!",
      description: "Has sido registrado exitosamente en TrustCredit",
    });
  };

  const handleSkipTutorial = () => {
    setTutorialCompleted(true);
    toast({
      title: "Tutorial omitido",
      description: "Puedes volver a hacerlo más tarde desde tu perfil",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="border-b border-border bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2 text-[#004977] hover:bg-[#004977]/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a la App
            </Button>
            <div className="flex items-center gap-4">
              <img
                src="/images/capital-one-logo.png"
                alt="Capital One"
                className="h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://logos-world.net/wp-content/uploads/2021/02/Capital-One-Logo.png";
                }}
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#004977] to-[#da291c] bg-clip-text text-transparent">
                TrustCredit
              </h1>
            </div>
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <Tabs defaultValue="tutorial" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-[#004977]/10">
            <TabsTrigger
              value="tutorial"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#004977] data-[state=active]:to-[#da291c] data-[state=active]:text-white"
            >
              Tutorial Interactivo
            </TabsTrigger>
            <TabsTrigger
              value="presentation"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#004977] data-[state=active]:to-[#da291c] data-[state=active]:text-white"
            >
              Presentación
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tutorial">
            <OnboardingTutorial
              onComplete={handleTutorialComplete}
              onSkip={handleSkipTutorial}
            />
          </TabsContent>

          <TabsContent value="presentation">
            <PitchPresentation />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-[#004977]/20 bg-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img
              src="/images/capital-one-logo.png"
              alt="Capital One"
              className="h-6 object-contain"
              onError={(e) => {
                e.currentTarget.src = "https://logos-world.net/wp-content/uploads/2021/02/Capital-One-Logo.png";
              }}
            />
            <span className="text-[#004977] font-semibold">x</span>
            <span className="font-bold text-[#004977]">TrustCredit</span>
          </div>
          <p className="text-sm text-gray-600">
            Transformando la formalización en México a través de incentivos tangibles
          </p>
          <p className="text-xs text-gray-500 mt-2">Hackathon 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Pitch;
