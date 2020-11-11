/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     tags:
 *       - User
 *     name: Signup
 *     summary: Signup a user in a system
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - userName
 *           - password
 *     responses:
 *       '201':
 *             description: User created.
 *       '400':
 *             description: Bad request.
 *       '409':
 *             description: userName already taken.
 * */

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - User
 *     name: Login
 *     summary: Login a user in a system
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - userName
 *           - password
 *     responses:
 *       '201':
 *             description: Login successful.
 *       '400':
 *             description: Login failed, wrong username or password.
 * */

/**
 * @swagger
 * /api/v1/user/profile:
 *   get:
 *     tags:
 *       - User
 *     name: Get User profile
 *     summary: get user profile
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         description: jwt token of the user
 *     responses:
 *       '200':
 *             description: Profile info retrieved successfully
 * */

/**
 * @swagger
 * /api/v1/chat/join/{userName}:
 *   get:
 *     tags:
 *       - Chat
 *     name: Join chat room
 *     summary: Join chat room
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         description: jwt token of the user
 *       - name: userName
 *         in: path
 *         description: friend userName
 *     responses:
 *       '200':
 *             description: chat room joined successfully
 * */
