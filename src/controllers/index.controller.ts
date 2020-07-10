import { Request, Response } from "express";
import { __ } from "i18n";
import i18n from "i18n";

export function indexWelcome(req: Request, res: Response){
    return res.json(__("Hello"));
}