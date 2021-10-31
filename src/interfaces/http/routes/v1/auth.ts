import {Request, Response} from 'express'

import { Router } from 'express';

const router = Router()

/**
 * @api {post} /auth/signup Creates account for user
 * @apiGroup Auth
 * @apiName Signup
 * @apiDescription Sign up with email and password
 * @apiVersion 0.0.0
 * @apiParam {String} email - User's email
 * @apiParam {String} password - User's password (min 8 characters)
 * @apiParam {String} first_name - User's first name
 * @apiParam {String} last_name - User's last name
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "Sign up successful!",
 *     "data": {
 *         "first_name": "George",
 *         "last_name": "Bush",
 *         "email": "hey@gmail.com",
 *         "username": "george3500",
 *         "email_verified": false,
 *         "_id": "6175ce167438dd9854ca2850",
 *         "created_at": "2021-10-24T21:20:22.502Z",
 *         "updated_at": "2021-10-24T21:20:22.502Z"
 *     },
 *    "links": []
 * }
 */

/**
 * @api {post} /auth/login Login
 * @apiGroup Auth
 * @apiName Login
 * @apiDescription Authenticate a user using email and password
 * @apiVersion 0.0.0
 * @apiParam {String} email - User's email
 * @apiParam {String} password - User's password (min 8 characters)
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "Sign up successful!",
 *     "data": {
 *     },
 *    "links": []
 * }
 */

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: 'Got here'})
} )

export default router;