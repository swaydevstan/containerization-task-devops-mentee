const express = require('express');

const app = express();

app.set("port", process.env.PORT || 4000);


// Handling JSON data 
app.use(express.json());       
app.use(express.urlencoded({extended:true}));

let myData = [
    {id:1, color:"red", x:50, y: 200},
    {id:2, color:"orange", x:100, y: 200},
    {id:3, color:"yellow", x:150, y: 200},
    {id:4, color:"green", x:200, y: 200},
    {id:5, color:"blue", x:250, y: 200},
    {id:6, color:"purple", x:300, y: 200}
];

app.get("/", (request, response) => {
    response.send("Hello There!! 👋👋, API is running 💨💨");
});

// our 'API'
// GET - /api
app.get("/api", (request, response) => {
    response.json(myData);
});

// POST - /api
app.post("/api", (request, response) => {
    let randomId = Math.floor(Math.random()*100);
    const newData = Object.assign({id: randomId}, request.body);
    myData.push(newData);
    response.json(myData)
});


// PUT - /api
app.put("/api/:id", (request, response)=> {
    const selectedItemId = request.params.id;
    const updatedDataProperties = request.body
    let selectedItem = myData.find(item => {
        return item.id === Number(selectedItemId)
    });
    if(selectedItem == undefined){
        response.status(404).send("Oops! we couldn't find that data!");
    }
    for(p in updatedDataProperties){
        selectedItem[p] = updatedDataProperties[p]
    }
    myData.map(item => {
        if(item.id === Number(selectedItemId)){
            return selectedItem
        } else {
            return item
        }
    });

    response.json(myData)
});

// DELETE - /api
app.delete('/api/:id', (request, response) => {
    const selectedItemId = request.params.id;
    const newData = myData.filter(item => {
        return item.id !== Number(selectedItemId)
    })
    myData = newData;

    response.json(myData);
})

//Configure PORT to listen on
var server = app.listen(app.get("port"), () => {
    var port = server.address().port
    console.log("Node.js API app running at http://localhost:%s", port)
})
