import express from 'express';
import { loginValidation, signUpValidation } from '../Middlewares/AuthValidation.js'; // Use ES Module syntax for imports
import { Login, signUp } from '../controllers/AuthControl.js';


const router = express.Router();

router.post('/login', loginValidation, Login);

// POST /signUp route
router.post('/signUp', signUpValidation, signUp);

export default router;