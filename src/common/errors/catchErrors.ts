import {NextFunction, Request, Response} from 'express'

const catchErrors = (fn: Function) => {
  // eslint-disable-next-line func-names
  return function (req: Request, res: Response, next: NextFunction) {
    return fn(req, res, next).catch(next);
  };
};

export default catchErrors;
