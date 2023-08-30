import { Request, Response, NextFunction } from "express";

const authorized = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.authorization;
  
    const token = authHeader?.split(" ")[1];
    const response = ["null", null, "undefined", undefined];
  
    if (!response.includes(token))
    return res.status(403).json({message: "Unable to process request. Please logout first"})
    //   return sendStatus(res, 403, "Unable to process request. Please logout first");
  
    next();
  };

  export default authorized