const express = require("express");
const EmailAuthController = require("../controllers/email-auth.controller");
const MobileAuthController = require("../controllers/mobile-auth.controller");
const ProfileController = require("../controllers/profile.controller");
const TemplateController = require("../controllers/template.controller");
const ResumeController = require("../controllers/template.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
const handle404Middleware = require("../middlewares/handle-404.middleware");
const LoginEmailValidator = require("../validators/auth/login-email.validator");
const LoginMobileValidator = require("../validators/auth/login-mobile.validator");
const RegisterEmailValidator = require("../validators/auth/register-email.validator");
const RegisterMobileValidator = require("../validators/auth/register-mobile.validator");
const VerifyEmailValidator = require("../validators/auth/verify-email.validator");
const VerifyMobileValidator = require("../validators/auth/verify-mobile.validator");

const apiRouter = express.Router();

// auth routes
apiRouter.post("/register/email", RegisterEmailValidator.middleware, EmailAuthController.registerEmail);
apiRouter.post("/verify/email", VerifyEmailValidator.middleware, EmailAuthController.verifyEmail);
apiRouter.post("/login/email", LoginEmailValidator.middleware, EmailAuthController.loginEmail);

apiRouter.post("/register/mobile", RegisterMobileValidator.middleware, MobileAuthController.registerMobile);
apiRouter.post("/verify/mobile", VerifyMobileValidator.middleware, MobileAuthController.verifyMobile);
apiRouter.post("/login/mobile", LoginMobileValidator.middleware, MobileAuthController.loginMobile);

apiRouter.get("/my/profile", AuthMiddleware, ProfileController.getProfile);


apiRouter.post("/resume", ResumeController.create);
apiRouter.patch("/resume/:id", ResumeController.update);
apiRouter.get("/resume/:id", ResumeController.generateResume);
apiRouter.get("/pdf/generate-pdf", TemplateController.getPDF);




apiRouter.use("*", handle404Middleware);

module.exports = apiRouter;