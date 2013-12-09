
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('themes/phones/index', {  });
};
exports.list = function(req, res){
    //console.log('list');
    res.render('themes/phones/phone-list', {  });
};
exports.detail = function(req, res){
    res.render('themes/phones/phone-detail', {  });
};