import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  Store,
  Trophy,
  Target,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Rocket,
  Lightbulb
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const impactData = [
  { month: "Mes 1", ventas: 15000, score: 620 },
  { month: "Mes 2", ventas: 22000, score: 650 },
  { month: "Mes 3", ventas: 28000, score: 680 },
  { month: "Mes 4", ventas: 35000, score: 720 },
  { month: "Mes 5", ventas: 42000, score: 750 },
  { month: "Mes 6", ventas: 50000, score: 780 }
];

const incentivesData = [
  { name: "CrediPoints", value: 95, description: "Descuentos y recompensas", icon: Sparkles, color: "text-yellow-500" },
  { name: "Marketplace", value: 85, description: "Visibilidad y clientes", icon: Store, color: "text-blue-500" },
  { name: "Crédito", value: 75, description: "Acceso financiero", icon: TrendingUp, color: "text-green-500" },
  { name: "Educación", value: 90, description: "Asesoría y capacitación", icon: Lightbulb, color: "text-purple-500" },
  { name: "Reputación", value: 80, description: "Certificación y confianza", icon: ShieldCheck, color: "text-pink-500" }
];

const timelineSteps = [
  {
    phase: "Corto Plazo (1-4 semanas)",
    icon: Zap,
    color: "bg-yellow-500",
    benefits: [
      { name: "CrediPoints", desc: "Equivalen a descuentos o créditos en el ecosistema" },
      { name: "Exposición gratuita", desc: "Aparece en el marketplace de CrediSense" },
      { name: "Comunidad consciente", desc: "Consumidores que prefieren negocios formales" }
    ],
    example: "Juan formaliza su florería → 10,000 usuarios lo ven → obtiene pedidos + puntos → canjea por insumos"
  },
  {
    phase: "Mediano Plazo (2-6 meses)",
    icon: Target,
    color: "bg-blue-500",
    benefits: [
      { name: "Microcréditos preaprobados", desc: "Basados en tu score de confianza" },
      { name: "Recompensas de aliados", desc: "Descuentos en software contable, asesorías" },
      { name: "Certificaciones", desc: "Negocio verificado por CrediSense" }
    ],
    example: "Con 50 transacciones formales, accedes a microcrédito de $10,000 MXN sin trámites bancarios"
  },
  {
    phase: "Largo Plazo (6+ meses)",
    icon: Trophy,
    color: "bg-purple-500",
    benefits: [
      { name: "Reputación establecida", desc: "4.8★ en confianza financiera" },
      { name: "Lealtad de clientes", desc: "Otros usuarios canjean puntos comprándote" },
      { name: "Score IA mejorado", desc: "Puerta a financiamiento externo tradicional" }
    ],
    example: "Tu negocio se convierte en referente local, ganas visibilidad orgánica y fidelizas clientes"
  }
];

const problemSolutionMatrix = [
  {
    problem: "Trámites complejos y tiempo",
    solution: "Proceso guiado paso a paso con IA",
    impact: "80% menos tiempo"
  },
  {
    problem: "Costos sin beneficios visibles",
    solution: "Recompensas inmediatas en cada paso",
    impact: "+250 CrediPoints promedio"
  },
  {
    problem: "No acceso a crédito",
    solution: "Score alternativo basado en comportamiento",
    impact: "Microcréditos desde día 1"
  },
  {
    problem: "Sin educación financiera",
    solution: "Capacitación gamificada y asesoría",
    impact: "100+ lecciones disponibles"
  }
];

export const PitchPresentation = () => {
  const [selectedIncentive, setSelectedIncentive] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl text-white p-12">
        <div className="flex justify-center mb-4">
          <Rocket className="h-16 w-16 animate-bounce" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight">
          CrediSense
        </h1>
        <p className="text-2xl font-light max-w-3xl mx-auto">
          Transformando la formalización en México desde una carga a una oportunidad de crecimiento
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Badge className="text-lg px-6 py-2 bg-white text-purple-600">
            <Users className="h-5 w-5 mr-2" />
            10,000+ microempresas potenciales
          </Badge>
          <Badge className="text-lg px-6 py-2 bg-white text-purple-600">
            <TrendingUp className="h-5 w-5 mr-2" />
            $200M+ MXN en valor económico
          </Badge>
        </div>
      </div>

      {/* Main Problem */}
      <Card className="border-2 border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Target className="h-8 w-8 text-red-600" />
            El Problema Real
          </CardTitle>
        </CardHeader>
        <CardContent className="text-lg space-y-4">
          <p className="font-semibold text-red-900">
            En México, un pequeño comerciante informal NO VE el valor inmediato de formalizarse, solo el costo:
          </p>
          <ul className="space-y-2 list-none">
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">✗</span>
              <span>Trámites complejos, impuestos, SAT, facturas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">✗</span>
              <span>No hay beneficios visibles inmediatos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">✗</span>
              <span>Los bancos no prestan aunque lo intente</span>
            </li>
          </ul>
          <div className="bg-red-100 p-4 rounded-lg border border-red-300 mt-4">
            <p className="text-xl font-bold text-red-800 text-center">
              "¿Para qué formalizarme si no gano nada?"
            </p>
          </div>
        </CardContent>
      </Card>

      {/* The Solution */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            La Solución: Invertir la Ecuación
          </CardTitle>
          <CardDescription className="text-lg">
            CrediSense hace que formalizarte traiga beneficios inmediatos y progresivos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {problemSolutionMatrix.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border border-green-200 hover:border-green-400 transition-all">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-red-500 text-sm">Problema:</span>
                  <p className="text-sm font-medium">{item.problem}</p>
                </div>
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-green-600 text-sm">Solución:</span>
                  <p className="text-sm font-semibold">{item.solution}</p>
                </div>
                <Badge className="bg-green-600 text-white">
                  {item.impact}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Tabs */}
      <Tabs defaultValue="incentivos" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="incentivos" className="text-sm md:text-base py-3">
            <Sparkles className="h-4 w-4 mr-2" />
            Incentivos
          </TabsTrigger>
          <TabsTrigger value="timeline" className="text-sm md:text-base py-3">
            <TrendingUp className="h-4 w-4 mr-2" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="impacto" className="text-sm md:text-base py-3">
            <BarChart3 className="h-4 w-4 mr-2" />
            Impacto
          </TabsTrigger>
          <TabsTrigger value="ejemplo" className="text-sm md:text-base py-3">
            <Users className="h-4 w-4 mr-2" />
            Caso Real
          </TabsTrigger>
        </TabsList>

        {/* Incentivos Tab */}
        <TabsContent value="incentivos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sistema de Incentivos Tangibles</CardTitle>
              <CardDescription>
                Beneficios que cambian la ecuación costo-beneficio de formalizarse
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {incentivesData.map((incentive, idx) => {
                const Icon = incentive.icon;
                return (
                  <div
                    key={idx}
                    className="space-y-2 p-4 rounded-lg hover:bg-gray-50 transition-all cursor-pointer border border-gray-200"
                    onClick={() => setSelectedIncentive(idx)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className={`h-6 w-6 ${incentive.color}`} />
                        <div>
                          <p className="font-semibold text-lg">{incentive.name}</p>
                          <p className="text-sm text-muted-foreground">{incentive.description}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-lg px-4 py-1">
                        {incentive.value}%
                      </Badge>
                    </div>
                    <Progress value={incentive.value} className="h-3" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-600" />
                Valor Percibido por el Usuario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <p className="text-3xl font-bold text-yellow-600">💵</p>
                  <p className="font-semibold mt-2">Económico</p>
                  <p className="text-sm text-muted-foreground">Ahorro y descuentos reales</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <p className="text-3xl font-bold text-blue-600">📣</p>
                  <p className="font-semibold mt-2">Comercial</p>
                  <p className="text-sm text-muted-foreground">Más ventas y exposición</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <p className="text-3xl font-bold text-green-600">🤝</p>
                  <p className="font-semibold mt-2">Social</p>
                  <p className="text-sm text-muted-foreground">Confianza y reputación</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          {timelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Card key={idx} className="border-2 hover:shadow-lg transition-all">
                <CardHeader className={`${step.color} text-white rounded-t-lg`}>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Icon className="h-8 w-8" />
                    {step.phase}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid gap-3">
                    {step.benefits.map((benefit, bidx) => (
                      <div key={bidx} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">{benefit.name}</p>
                          <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                    <p className="font-semibold text-blue-900 mb-1">Ejemplo Real:</p>
                    <p className="text-blue-800">{step.example}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* Impacto Tab */}
        <TabsContent value="impacto" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Proyección de Impacto</CardTitle>
              <CardDescription>
                Evolución de ventas y score de confianza en 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={impactData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="ventas"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      name="Ventas (MXN)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="score"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Score de Confianza"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">+233%</CardTitle>
                <CardDescription className="text-blue-100">
                  Crecimiento en ventas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">De $15,000 a $50,000 MXN mensuales</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">+160</CardTitle>
                <CardDescription className="text-green-100">
                  Puntos de Score
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">De 620 a 780 en confianza financiera</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">$200M+</CardTitle>
                <CardDescription className="text-purple-100">
                  Valor económico generado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Con 10,000 microempresas en el ecosistema</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Ejemplo Tab */}
        <TabsContent value="ejemplo" className="space-y-6">
          <Card className="border-2 border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6" />
                Caso de Estudio: Juan y su Florería
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">Registro Inicial</p>
                    <p className="text-muted-foreground">
                      Juan registra su florería y completa los pasos básicos de formalización (RFC, cuenta bancaria, facturación electrónica)
                    </p>
                    <Badge className="mt-2 bg-green-100 text-green-800">+100 CrediPoints</Badge>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">Exposición en Marketplace</p>
                    <p className="text-muted-foreground">
                      Su florería aparece en el marketplace de CrediSense con 10,000 usuarios activos
                    </p>
                    <Badge className="mt-2 bg-blue-100 text-blue-800">Visibilidad Gratuita</Badge>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">Primeras Ventas</p>
                    <p className="text-muted-foreground">
                      Recibe pedidos de consumidores conscientes que prefieren negocios formalizados
                    </p>
                    <Badge className="mt-2 bg-yellow-100 text-yellow-800">+15 pedidos en 2 semanas</Badge>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">Canje de Puntos</p>
                    <p className="text-muted-foreground">
                      Canjea sus CrediPoints por insumos (tierra, fertilizantes) o servicios contables
                    </p>
                    <Badge className="mt-2 bg-purple-100 text-purple-800">Ahorro de $2,500 MXN</Badge>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">Acceso a Microcrédito</p>
                    <p className="text-muted-foreground">
                      Después de 3 meses y 50 transacciones formales, accede a un microcrédito de $10,000 MXN
                    </p>
                    <Badge className="mt-2 bg-green-100 text-green-800">Sin banca tradicional</Badge>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200">
                <p className="font-bold text-xl text-center mb-2">Resultado en 6 meses:</p>
                <div className="grid md:grid-cols-3 gap-4 text-center mt-4">
                  <div>
                    <p className="text-3xl font-bold text-green-600">+233%</p>
                    <p className="text-sm text-muted-foreground">Ventas</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-600">780</p>
                    <p className="text-sm text-muted-foreground">Score</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-purple-600">4.8★</p>
                    <p className="text-sm text-muted-foreground">Reputación</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Key Message */}
      <Card className="border-4 border-blue-600 bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            La Formalización Ya No Es un Castigo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xl text-center font-medium">
            Con CrediSense, cada paso hacia la formalidad genera beneficios inmediatos:
            puntos, clientes, reputación y acceso a herramientas financieras.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-2xl font-bold text-center text-blue-900">
              Las pymes dejan de ver la formalización como una obligación,
              y la ven como una oportunidad de crecimiento y confianza.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg px-8" onClick={() => navigate('/demo')}>
              Ver Demo en Vivo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gamification Teaser */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-600" />
            Fortalecimiento: Gamificación de Progreso Formal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            {["Bronce", "Plata", "Oro", "Platino"].map((tier, idx) => (
              <div
                key={tier}
                className={`p-6 rounded-lg text-center border-2 transition-all hover:scale-105 ${
                  idx === 0 ? "border-orange-400 bg-orange-50" :
                  idx === 1 ? "border-gray-400 bg-gray-50" :
                  idx === 2 ? "border-yellow-400 bg-yellow-50" :
                  "border-purple-400 bg-purple-50"
                }`}
              >
                <Trophy className={`h-12 w-12 mx-auto mb-2 ${
                  idx === 0 ? "text-orange-600" :
                  idx === 1 ? "text-gray-600" :
                  idx === 2 ? "text-yellow-600" :
                  "text-purple-600"
                }`} />
                <p className="font-bold text-lg">{tier}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {idx * 25 + 10} transacciones
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="font-semibold text-blue-900">Partners Potenciales:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge>SAT Educativo</Badge>
              <Badge>Tiendanube</Badge>
              <Badge>Clip</Badge>
              <Badge>Mercado Pago</Badge>
              <Badge>Capital One</Badge>
              <Badge>Software Contable</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
