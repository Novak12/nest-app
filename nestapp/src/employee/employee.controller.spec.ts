import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const employeeController = app.get<EmployeeController>(EmployeeController);
      expect(employeeController.root()).toBe('Hello World!');
    });
  });
});