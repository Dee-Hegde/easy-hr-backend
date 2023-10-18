const router = require('express').Router();
const authController = require('../controller/auth/authController');

router.post('/signup', authController.signupProcess);
router.get('/login', authController.loginProcess);
router.get('/', authController.all_Users);
router.get('/singleuser', authController.single_Users);
router.put('/updateuser', authController.update_Users);
router.delete('/delete', authController.delete_Users);

module.exports = router;
