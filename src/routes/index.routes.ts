import { Router } from "express";

const router = Router();

import { indexWelcome } from "../controllers/index.controller";

import { indexUser, allUser, addUser } from "../controllers/user.controller";
import { indexCountry, testCountry, updateCountry } from "../controllers/country.controller";
import { loginAuth, validateAuth } from "../controllers/auth.controller";

import { isAuth } from "../middlewares/auth";

router.route('/').get(indexWelcome)

router.route("/user").get(indexUser);
router.route("/user/all").get(allUser);
router.route("/user/add").post(addUser);

router.route("/country").get(indexCountry)
router.route("/country/test").get(testCountry)
router.route("/country/edit").get(updateCountry)
import bodyParser from "body-parser";


router.route("/auth/login").post(loginAuth);

router.route("/auth/validate").post(isAuth,validateAuth);


export default router;