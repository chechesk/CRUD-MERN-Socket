const { Router } = require('express');
const Email = require('../Middleware/email');
const { loginUser, logoutUser } = require('../Constroller');
const route = Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuario (Login y Logout)
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: juan.perez@example.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: abc123token
 *       400:
 *         description: Datos de inicio de sesión inválidos
 *       401:
 *         description: Credenciales incorrectas
 */
route.post('/login', loginUser)

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Cerrar sesión de usuario
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso
 *       400:
 *         description: Error al intentar cerrar sesión
 */
route.post('/logout', logoutUser)

/**
 * @swagger
 * /api/mail:
 *   post:
 *     summary: Enviar un correo electrónico
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 example: recipient@example.com
 *               subject:
 *                 type: string
 *                 example: Bienvenido a nuestra plataforma
 *               message:
 *                 type: string
 *                 example: Hola, gracias por registrarte en nuestra plataforma.
 *     responses:
 *       200:
 *         description: Correo enviado exitosamente
 *       400:
 *         description: Error al enviar correo
 */
route.post('/api/mail', Email)

module.exports = route;