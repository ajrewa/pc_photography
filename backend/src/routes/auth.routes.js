const express = require("express");
const rateLimit = require("express-rate-limit");
const { login, register, getMe, updatePassword, logout } = require("../controllers/auth.controller");
const { loginValidator, registerValidator, updatePasswordValidator } = require("../validators/auth.validator");
const validate = require("../middlewares/validate.middleware");
const { protect, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts. Try again later." },
});

router.post("/login", loginLimiter, loginValidator, validate, login);

// Creating new admin accounts is itself an admin-only action.
router.post(
  "/register",
  protect,
  authorize("superadmin"),
  registerValidator,
  validate,
  register
);

router.get("/me", protect, getMe);
router.put("/password", protect, updatePasswordValidator, validate, updatePassword);
router.post("/logout", protect, logout);

module.exports = router;
