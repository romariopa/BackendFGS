import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api'); // Match global prefix in main.ts
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/products (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/products')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it('/api/simulator/calculate (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/simulator/calculate')
      .send({
        initialAmount: 1000000,
        monthlyContribution: 100000,
        months: 12
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('totalContributed');
        expect(res.body).toHaveProperty('finalBalance');
        expect(res.body.totalContributed).toBe(2200000);
      });
  });
});
