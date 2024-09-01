const express = require("express");
const publicRouter = new express.Router();
const privateRouter = new express.Router();
const companyRoutes = require('./companyRoute');
const adminRoutes = require('./adminRoute');
// const {authenticateJWT} =require('../services/jwtAuthenticate')

// Public routes
publicRouter.use('/company', companyRoutes); 
publicRouter.use('/admin',adminRoutes);

// Private routes (require authentication)
privateRouter.use('/admin', adminRoutes);
privateRouter.use('/company', companyRoutes);

module.exports = {
  publicRoutes: publicRouter,
  privateRoutes: privateRouter,
};
