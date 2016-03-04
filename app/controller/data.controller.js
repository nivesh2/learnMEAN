'use strict';
module.exports = (function(){
    const config = require('../../config/config'),
          Data = require('../../app/model/mongo.model.js'),
          debug = require('debug')('main:user-controller'),
          that={};
        
    that.insert = (req,res,next) =>{
        let exists = false;
        
        //checking if key is already present
        Data.exists(req.body,function(err,result){
            if(err){
                next(err);
            }
            
            if( result !== null ){
                //updating the value    
                Data.update(req.body,function(err,result){
                    if(err){
                            next(err);
                        }       
                        res.json({
                            success: true,
                            message:'Data updated',
                            'data': result,
                            });  
                });
            }else{
                //inserting the new key/value pair
                Data.insert(req.body,function(err,result){
                    if(err){
                        next(err);
                    }
                    res.json({
                            success: true,
                            message:'Data inserted',
                            'data': result,
                            });                
                });
            }
        });
            
        
    };
    
    that.fetch = (req,res,next) => {
        Data.fetch(function(err,result){
           if(err){
                next(err);
           }
           res.json({
                   success: true,
                   message: 'data obtained',
                   'data': result
               }); 
        });
    };
    
    that.delete = (req,res,next) => {
        Data.delete(req.query.key,function(err){
           if(err){
                next(err);
           }
           res.json({
                   success: true,
                   message: 'data deleted'
               });
        });
    };
    
    return that;
    
})();

