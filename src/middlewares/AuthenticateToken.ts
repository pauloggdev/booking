import jwt from 'jsonwebtoken';
import { Response, NextFunction } from "express"
import dotenv from 'dotenv'
dotenv.config()
export default function authenticateToken(req: any, res: Response, next: NextFunction):any {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.sendStatus(401);
    const secretkey = process.env.SECRETKEY || "!@$¨&ASDFG"
    jwt.verify(token, secretkey, (err:any, user:any) => {
        if (err) return res.sendStatus(403);
        req.body.userId = user.userId;
        req.body.companyId = user.companyId;

        next();
    });
}