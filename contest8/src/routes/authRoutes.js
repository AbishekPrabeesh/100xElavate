const { Router } = require("express");
const { signupController, signinController } = require("../controller/authContoller");
const router = Router();

router.post('/signup', signupController);
router.post('/signin', signinController);

module.exports = router;