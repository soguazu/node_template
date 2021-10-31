/**
 * @module lib/uploader
 * @description Parses a multipart form and uploads the specified files to disk
 */

import InvalidPayloadError from "@src/common/errors/InvalidPayload";
import { MAX_FILE_UPLOAD_SIZE } from "@common/constants";
import { NextFunction } from "express-serve-static-core";
import httpStatusCodes from "@interfaces/http/common/httpStatusCode";
import multer from "multer";

const ONE_MB = 1000000;
 
 const diskStorage = multer.diskStorage({
   destination: "temp/uploads",
   filename: (req, file, cb) => {
     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${
       file.originalname
     }`;
     cb(null, `${file.fieldname}-${uniqueSuffix}`);
   },
 });
 
 /**
  * Validates files to ensure that they are in the correct format before uploading
  * @param {String} [fileType="image"] - The expected file type
  */
 const fileFilter = (fileType = "image") => (req: any, file: any, cb: any) => {
   switch (fileType) {
     case "image":
       if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
         cb(null, true);
       } else {
         cb(new InvalidPayloadError("Only images are allowed", true, httpStatusCodes.BAD_REQUEST, {}));
       }
       break;
     case "csv":
       if (file.mimetype === "text/csv") {
         cb(null, true);
       } else {
         cb(new InvalidPayloadError("Only CSVs are allowed", 
         true, httpStatusCodes.BAD_REQUEST, {}));
       }
       break;
     case "pdf":
       if (file.mimetype === "application/pdf") {
         cb(null, true);
       } else {
         cb(new InvalidPayloadError("Only PDFs are allowed", 
         true, httpStatusCodes.BAD_REQUEST, {}));
       }
       break;
     case "video":
       if (["video/mp4", "video/3gpp"].includes(file.mimetype)) {
         cb(null, true);
       } else {
         cb(new InvalidPayloadError("Only .mp4 and .3gpp formats are allowed", 
         true, httpStatusCodes.BAD_REQUEST, {}));
       }
       break;
     case "document":
       if (
         [
           "application/pdf",
           "image/jpeg",
           "image/png",
           "application/msword",
           "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
         ].includes(file.mimetype)
       ) {
         cb(null, true);
       } else {
         cb(
           new InvalidPayloadError(
             "Only PDF, word documents, and images are allowed",
             true,
             httpStatusCodes.BAD_REQUEST,
             {}
           ),
         );
       }
       break;
     default:
       cb(new InvalidPayloadError("Unknown file Type", 
       true, httpStatusCodes.BAD_REQUEST, {}));
       break;
   }
 };
 
 /**
  * Returns a middleware for parsing multipart forms
  * @param {Object} data - Data about the file being uploaded
  * @param {String} data.fileType - The type of file e.g image, pdf
  * @param {String} data.fieldName - The name of the form-data field containing the file
  */
 // eslint-disable-next-line func-names
 const uploader = ({ fileType, fieldName, fields }: any) => function (req: any, res: any, next: NextFunction) {
   const multerInstance = multer({
     storage: diskStorage,
     fileFilter: fileFilter(fileType),
     limits: {
       fileSize: fileType === "video" ? undefined : MAX_FILE_UPLOAD_SIZE,
     },
   });
   const uploadMiddleware = fields && fields.length
     ? multerInstance.fields(fields)
     : multerInstance.single(fieldName);
   uploadMiddleware(req, res, (error) => {
     if (error) {
       const message = `Upload error: ${error.message}.`;
       switch (error.code) {
         case "LIMIT_FILE_SIZE": {
           const uploadLimitInMB = (MAX_FILE_UPLOAD_SIZE / ONE_MB).toFixed(2);
           return next(
             new InvalidPayloadError(
               `${message} Only files smaller than ${MAX_FILE_UPLOAD_SIZE} bytes`
               + ` (${uploadLimitInMB}MB) are allowed`,
               true,
               httpStatusCodes.BAD_REQUEST,
               {}
             ),
           );
         }
         case "LIMIT_UNEXPECTED_FILE":
           return next(
             new InvalidPayloadError(
               `${message} Document should be uploaded using `
               + `'${fields && fields.length ? fields.map((el: any) => el.name) : fieldName}' field(s)`,
               true,
               httpStatusCodes.BAD_REQUEST,
               {}
             ),
           );
         default:
           return next(new InvalidPayloadError(message, true, httpStatusCodes.BAD_REQUEST, {}));
       }
     }
     return next();
   });
 };
 
 export default uploader;