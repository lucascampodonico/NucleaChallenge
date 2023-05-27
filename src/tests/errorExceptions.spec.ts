import { error404, otherError, validarJSON } from "../middlewares/errorExceptions";
import { Request, Response } from "express";

describe("error404 middleware", () => {
    it("should return a 404 error response", () => {
      // Mock de objetos Request y Response
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
  
      // Llamada a la función middleware
      error404(req, res, jest.fn());
  
      // Verificación de los resultados
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Endpoint Not found" });
    });
});

describe("validarJSON middleware", () => {
    it('should respond with 400 and JSON inválido error message if SyntaxError with body property', () => {
        const err = new SyntaxError('Invalid JSON');
        const req = {} as Request;
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn();
    
        validarJSON(err, req, res, next);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'JSON inválido' });
        expect(next).not.toHaveBeenCalled();
      });
  
    it("should call the next middleware for valid JSON", () => {
      // Mock de un error distinto a un error de sintaxis de JSON
      const err = new Error("Some error");
  
      // Mock de objetos Request y Response
      const req = {} as Request;
      const res = {} as Response;
  
      // Mock de la función next middleware
      const next = jest.fn();
  
      // Llamada a la función middleware
      validarJSON(err, req, res, next);
  
      // Verificación de los resultados
      expect(next).toHaveBeenCalled();
    });
});

describe('otherError', () => {
    test('should respond with 500 and Internal Server Error message', () => {
      const err = new Error('Some error');
  
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      jest.spyOn(console, 'error');
      
      otherError(err, req, res, next);
  
      expect(console.error).toHaveBeenCalledWith(err);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });