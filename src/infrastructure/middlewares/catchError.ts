import {NextFunction, Request, Response} from 'express';

/**
 * Catches errors thrown in controllers
 * @param {Function} fn - The controller function
 */
 const catchErrors = (fn: Function) => function (req: Request, res: Response, next: NextFunction) {
    return fn(req, res, next).catch(next);
  };
  
  export default catchErrors;