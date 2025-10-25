import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PitchPresentation } from "@/components/PitchPresentation";
import { useNavigate } from "react-router-dom";

const Pitch = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="border-b border-border bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a la App
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CrediSense Pitch
            </h1>
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <PitchPresentation />
      </main>

      <footer className="border-t border-border bg-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>CrediSense - Hackathon 2025</p>
          <p className="text-sm mt-2">
            Transformando la formalización en México a través de incentivos tangibles
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Pitch;
