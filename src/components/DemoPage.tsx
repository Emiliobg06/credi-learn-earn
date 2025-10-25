import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Store, Wallet, BarChart3 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export const DemoPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al Pitch
        </Button>
        <h1 className="text-3xl font-bold">Demo en Vivo: CrediSense</h1>
      </div>

      {/* Demo Dashboard */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5 text-blue-600" />
              Mi Negocio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Florería "El Jardín"</p>
                <p className="text-sm text-muted-foreground">RFC: FLOR940123ABC</p>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800">Verificado</Badge>
                <Badge className="bg-blue-100 text-blue-800">Nivel Plata</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-green-600" />
              CrediPoints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600">2,500</p>
              <p className="text-sm text-muted-foreground">Puntos disponibles</p>
              <Button className="mt-4 w-full">Canjear Puntos</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Score de Confianza
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">720</p>
              <p className="text-sm text-muted-foreground">de 1000 puntos</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actividad Reciente */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Factura emitida", points: "+50", date: "Hoy" },
              { action: "Curso completado", points: "+100", date: "Ayer" },
              { action: "Venta verificada", points: "+75", date: "Hace 2 días" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {item.points} puntos
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};