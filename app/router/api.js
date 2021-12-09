'use strict';
module.exports = (app) => {
  const { router, controller } = app;

  router.get('/api/getImgCode', controller.page.home.getImgCode);
  router.get('/api/createQRCode', controller.page.home.createQRCode);
  router.get(['/dr-admin', '/admin/login'], controller.api.admin.login);
  router.post('/api/admin/doLogin', controller.api.admin.loginAction);
  router.get('/api/systemConfig/getConfig', controller.api.systemConfig.list);

  // ApiRouters

  // next.js前端页面Api文档
  router.get('/api/default/getTypeInfo',controller.api.home.getTypeInfo);
  router.get('/api/default/getNewestDoc',controller.api.home.getNewestDoc);
  router.get('/api/default/getDocDetail/:id',controller.api.home.getDocDetail);


};
