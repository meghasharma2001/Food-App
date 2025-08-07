 
 const Pizzamodel = require("../db/pizzamodel")

 module.exports.getPizza = async(req,res) =>{ 
    try{

        const resp = await Pizzamodel.find({});

        res.send(resp)
    }

    catch(e){
res.json({error:"Not found"})
    }
 }





 module.exports.addPizza =  async(req,res) => {
try{
    const {pizzaname ,smallVPrice , mediumVPrice , largeVPrice , imgurl , productdesc , category} = req.body;


 

    if(!pizzaname  || !imgurl ||!productdesc || !category)
    {
        
        return res.json({error:"All fields are required"})
    }


    const storenewpizza = await Pizzamodel.create({name:pizzaname , varients:["small" , "medium" , "large"] , prices:[{small:smallVPrice , medium:mediumVPrice , large: largeVPrice}]  , category:category , image:imgurl , description:productdesc})

 
    res.json({success:"success backend" , storenewpizza})
}
catch(e)
{
    
    res.json({error:e})
}
 }




 module.exports.getpizzaById = async (req,res) =>{
    try{
        const {id} = req.params

        const data = await Pizzamodel.findById(id)

        if(!data || !id)
         {
           return res.json({error:"item not found "})
         }


     

        res.send(data)
    }
    catch(e)
    {
        console.log("error in getpizza by id")
    }
 }





 module.exports.updatePizzaByIdAdmin = async(req,res) =>{

    try{

        const {updateditem} = req.body
     

        const {_id , small , medium , large} = updateditem

        if(!_id){
            return res.json({error : "id not given"})
        }

         const dbitem = await Pizzamodel.findOne({_id});

        
         if(!dbitem)
         {
            return res.json({error:"item not found"})
         }

         dbitem.name = updateditem.name
         dbitem.description = updateditem.description
         dbitem.category = updateditem.category
         dbitem.prices[0].small = Number(small)
         dbitem.prices[0].medium = Number(medium)
         dbitem.prices[0].large = Number(large)
         dbitem.image = updateditem.imgurl



dbitem.markModified("prices") 
      await dbitem.save();

        
        res.json({success:true })
    }
    catch(e)
    {
console.log("error in updated by id ")
    }
 }





 module.exports.deletepizza = async(req,res) =>{  
try{
    const {id} = req.params

  

    const data = await Pizzamodel.findByIdAndDelete(id)

     if(!data || !id)
    {
        return res.json({error:" deleted item not found"})
    }



    res.json({success:true , data})
}

catch(e)
{
  
    res.json({error:"can't delete"})
}
 }