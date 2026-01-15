# 🎓 Sistema de Gestión de Estudiantes - Backend

Backend desarrollado con **NestJS** y **Clean Architecture** para el sistema de gestión de estudiantes.

## 📋 Arquitectura Limpia

```
src/
├── domain/                    # Capa de Dominio (Núcleo)
│   ├── entities/              # Entidades de negocio puras
│   │   ├── user.entity.ts
│   │   └── student.entity.ts
│   └── repositories/          # Interfaces de repositorios (Ports)
│       ├── user.repository.ts
│       └── student.repository.ts
│
├── application/               # Capa de Aplicación (Casos de Uso)
│   └── use-cases/
│       ├── auth/
│       │   ├── login.use-case.ts
│       │   └── get-current-user.use-case.ts
│       └── students/
│           ├── upload-students.use-case.ts
│           ├── get-students.use-case.ts
│           └── get-student-stats.use-case.ts
│
├── infrastructure/            # Capa de Infraestructura (Adaptadores)
│   ├── persistence/           # Implementaciones de repositorios
│   │   └── typeorm/
│   │       ├── entities/      # Modelos de base de datos
│   │       ├── repositories/  # Implementaciones TypeORM
│   │       └── seeds/         # Datos iniciales
│   └── http/                  # Controladores HTTP
│       ├── controllers/
│       ├── dtos/
│       ├── guards/
│       ├── strategies/
│       └── decorators/
│
└── modules/                   # Módulos NestJS
    ├── auth.module.ts
    └── students.module.ts
```

## 🚀 Instalación

```bash
# Clonar e instalar
cd prueba-tecnica-gob-backend
yarn install

# Configurar variables de entorno
cp .env.example .env

# Crear base de datos PostgreSQL
createdb students_db

# Ejecutar seed (crear usuario admin)
yarn seed

# Iniciar en desarrollo
yarn start:dev
```

## 📌 Endpoints API

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login` | Login (retorna httpOnly cookie) |
| POST | `/api/auth/logout` | Logout (limpia cookie) |
| GET | `/api/auth/me` | Usuario actual |
| GET | `/api/students` | Listar estudiantes (paginado) |
| GET | `/api/students/stats` | Estadísticas del dashboard |
| POST | `/api/students/bulk` | Carga masiva CSV/XLSX |

## 🔑 Credenciales por defecto

```
Email: admin@sistema.gob
Password: admin123
```

## 🏗️ Clean Architecture - Principios

1. **Domain Layer**: Entidades puras sin dependencias de frameworks
2. **Application Layer**: Casos de uso con lógica de aplicación
3. **Infrastructure Layer**: Implementaciones concretas (DB, HTTP)
4. **Dependency Inversion**: Las capas internas no conocen las externas

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
