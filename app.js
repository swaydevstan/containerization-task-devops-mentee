const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set("port", process.env.PORT || 4000);


// Handling JSON data 
app.use(express.json());       
app.use(express.urlencoded({extended:true}));

const router = express.Router();

let myData = [
    {id:1, name:"Stanley", email:"stan@example.com", age:45},
    {id:2, name:"Dave", email:"dave@example.com", age:88},
    {id:3, name:"Frank", email:"frank@example.com", age:65},
    {id:4, name:"Chidi", email:"chidi@example.com", age:79},
    {id:5, name:"Stephanie", email:"steph@example.com", age:24},
    {id:6, name:"Tamar", email:"tam@example.com", age:27}
];

router.get("/", (req, res) => {
    res.send("Hello There!! 👋👋, API is running 💨💨");
});

// our 'API'
// GET - /api
router.get("/api", (req, res) => {
    res.json(myData);
});

// POST - /api
router.post("/api", (req, res) => {
    let randomId = Math.floor(Math.random()*100);
    const newData = Object.assign({id: randomId}, req.body);
    myData.push(newData);
    res.json(myData)
});


// PUT - /api
router.put("/api/:id", (req, res)=> {
    const selectedItemId = req.params.id;
    const updatedDataProperties = req.body
    let selectedItem = myData.find(item => {
        return item.id === Number(selectedItemId)
    });
    if(selectedItem == undefined){
        res.status(404).send("Oops! we couldn't find that data!");
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

    res.json(myData)
});

// DELETE - /api
router.delete('/api/:id', (req, res) => {
    const selectedItemId = req.params.id;
    const newData = myData.filter(item => {
        return item.id !== Number(selectedItemId)
    })
    myData = newData;

    res.json(myData);
})


app.use('/',router);

//Configure PORT to listen on
var server = app.listen(app.get("port"), () => {
    var port = server.address().port
    console.log("Node.js API app running at http://localhost:%s", port)
})

module.exports = server