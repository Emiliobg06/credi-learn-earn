# 🎓 Tutorial Interactivo CrediSense - Capital One

## 📋 Descripción

El **Tutorial Interactivo** es un asistente paso a paso que guía a los nuevos usuarios a través del proceso de registro y formalización en CrediSense, haciendo preguntas clave y proporcionando información contextual.

---

## 🎯 Objetivo

Convertir el proceso de formalización de algo intimidante a una experiencia **guiada, educativa y gratificante**.

---

## 📝 Flujo del Tutorial

### **Paso 1: Bienvenida**
- Presenta CrediSense y su propuesta de valor
- **Pregunta:** ¿Ya tienes tu negocio registrado en el SAT?
- **Opciones:**
  - ✅ Sí, ya tengo RFC
  - ⏳ Estoy en proceso
  - ❌ No, aún no tengo RFC

**Tip educativo:** Explica qué es el RFC y por qué es importante

---

### **Paso 2: Tipo de Negocio**
- **Pregunta:** ¿Qué tipo de negocio tienes?
- **Opciones:**
  - 🏪 Comercio (tienda, abarrotes)
  - 🔧 Servicios (peluquería, reparaciones)
  - 🍽️ Alimentos (restaurant, café)
  - 🏭 Manufactura o producción
  - 📦 Otro

**Recompensa:** +50 CrediPoints

**Tip educativo:** Personalización de recomendaciones según el sector

---

### **Paso 3: Volumen de Operación**
- **Pregunta:** ¿Cuánto vendes aproximadamente al mes?
- **Opciones:**
  - 💵 Menos de $5,000 MXN → Nivel Bronce
  - 💰 $5,000 - $15,000 MXN → Nivel Plata
  - 💳 $15,000 - $30,000 MXN → Nivel Oro
  - 💎 Más de $30,000 MXN → Nivel Platino

**Beneficio:** Determina el límite de microcrédito inicial

**Tip educativo:** Información confidencial para calcular score

---

### **Paso 4: Facturación Electrónica**
- **Pregunta:** ¿Emites facturas electrónicas actualmente?
- **Opciones:**
  - ✅ Sí, ya facturo electrónicamente → +100 CrediPoints
  - 📄 Solo facturas en papel → Ayuda para digitalizar
  - ❌ No emito facturas → Tutorial incluido

**Tip educativo:** La facturación electrónica es obligatoria y da más beneficios

---

### **Paso 5: Cuenta Bancaria**
- **Pregunta:** ¿Tienes una cuenta bancaria a nombre de tu negocio?
- **Opciones:**
  - 🏦 Sí, cuenta empresarial → +150 CrediPoints
  - 👤 Solo cuenta personal → Recomendación de apertura
  - ❌ No tengo cuenta bancaria → Conexión con partners

**Tip educativo:** Separar finanzas personales del negocio

---

### **Paso 6: Datos de Contacto**
- **Pregunta:** ¿Cuál es tu correo electrónico?
- **Input:** Campo de texto para email

**Tip educativo:** Para actualizaciones de score y beneficios

---

### **Paso 7: ¡Completado!**
- 🎉 Felicitaciones
- 📊 Resumen de puntos ganados (calculado dinámicamente)
- ✅ Beneficios desbloqueados:
  - Acceso al Marketplace
  - Score inicial calculado
  - Guía personalizada

---

## 🎨 Características de Diseño

### **Colores Capital One**
- **Azul Principal:** `#004977`
- **Rojo Acento:** `#da291c`
- **Gris:** `#53565a`
- **Blanco:** `#ffffff`

### **Elementos Visuales**
- 📊 **Barra de Progreso:** Muestra avance en tiempo real
- 🔵 **Indicadores de Paso:** Círculos que muestran pasos completados
- ✅ **Checkmarks:** Para respuestas seleccionadas
- 💡 **Tips educativos:** Cuadros informativos azules
- 🏆 **Recompensas visibles:** Badges mostrando puntos ganados

### **Interactividad**
- Radio buttons para opciones múltiples
- Inputs validados para datos de contacto
- Botones de navegación (Anterior/Siguiente)
- Opción de "Saltar tutorial"
- Transiciones suaves entre pasos

---

## 🔢 Sistema de Puntuación

| Acción | Puntos |
|--------|--------|
| **Registro base** | +100 pts |
| **Tiene RFC** | +150 pts |
| **En proceso RFC** | +75 pts |
| **Sin RFC** | +50 pts |
| **Facturación electrónica** | +100 pts |
| **Cuenta empresarial** | +150 pts |
| **Cuenta personal** | +75 pts |
| **Cada respuesta** | +50 pts mínimo |

**Puntuación Promedio al completar:** 400-600 CrediPoints

---

## 📱 Flujo de Usuario

```
┌─────────────────────────┐
│   Usuario llega a       │
│   /pitch                │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   Tab: Tutorial         │
│   Interactivo           │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   Paso 1: Bienvenida    │
│   ¿RFC registrado?      │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   Paso 2-6: Preguntas   │
│   progresivas           │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   Paso 7: Completado    │
│   Resumen + Recompensas │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   Redirección al        │
│   Dashboard principal   │
└─────────────────────────┘
```

---

## 💼 Casos de Uso

### **Caso 1: Negocio Completamente Informal**
**Perfil:** Sin RFC, sin facturación, ventas $8K/mes

**Experiencia:**
1. Descubre que necesita RFC (+ tutorial SAT)
2. Aprende sobre facturación electrónica
3. Recibe guía para abrir cuenta empresarial
4. Obtiene **350 CrediPoints** iniciales
5. Nivel: **Plata** con microcrédito hasta $15K

---

### **Caso 2: Semi-formal**
**Perfil:** Con RFC, sin facturación electrónica, ventas $20K/mes

**Experiencia:**
1. Validación de RFC existente (+150 pts)
2. Tutorial de facturación digital
3. Ya tiene cuenta, recibe +150 pts
4. Obtiene **550 CrediPoints** iniciales
5. Nivel: **Oro** con microcrédito hasta $30K

---

### **Caso 3: Negocio Formal**
**Perfil:** RFC, facturación electrónica, cuenta empresarial, $40K/mes

**Experiencia:**
1. Reconocimiento de formalización completa
2. Validación rápida de datos
3. Obtiene **700 CrediPoints** iniciales
4. Nivel: **Platino** con microcrédito hasta $50K
5. Acceso inmediato a partners premium

---

## 🎓 Valor Educativo

### **Información que Aprende el Usuario:**

| Concepto | Explicación Provista |
|----------|---------------------|
| **RFC** | Qué es, para qué sirve, cómo obtenerlo (gratis) |
| **Facturación E** | Obligatoriedad, beneficios, facilidad de uso |
| **Cuenta Empresarial** | Separación de finanzas, beneficios fiscales |
| **Formalización** | No es un castigo, sino una oportunidad |
| **Score de Crédito** | Cómo se calcula, cómo mejorarlo |
| **Microcréditos** | Alternativas a la banca tradicional |

---

## 🔗 Integración

### **Ubicación en la App:**
- **Ruta:** `/pitch` → Tab "Tutorial Interactivo"
- **Alternativa:** Modal en primera visita al dashboard

### **Datos Capturados:**
```typescript
{
  step1: "yes" | "no" | "partial",  // RFC
  step2: "comercio" | "servicios" | ...,  // Tipo negocio
  step3: "0-5k" | "5k-15k" | ...,  // Volumen
  step4: "yes" | "manual" | "no",  // Facturación
  step5: "business" | "personal" | "no",  // Cuenta
  step6: "email@example.com"  // Email
}
```

### **Acciones Post-Tutorial:**
1. **Crear perfil de usuario** con datos capturados
2. **Asignar nivel inicial** (Bronce/Plata/Oro/Platino)
3. **Calcular score base** usando respuestas
4. **Acreditar CrediPoints** según puntuación
5. **Generar roadmap personalizado** de formalización
6. **Redireccionar** al dashboard principal

---

## 🚀 Próximos Pasos

### **Mejoras Futuras:**
- [ ] Guardar progreso (puede retomar después)
- [ ] Integración con API SAT para validar RFC
- [ ] Conexión con bancos para abrir cuentas
- [ ] Video tutoriales embebidos en cada paso
- [ ] Chat con asesor en vivo
- [ ] Versión mobile optimizada
- [ ] Traducción a lenguas indígenas
- [ ] Modo offline para zonas rurales

---

## 📊 Métricas de Éxito

| Métrica | Objetivo |
|---------|----------|
| **Tasa de Completación** | >80% usuarios completan tutorial |
| **Tiempo Promedio** | 5-7 minutos |
| **Satisfacción** | >4.5/5 estrellas |
| **Conversión a Formal** | >40% inician proceso SAT |
| **Retención** | >60% regresan en 7 días |

---

<div align="center">

## 🌟 Tutorial Interactivo CrediSense

**Guiando a las pymes mexicanas hacia la formalización, un paso a la vez**

Powered by **Capital One** 🔵🔴

</div>
