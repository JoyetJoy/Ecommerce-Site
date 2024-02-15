const express=require('express')
const router=express.Router()


const authController=require("../controller/auth")

router.get("/signup",authController.usersignupGet)
router.post("/sendotp",authController.usersignupPost)

router.get("/sendotp/:num",authController.sendotpget)
router.post("/login/:num",authController.sendotpPost)
router.get("/resendotp/:num",authController.resendotp)

router.get("/login",authController.userloginGet)
router.post("/home",authController.userloginPost)

router.get("/forgot",authController.forgotpasswordGet)
router.post("/forgotpost",authController.forgotpasswordPost)

router.get("/forgototp/:mail",authController.forgototpGet)
// router.get("/resendemailotp/:mail",authController.resendemailotp)
router.post("/resetpassword/:mail",authController.forgototpPost)

router.get("/resetpasswordGet/:mail",authController.resetpasswordGet)
router.post("/resetlogin/:mail",authController.resetpasswordPost)



module.exports=router