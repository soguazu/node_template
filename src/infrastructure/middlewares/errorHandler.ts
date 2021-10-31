import {NextFunction, Request, Response} from 'express'

import BaseError from '@src/common/errors/base'
import HttpStatus from "http-status-codes";
import ResponseBuilder from "@interfaces/http/responses/ResponseBuilder";
import fs from "fs";
import {logger} from "@infra/logger/";
import util from "util";

/**
 * Error handling middleware
 */
      
 const unlink = util.promisify(fs.unlink);
 
 // eslint-disable-next-line no-unused-vars
 export default async (err: any, req: Request, res: Response, next: NextFunction) => {
   if (!err.isOperationalError) {
     logger.error("An error occurred: ", { error: err.message || err.toString(), stack: err.stack });
   }
 
   const { file, files }: any = req;
   if (file) {
     const { path } = file;
     if (file.path) {
       if (fs.existsSync(path)) {
         await unlink(path);
       }
     }
   }
 
   if (files && Object.values(files).length) {
     const uploads = Object.values(files);
     const removeFilesFromDisk = uploads.map((entry: any) => {
       // eslint-disable-next-line
       const filesToRemove = entry.map((upload: any) => {
         if (fs.existsSync(upload.path)) {
           return unlink(upload.path);
         }
       });
       return filesToRemove;
     });
     await Promise.all(removeFilesFromDisk);
   }
 
   if (err.name || err.error) {
     if (
       err.name === "ValidationError"
       || (err.error && err.error.name === "ValidationError")
     ) {
       return ResponseBuilder.getResponseHandler(res).onError(
         err.name || err.error.name,
         HttpStatus.BAD_REQUEST,
         err.message || err.error.toString(),
         err.errors || err.error.details,
       );
     }
     return ResponseBuilder.getResponseHandler(res).onError(
       err.name,
       err.status,
       err.message,
       err.data,
     );
   }
 
   const errorMessage = process.env.NODE_ENV === "production"
     ? "Something bad happened!"
     : err.message;
   const errorData = process.env.NODE_ENV === "production" ? {} : err;
   return ResponseBuilder.getResponseHandler(res).onError(
     "InternalServerError",
     err.status || HttpStatus.INTERNAL_SERVER_ERROR,
     errorMessage,
     errorData,
   );
 };

 