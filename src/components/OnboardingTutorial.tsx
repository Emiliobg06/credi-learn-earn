import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowLeft,
  FileText,
  Building2,
  CreditCard,
  Receipt,
  Award,
  Sparkles,
  AlertCircle
} from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: any;
  question?: string;
  options?: { value: string; label: string; info?: string }[];
  inputType?: "text" | "email" | "tel";
  placeholder?: string;
  tip?: string;
}

const tutorialSteps: Step[] = [
  {
    id: 1,
    title: "Bienvenido a TrustCredit",
    description: "Te ayudaremos a formalizar tu negocio paso a paso, ganando beneficios en cada etapa.",
    icon: Sparkles,
    question: "¿Ya tienes tu negocio registrado en el SAT?",
    options: [
      { value: "yes", label: "Sí, ya tengo RFC", info: "Perfecto! Avanzaremos más rápido" },
      { value: "no", label: "No, aún no tengo RFC", info: "No te preocupes, te guiaremos en el proceso" },
      { value: "partial", label: "Estoy en proceso", info: "Te ayudaremos a completarlo" }
    ],
    tip: "El RFC es tu Registro Federal de Contribuyentes - es gratis y lo necesitas para operar formalmente"
  },
  {
    id: 2,
    title: "Información del Negocio",
    description: "Cuéntanos sobre tu emprendimiento",
    icon: Building2,
    question: "¿Qué tipo de negocio tienes?",
    options: [
      { value: "comercio", label: "Comercio (tienda, abarrotes)", info: "+50 CrediPoints" },
      { value: "servicios", label: "Servicios (peluquería, reparaciones)", info: "+50 CrediPoints" },
      { value: "alimentos", label: "Alimentos (restaurant, café)", info: "+50 CrediPoints" },
      { value: "manufactura", label: "Manufactura o producción", info: "+50 CrediPoints" },
      { value: "otro", label: "Otro", info: "+50 CrediPoints" }
    ],
    tip: "Esto nos ayuda a personalizar las recomendaciones para tu sector"
  },
  {
    id: 3,
    title: "Volumen de Operación",
    description: "Información sobre tus ventas mensuales",
    icon: CreditCard,
    question: "¿Cuánto vendes aproximadamente al mes?",
    options: [
      { value: "0-5k", label: "Menos de $5,000 MXN", info: "Nivel Bronce - microcréditos hasta $5K" },
      { value: "5k-15k", label: "$5,000 - $15,000 MXN", info: "Nivel Plata - microcréditos hasta $15K" },
      { value: "15k-30k", label: "$15,000 - $30,000 MXN", info: "Nivel Oro - microcréditos hasta $30K" },
      { value: "30k+", label: "Más de $30,000 MXN", info: "Nivel Platino - microcréditos hasta $50K" }
    ],
    tip: "Esta información es confidencial y solo se usa para calcular tu score inicial"
  },
  {
    id: 4,
    title: "Facturación Electrónica",
    description: "Sistema de facturación para transacciones formales",
    icon: Receipt,
    question: "¿Emites facturas electrónicas actualmente?",
    options: [
      { value: "yes", label: "Sí, ya facturo electrónicamente", info: "+100 CrediPoints - Excelente!" },
      { value: "manual", label: "Solo facturas en papel", info: "Te ayudaremos a digitalizar" },
      { value: "no", label: "No emito facturas", info: "Te enseñaremos cómo hacerlo fácilmente" }
    ],
    tip: "La facturación electrónica es obligatoria y te da acceso a más beneficios en TrustCredit"
  },
  {
    id: 5,
    title: "Cuenta Bancaria",
    description: "Para recibir pagos y microcréditos",
    icon: Building2,
    question: "¿Tienes una cuenta bancaria a nombre de tu negocio?",
    options: [
      { value: "business", label: "Sí, cuenta empresarial", info: "+150 CrediPoints - Ideal!" },
      { value: "personal", label: "Solo cuenta personal", info: "Te recomendaremos abrir una empresarial" },
      { value: "no", label: "No tengo cuenta bancaria", info: "Te conectaremos con partners para abrirla" }
    ],
    tip: "Una cuenta empresarial separa tus finanzas personales del negocio"
  },
  {
    id: 6,
    title: "Datos de Contacto",
    description: "Para mantenernos en comunicación",
    icon: FileText,
    question: "¿Cuál es tu correo electrónico?",
    inputType: "email",
    placeholder: "tu@email.com",
    tip: "Usaremos este correo para enviarte actualizaciones de tu score y beneficios desbloqueados"
  },
  {
    id: 7,
    title: "¡Todo Listo!",
    description: "Has completado tu perfil inicial",
    icon: Award,
    tip: "Ahora puedes comenzar a usar TrustCredit y ganar recompensas"
  }
];

interface OnboardingTutorialProps {
  onComplete?: (data: Record<string, string>) => void;
  onSkip?: () => void;
}

export const OnboardingTutorial = ({ onComplete, onSkip }: OnboardingTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const step = tutorialSteps[currentStep];
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;
  const isLastStep = currentStep === tutorialSteps.length - 1;

  const calculateRewards = () => {
    let points = 100; // Base points
    Object.entries(answers).forEach(([key, value]) => {
      if (value === "yes" || value === "business") points += 150;
      else if (value === "partial" || value === "manual" || value === "personal") points += 75;
      else points += 50;
    });
    return points;
  };

  const handleNext = () => {
    if (step.options && selectedOption) {
      setAnswers(prev => ({ ...prev, [`step${step.id}`]: selectedOption }));
      setSelectedOption("");
    } else if (step.inputType && inputValue) {
      setAnswers(prev => ({ ...prev, [`step${step.id}`]: inputValue }));
      setInputValue("");
    }

    if (isLastStep) {
      onComplete?.(answers);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    if (step.options) return selectedOption !== "";
    if (step.inputType) return inputValue.trim() !== "";
    return true; // Welcome and completion steps
  };

  const Icon = step.icon;

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      {/* Capital One Branding Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/images/capital-one-logo.png"
            alt="Capital One"
            className="h-8 object-contain"
            onError={(e) => {
              e.currentTarget.src = "https://logos-world.net/wp-content/uploads/2021/02/Capital-One-Logo.png";
            }}
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-[#004977] to-[#da291c] bg-clip-text text-transparent">
            TrustCredit
          </span>
        </div>
        <Button variant="ghost" onClick={onSkip} className="text-[#004977]">
          Saltar tutorial
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#004977]">Paso {currentStep + 1} de {tutorialSteps.length}</span>
          <span className="text-sm text-gray-600">{Math.round(progress)}% completado</span>
        </div>
        <Progress value={progress} className="h-2 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-[#004977] to-[#da291c] transition-all"
            style={{ width: `${progress}%` }}
          />
        </Progress>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center gap-2 mb-8">
        {tutorialSteps.map((s, idx) => (
          <div key={s.id} className="flex flex-col items-center">
            {idx < currentStep ? (
              <CheckCircle2 className="h-6 w-6 text-[#da291c]" />
            ) : idx === currentStep ? (
              <Circle className="h-6 w-6 text-[#004977] fill-current" />
            ) : (
              <Circle className="h-6 w-6 text-gray-300" />
            )}
          </div>
        ))}
      </div>

      {/* Main Card */}
      <Card className="border-2 border-[#004977] shadow-xl">
        <CardHeader className="bg-gradient-to-r from-[#004977] to-[#00447c] text-white pb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur">
              <Icon className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-2xl">{step.title}</CardTitle>
              <CardDescription className="text-gray-100 text-base mt-1">
                {step.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8 pb-6 min-h-[300px]">
          {isLastStep ? (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-6 bg-gradient-to-br from-[#004977]/10 to-[#da291c]/10 rounded-full">
                  <Award className="h-20 w-20 text-[#da291c]" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#004977] mb-2">
                  ¡Felicidades!
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  Has completado el proceso de registro
                </p>
                <div className="bg-gradient-to-r from-[#004977]/10 to-[#da291c]/10 p-6 rounded-lg">
                  <p className="text-2xl font-bold text-[#da291c] mb-2">
                    +{calculateRewards()} CrediPoints
                  </p>
                  <p className="text-sm text-gray-600">
                    Ganados por completar tu perfil
                  </p>
                </div>
              </div>
              <div className="grid gap-3 text-left">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#004977]">Acceso al Marketplace</p>
                    <p className="text-sm text-gray-600">10,000+ usuarios verán tu negocio</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#004977]">Score Inicial Calculado</p>
                    <p className="text-sm text-gray-600">Basado en tus respuestas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#004977]">Guía Personalizada</p>
                    <p className="text-sm text-gray-600">Pasos específicos para tu situación</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {step.question && (
                <div>
                  <h3 className="text-xl font-semibold text-[#004977] mb-4">
                    {step.question}
                  </h3>

                  {step.options ? (
                    <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                      <div className="space-y-3">
                        {step.options.map((option) => (
                          <div
                            key={option.value}
                            className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              selectedOption === option.value
                                ? "border-[#da291c] bg-[#da291c]/5"
                                : "border-gray-200 hover:border-[#004977] hover:bg-gray-50"
                            }`}
                            onClick={() => setSelectedOption(option.value)}
                          >
                            <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                            <Label
                              htmlFor={option.value}
                              className="flex-1 cursor-pointer"
                            >
                              <p className="font-medium text-[#004977]">{option.label}</p>
                              {option.info && (
                                <p className="text-sm text-gray-600 mt-1">{option.info}</p>
                              )}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  ) : step.inputType ? (
                    <div className="space-y-3">
                      <Input
                        type={step.inputType}
                        placeholder={step.placeholder}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="text-lg p-6 border-2 border-gray-200 focus:border-[#004977]"
                      />
                    </div>
                  ) : null}
                </div>
              )}

              {step.tip && (
                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-[#004977] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#004977] text-sm mb-1">Tip Útil</p>
                    <p className="text-sm text-gray-700">{step.tip}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between pt-6 border-t bg-gray-50">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="border-[#004977] text-[#004977] hover:bg-[#004977] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>

          <div className="flex items-center gap-2">
            {!isLastStep && (
              <Badge variant="secondary" className="bg-[#004977]/10 text-[#004977] px-4 py-2">
                +{step.options ? 50 : step.inputType ? 25 : 100} puntos
              </Badge>
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-[#004977] to-[#da291c] hover:opacity-90 text-white px-8"
            >
              {isLastStep ? "Comenzar" : "Siguiente"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Partner Badge */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          En colaboración con{" "}
          <span className="font-semibold text-[#004977]">Capital One</span>
        </p>
      </div>
    </div>
  );
};
