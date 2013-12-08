
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.list = function(req, res){
    //console.log('list');
    res.render('phone-list', { title: 'Express' });
};
exports.detail = function(req, res){
    res.render('phone-detail', { title: 'Express' });
};