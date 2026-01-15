# Copilot Instructions - Sistema de Gestión de Estudiantes

## Project Overview

Frontend de sistema educativo para carga masiva y visualización de estudiantes.
Next.js 16 con App Router, React 19, TypeScript y Tailwind CSS v4.

**Backend:** Proyecto separado (API REST)

## Tech Stack

- **Framework:** Next.js 16.1.2 (App Router)
- **React:** 19.2.3
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript (strict mode)
- **Forms:** React Hook Form + Zod
- **State:** Zustand (auth, global state)
- **Charts:** Recharts
- **File Parsing:** xlsx (SheetJS)
- **HTTP Client:** Fetch API con wrapper tipado

## Architecture: Feature-Based

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── layout.tsx
├── (dashboard)/
│   ├── page.tsx              # Dashboard principal
│   ├── upload/page.tsx       # Carga de archivos
│   ├── students/page.tsx     # Lista de estudiantes
│   └── layout.tsx            # Layout protegido
├── layout.tsx
└── globals.css

features/
├── auth/
│   ├── components/           # LoginForm, etc
│   ├── hooks/                # useAuth, useSession
│   ├── services/             # authService.ts
│   └── types.ts
├── students/
│   ├── components/           # StudentTable, UploadForm
│   ├── hooks/                # useStudents, useUpload
│   ├── services/             # studentService.ts
│   ├── schemas/              # studentSchema.ts (Zod)
│   └── types.ts
└── dashboard/
    ├── components/           # Charts, StatCards
    └── hooks/

components/                   # Componentes UI reutilizables
├── ui/                       # Button, Input, Card, Modal
└── layout/                   # Header, Sidebar, ProtectedRoute

lib/
├── api/                      # API client, interceptors
├── utils/                    # Helpers, formatters
└── constants.ts

hooks/                        # Hooks globales
types/                        # Tipos globales
```

## Student Data Model

```typescript
interface Student {
  id: string;
  nombre_estudiante: string; // Único, string
  anio_inicio: number; // Requerido, <= año actual
  nue: number; // Único, numérico (NUE)
  promedio_actual: number;
  promedio_graduacion: number | null;
  graduado: boolean;
  // Si graduado=true → promedio_actual === promedio_graduacion
}
```

## Validation Schema (Zod)

```typescript
// features/students/schemas/studentSchema.ts
const studentSchema = z
  .object({
    nombre_estudiante: z.string().min(1, 'Nombre requerido'),
    anio_inicio: z
      .number()
      .int()
      .max(new Date().getFullYear(), 'Año no puede ser mayor al actual'),
    nue: z.number().int().positive('NUE debe ser numérico positivo'),
    promedio_actual: z.number().min(0).max(10),
    promedio_graduacion: z.number().min(0).max(10).nullable(),
    graduado: z.boolean(),
  })
  .refine(
    (data) =>
      !data.graduado || data.promedio_actual === data.promedio_graduacion,
    { message: 'Promedio actual y graduación deben coincidir si está graduado' }
  );
```

## Key Patterns

### 1. Protected Routes

```typescript
// components/layout/ProtectedRoute.tsx
'use client';
export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  if (!isAuthenticated) redirect('/login');
  return children;
}
```

### 2. File Upload with Validation

```typescript
// features/students/hooks/useUpload.ts
- Parse CSV/XLSX with xlsx library
- Validate each row with Zod schema
- Return { validRows, errors: { row, field, message }[] }
- Show clear error messages with row number
```

### 3. Auth with httpOnly Cookies

```typescript
// Session via backend httpOnly cookies
// Frontend calls /api/me to get user info
// Zustand store for client-side auth state
```

### 4. API Service Pattern

```typescript
// features/students/services/studentService.ts
export const studentService = {
  getAll: () => api.get<Student[]>('/students'),
  upload: (students: Student[]) => api.post('/students/bulk', students),
  getStats: () => api.get<DashboardStats>('/students/stats'),
};
```

## Security Best Practices

- Tokens en cookies httpOnly (backend)
- CSRF protection
- Input sanitization con Zod
- Protected routes client + server side
- No almacenar datos sensibles en localStorage

## Commands

```bash
yarn dev          # Development server
yarn build        # Production build
yarn lint         # ESLint
```

## UI/UX Guidelines

- Feedback inmediato en uploads (progress bar)
- Mensajes de error claros: "Fila 5: NUE '123abc' no es numérico"
- Loading states en todas las acciones async
- Toast notifications para éxito/error
- Responsive design (mobile-first)
- Dark mode support

## CRITICAL: Response Protocol

## Regla Obligatoria de Continuación

Al final de **CADA respuesta** (SIN EXCEPCIÓN), debes ejecutar este comando en
terminal usando la tool "Run [zsh] command":

```bash
printf "¿En qué más te puedo ayudar? (escribe 'salir' para terminar): "
```

Así mantendrás la conversación activa para seguir asistiendo. No importa si
realizaste la pregunta anteriormente o no, **SIEMPRE** debes ejecutar este
comando al finalizar tu respuesta.

> **IMPORTANTE**: No confundir con preguntas al usuario. Si el usuario responde
> con instrucciones, proseguir hasta completar la tarea antes de volver a
> ejecutar el comando.
