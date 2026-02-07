# Simulador del Ahorro Digital - Backend API

API Backend desarrollada en NestJS para la simulación de productos financieros y onboarding de clientes. Esta solución se integra con el frontend en Next.js.

## 📋 Características

- **Arquitectura Modular**: Separación clara de responsabilidades en Módulos, Controladores y Servicios.
- **Validación Robusta**: Uso de `class-validator` y `class-transformer` para asegurar la integridad de los datos entrantes.
- **Seguridad**:
  - CORS habilitado para integración segura con el frontend.
  - Validación de tokens de **Google reCAPTCHA** en el proceso de Onboarding.
- **Testing Exhaustivo**:
  - **100% de Coverage** en pruebas unitarias.
  - Tests E2E para flujos críticos.
- **Documentación Viva**: Swagger UI integrado y disponible en `/docs`.

## 🛠️ Stack Tecnológico

- **Framework**: NestJS
- **Lenguaje**: TypeScript
- **Testing**: Jest, Supertest
- **Validación**: class-validator
- **Documentación**: Swagger / OpenAPI
- **Integración**: Google reCAPTCHA API

## ⚠️ Importante: Orden de Ejecución

Este backend debe iniciarse **ANTES** que el frontend para que la aplicación cliente pueda conectarse correctamente a los servicios.

## 🔑 Variables de Entorno

El proyecto requiere configuración de entorno. Crea un archivo `.env` en la raíz del proyecto `backend/`:

```bash
# Puerto donde correrá el servidor (Por defecto: 3000)
PORT=3000
```

## 🚀 Instalación y Ejecución

1. **Instalar dependencias**
   ```bash
   npm install --legacy-peer-deps
   ```
   *Nota: Se recomienda usar `--legacy-peer-deps` debido a conflictos de versiones menores en dependencias de testing.*

2. **Ejecutar en desarrollo**
   ```bash
   npm run start:dev
   ```

3. **Ejecutar en producción**
   ```bash
   npm run build
   npm run start:prod
   ```

La API estará disponible en `http://localhost:3000/api`.
La documentación Swagger estará en `http://localhost:3000/docs`.

## 🧪 Testing

El proyecto cuenta con una suite de pruebas completa que garantiza la calidad del código.

### Ejecutar Tests Unitarios
```bash
npm test
```

### Verificar Cobertura (Coverage)
El proyecto mantiene un **100% de cobertura** de código.
```bash
npm test -- --coverage
```

### Ejecutar Tests E2E (End-to-End)
```bash
npm run test:e2e
```

## 📂 Estructura del Proyecto

```
src/
├── products/           # Módulo de Productos (GET)
├── simulator/          # Módulo de Simulación (Lógica financiera)
├── onboarding/         # Módulo de Registro (Validaciones con reCAPTCHA)
├── main.ts            # Punto de entrada y configuración global
└── app.module.ts      # Módulo raíz
test/
├── app.e2e-spec.ts    # Pruebas End-to-End
└── jest-e2e.json      # Configuración de pruebas E2E
```

## 🔌 Endpoints Principales

### 1. Listar Productos
**GET** `/products`
- Filtros opcionales: `name`, `type`
- Ejemplo: `GET /products?type=CDT`

### 2. Calcular Simulación
**POST** `/simulator/calculate`
- Calcula rendimientos basados en interés compuesto.
- **Lógica de Negocio**: Si no se proporciona tasa, se usa un valor por defecto (0.05).
- Body:
  ```json
  {
    "initialAmount": 1000000,
    "monthlyContribution": 200000,
    "months": 12,
    "rate": 0.05
  }
  ```

### 3. Onboarding
**POST** `/onboarding`
- Inicia proceso de registro validando el token de **Google reCAPTCHA**.
- Body:
  ```json
  {
    "fullName": "Juan Perez",
    "document": "12345678",
    "email": "juan@example.com",
    "recaptchaToken": "03AFcWeA..."
  }
  ```

## ✅ Decisiones de Diseño

- **DTOs (Data Transfer Objects)**: Definición estricta de contratos de datos.
- **Global Pipes**: `ValidationPipe` con `forbidNonWhitelisted` para rechazar datos no solicitados.
- **Dependency Injection**: Uso extensivo del contenedor de NestJS para facilitar el testing y desacoplamiento.
- **Integration Tests**: Pruebas E2E que verifican el flujo completo HTTP desde el controlador hasta el servicio.
