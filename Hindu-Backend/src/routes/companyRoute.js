const express = require("express");
const router = new express.Router();
const companyController = require('../controller/companyContoller');
const reviewController = require('../controller/reviewController');
const {authenticateJWT} =require('../services/jwtAuthenticate');
const upload = require('../services/cloudinaryMiddleware');
const msgController = require('../controller/msgController');
const {validateCompListing,validateSignUp} = require('../services/validation')


router.post('/compRegister',  companyController.compRegister);
router.post('/compListing', validateCompListing, companyController.compListing);
router.post('/Login', companyController.compLogin);
router.post('/forgotPass', companyController.compForgotPass);
router.post('/passChange', companyController.changePass);
router.post('/details', companyController.getdetails);
router.get('/getComp/details',companyController.getOneCompany);
router.post('/active/compDetails',companyController.getActiveComp);

//fetch card data
router.get('/cardData',companyController.getAll);

router.post('/user/review',reviewController.userReview);
// router.post('/user/review',reviewController.userReview);

router.get('/getcomp/review/:companyId',authenticateJWT,reviewController.getCompanyReviews);
router.get('/top-rated-companies-reviews', authenticateJWT,companyController.getTopRatedCompaniesReviews);

router.post('/uploadImage/:id', authenticateJWT ,upload.array('images',3),companyController.uploadCompImage);
router.post('/upload/videoURL/:id',companyController.uploadCompUrl);
router.put('/updateMedia/:id', authenticateJWT, upload.array('images', 3), companyController.updateCompMedia); // New route for updating media
router.delete('/deleteImage/:id', authenticateJWT, companyController.deleteCompImage); // New route for deleting images


router.post('/send/msg',msgController.addMsg);    // send msg to comp by user 
router.get('/notifications/:companyId',msgController.notifications);
// Route to delete video URL
router.delete('/deleteVideoURL/:id', authenticateJWT, companyController.deleteCompVideoURL);
// Route to update both images and video URL for a company
router.put('/company/:id/updateMedia', authenticateJWT, upload.array('images', 3), companyController.updateCompMedia);

// Route to update the video URL for a company
router.put('/company/:id/updateVideoURL', authenticateJWT, companyController.updateCompVideoURL);


router.post('/googleRegister',companyController.googleCompRegister);
router.post('/googleLogin',companyController.googleCompLogin);


module.exports = router; // Export the router directly
