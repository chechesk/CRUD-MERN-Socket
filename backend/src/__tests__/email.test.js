jest.mock('nodemailer', () => {
  const sendMailMock = jest.fn(); // Mock explícito para sendMail
  const verifyMock = jest.fn(); // Mock para verify
  return {
    createTransport: jest.fn(() => ({
      sendMail: sendMailMock, // Mock de sendMail
      verify: verifyMock.mockImplementation((callback) => callback(null, true)),
    })),
    __mock__: { sendMailMock, verifyMock }, // Exporta el mock
  };
});
const nodemailer = require('nodemailer');
const Email = require('../Middleware/email');
const httpMocks = require('node-mocks-http');
const { MAIL_USER } = require('../Config/env');
const { __mock__: { sendMailMock, verifyMock } } = nodemailer; 




describe('Email Middleware', () => {

  beforeEach(() => {
    sendMailMock.mockClear(); 
    verifyMock.mockClear();
  });

  it('should send an email successfully', async () => {
    sendMailMock.mockResolvedValue({ response: '200 Message accepted' });
  
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/mail',
      body: { email: 'test@gruporf.cl' },
    });
  
    const res = httpMocks.createResponse();
  
    await Email(req, res);
  
    expect(sendMailMock).toHaveBeenCalledWith({
      from: MAIL_USER,
      to: 'test@gruporf.cl',
      subject: 'Test email',
      text: 'This email is sent using Nodemailer.',
    });
  
    expect(res.statusCode).toBe(200);
    expect(res._getData()).toBe('Email sent successfully');
  });

  it('should return an error if no email is provided', async () => {
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

  it('should handle errors during email sending', async () => {
    sendMailMock.mockRejectedValue(new Error('Error sending email'));
  
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/mail',
      body: { email: 'test@gruporf.cl' },
    });
  
    const res = httpMocks.createResponse();
  
    await Email(req, res);
  
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({ error: 'Error sending email' });
  });
});