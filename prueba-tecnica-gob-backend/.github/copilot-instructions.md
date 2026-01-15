# Copilot Instructions - Backend API (NestJS + Clean Architecture)

## Project Overview

Backend API para sistema de gestión de estudiantes. **NestJS 11** con **Clean Architecture** estricta y **PostgreSQL**.

## Architecture: Clean Architecture (Hexagonal)

```
src/
├── domain/           # Núcleo - SIN dependencias externas
│   ├── entities/     # Entidades puras con lógica de negocio
│   └── repositories/ # Interfaces (Ports) - contratos
├── application/      # Casos de uso - orquestación
│   └── use-cases/    # Un archivo por caso de uso
├── infrastructure/   # Adaptadores externos
│   ├── persistence/  # TypeORM entities + repositories
│   └── http/         # Controllers, DTOs, Guards, Strategies
└── modules/          # Módulos NestJS (wiring DI)
```

### Regla de Dependencia CRÍTICA

**Las capas internas NO importan de las externas:**

- `domain/` → Sin imports de NestJS, TypeORM, etc. Solo código TypeScript puro
- `application/` → Solo importa de `domain/`
- `infrastructure/` → Implementa interfaces de `domain/`

### Dependency Injection Pattern

```typescript
// 1. Domain define interfaz (Port)
export interface IStudentRepository { ... }
export const STUDENT_REPOSITORY = Symbol('STUDENT_REPOSITORY');

// 2. Infrastructure implementa (Adapter)
@Injectable()
export class StudentTypeOrmRepository implements IStudentRepository { ... }

// 3. Module conecta
providers: [{ provide: STUDENT_REPOSITORY, useClass: StudentTypeOrmRepository }]

// 4. Use Case consume via @Inject
constructor(@Inject(STUDENT_REPOSITORY) private repo: IStudentRepository) {}
```

## Domain Entities

Entidades puras con factory methods y reglas de negocio encapsuladas:

```typescript
// domain/entities/student.entity.ts
export class Student {
  static create(props: CreateStudentProps): Student {
    /* factory */
  }
  isActive(): boolean {
    return !this.graduado;
  }
  hasHighPerformance(): boolean {
    return this.promedioActual >= 9.0;
  }
}

export enum Genero {
  MASCULINO = 'masculino',
  FEMENINO = 'femenino',
  OTRO = 'otro',
  NO_ESPECIFICADO = 'no especificado',
}
```

## Use Cases

Un caso de uso = una acción de negocio. Input tipado → Output tipado:

```typescript
@Injectable()
export class UploadStudentsUseCase {
  constructor(@Inject(STUDENT_REPOSITORY) private repo: IStudentRepository) {}
  async execute(input: UploadStudentsInput): Promise<UploadStudentsOutput> { ... }
}
```

## HTTP Layer

- **Controllers**: Solo mapean HTTP ↔ Use Cases (sin lógica)
- **DTOs**: Validación con `class-validator`
- **Guards**: `JwtAuthGuard` para rutas protegidas

## Authentication

- JWT con `@nestjs/jwt` + `passport-jwt`
- Token via `Authorization: Bearer <token>`
- **IMPORTANTE**: Usar `JwtModule.registerAsync()` con ConfigService para cargar JWT_SECRET

## API Response Formats

```typescript
// Paginación
{ data: T[], total, page, limit, totalPages }

// Stats
{ totalStudents, graduatedStudents, activeStudents, averageScore, byGender, byYear }

// Login
{ message, user, accessToken }
```

## Developer Commands

```bash
yarn start:dev      # Desarrollo con hot reload (puerto 3001)
yarn seed           # Crear admin: admin@sistema.gob / admin123
yarn test           # Tests unitarios
yarn build          # Compilar producción
```

## Environment Variables (.env)

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=students_db
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

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