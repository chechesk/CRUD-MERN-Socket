const nodemailer = require('nodemailer');
const Email = require('../Middleware/email');
const httpMocks = require('node-mocks-http');

// Mock de Nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(),
}));

describe('Email Middleware', () => {
  let transporterMock;

  beforeEach(() => {
    // Crear un mock para sendMail
    transporterMock = {
      sendMail: jest.fn(),
    };

    // Reemplazar createTransport para que devuelva el transportador simulado
    nodemailer.createTransport.mockReturnValue(transporterMock);
  });

  it('debe enviar un correo correctamente', async () => {
    // Simular que sendMail resuelve con éxito
    transporterMock.sendMail.mockResolvedValue({ response: '250 Message accepted' });

    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/mail',
      body: {
        email: 'test@example.com',
      },
    });

    const res = httpMocks.createResponse();

    // Llamar al middleware
    await Email(req, res);

    // Verificar que sendMail fue llamado con los argumentos correctos
    expect(transporterMock.sendMail).toHaveBeenCalledWith({
      from: process.env.MAIL_USER,
      to: 'test@example.com',
      subject: 'Test email',
      text: 'This email is sent using Nodemailer.',
    });

    // Verificar la respuesta correcta
    expect(res._getData()).toBe('Email sent successfully');
    expect(res.statusCode).toBe(200);
  });

  it('debe devolver un error si no se proporciona un correo', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/mail',
      body: {},
    });

    const res = httpMocks.createResponse();

    await Email(req, res);

    expect(res._getData()).toBe('No email provided');
    expect(res.statusCode).toBe(400);
  });

  it('debe manejar errores al enviar un correo', async () => {
    // Simular que sendMail lanza un error
    transporterMock.sendMail.mockRejectedValue(new Error('Error al enviar correo'));

    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/mail',
      body: {
        email: 'test@example.com',
      },
    });

    const res = httpMocks.createResponse();

    await Email(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({ error: 'Error al enviar correo' });
  });
});
