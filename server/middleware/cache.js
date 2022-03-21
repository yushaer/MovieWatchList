import memorycache from 'memory-cache';
 const cache= async (req, res, next) =>{
   
        let key='_express_' +req.originalUrl||req.url;
     
        let cachedData=memorycache.get(key);
        if(cachedData ){
          console.log('key'+key)
           // console.log(cachedData)
          return  res.status(200).json(JSON.parse(cachedData));
        }
        
            next();
        
    
}
export default cache