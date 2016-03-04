'use strict';

module.exports = function(app){
    const data = require('../../app/controller/data.controller');
    
    app.get('/',(req,res)=>{
       res.redirect("/index.html");
    });
    
    app.post('/api/v1/insert',data.insert);
    
    app.get('/api/v1/fetch',data.fetch);
    
    app.get('/api/v1/delete',data.delete);
    
};
