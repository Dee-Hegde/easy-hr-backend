const router = require('express').Router();
const authController = require('');

router.post('/signup', userController.signupProcess);
router.get('/login', userController.loginProcess);
router.get('/', userController.all_Users);
router.get('/singleuser', userController.single_Users);
router.put('/updateuser', userController.update_Users);
router.delete('/delete', userController.delete_Users);

module.exports = router;
