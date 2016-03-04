'use strict';
module.exports = (function(){
    const config = require('../../config/config'),
          Data = require('mongoose').model('Data'),
          debug = require('debug')('main:user-mongo'),
          that={};
        
    that.exists = (_data,cb)=>{
        Data.findOne({key:_data.key},(err,data)=>{
            if(err){
                debug('Error: Checking if key exists.');
                cb(err);
            }
            cb(null,data);
        });
    };
    
    that.insert = (_data,cb) =>{
        const data = new Data(_data);
    
        data.save((err)=>{
            if(err){
                debug('Error: Data insertion failure');
                cb(err);
            }
            cb(null,data);
        });
    };
    
    that.update = (_data,cb)=>{
        const data = new Data(_data);
        
        
        Data.update({'key':_data.key},
                    {$set:{'value':_data.value}},function(err,data){
                    if(err){
                        debug('Error: Data Updating failure');
                        cb(err);
                    }       
                    cb(null,data);  
                })
    
    };
    
    that.fetch = (cb) => {
        Data.find((err,data)=>{
           if(err){
                debug('Error: Data retrival failure');
                cb(err);
           }
           cb(null,data);
        });
    };
    
    that.delete = (key,cb) => {
        Data.remove({ 'key': key }, function(err) {
          if(err){
                debug('Error: Data retrival failure');
                cb(err);
           }
           cb(null);
        });
    };
    
    return that;
    
})();

