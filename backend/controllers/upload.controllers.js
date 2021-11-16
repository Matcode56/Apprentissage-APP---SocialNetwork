const fs = require('fs');

module.exports= (req,res,next)=>{
   const arrFichier= getData();

   function getData() {
        files= fs.readdirSync(__dirname+'/../../client/public/PhotoProfil');
        return files
    }
    
    const photoUser= arrFichier.filter(e=> e.includes(req.params.id))

    if(photoUser.length>1){
        const dates= getDatePhoto();
        function getDatePhoto(){
            const data=[]
            photoUser.forEach(e => 
                data.push(e.substring(0, e.indexOf('-User')))
            )
                return data;
            }
        const datesNumber= transformStringToNumber()

        function transformStringToNumber(){
            const data=[];
      
                dates.forEach(e=>
                    
                    data.push(parseInt(e))
                    )
                
                return data;
        }

        
    }

    console.log(photoUser.length)


}
    
    
