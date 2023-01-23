var express = require("express");
var app = express();
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
//   res.header("Access-Control-Expose-Headers","Authorization")
// res.header("Access-Control-Expose-Headers","X-Auth-Token")
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
const port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node APP Listening on ${port}!`));


const {apiData,orders,loginData} =require("./data");


app.get("/baseUrl/products", function(req,res){
    let category=req.query.category;
   let arr1=apiData
  //  console.log(arr1);
   if(category==="All"){
      arr1=apiData
      console.log("d1",arr1);
   }
 else{
    arr1=arr1.filter((n)=>n.category===category)
    console.log("arr1",arr1);
   }
  // console.log(arr1);
    res.send(arr1)
})

app.get("/products", function(req,res){
    res.send(apiData)
})

app.get("/products/:id",function(req,res){
    let id=req.params.id
    console.log(id);
    let arr1=apiData
    if(id){
     
        arr1=arr1.find((n)=>n.id==id)
    }
    console.log(arr1);
    res.send(arr1)
})

app.post("/products",function(req,res){
   
    let body = { id: apiData.length + 1, ...req.body };
    apiData.push(body);
    let obj = { ...body };
  res.send(obj)
})

app.put("/products/:id",function(req,res){
    let id=+req.params.id;
    console.log(id);
    let body=req.body;
    let index=apiData.findIndex((n)=>n.id==id);
    console.log(index);
    if(index>=0){
        let updateData={id:id,...body};
        apiData[index]=updateData;
        console.log(updateData);
        res.send(updateData)
    }else{
        res.status(404).send("not Found");
    }

})

app.delete("/products/:id",function(req,res){
    let id=+req.params.id;
    let index=apiData.findIndex((d)=>d.id==id);
    if(index>0){
        let deleteData=apiData.splice(index,1);
        res.send(deleteData);
    }else{
        res.status(404).send("not found");
    }

})


app.get("/orders",function(req,res){
    res.send(orders)
})

app.post("/orders",function(req,res){
    let body={...req.body};
  
    // let data={...body}

    orders.push(body);
    res.send(body);
})

app.post("/register",function(req,res){
    let regData={email:req.body.email,password:req.body.password};
    console.log(regData);
    loginData.unshift(regData);
    res.send(regData)
})

app.post("/login",function(req,res){
  let email=req.body.email;
  let password=req.body.password

  var login = loginData.find(function(item) {
    return item.email === email && item.password === password;
  });
  console.log(login);
  let resData={email:req.body.email}
  res.send(resData)

})





