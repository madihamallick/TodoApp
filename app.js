var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

var app = express();

//To load ejs files
app.set('view engine', 'ejs');

//To load css file (put it under new folder = "public")
app.use(express.static("public"));

//see the todo added to web page in server
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true })

const Schema = {
    name: String
}
const Item = mongoose.model("Item", Schema);
const i1 = new Item({
    name: "Go to gym",
});
const i2 = new Item({
    name: "Buy potatoes",
});
const i3 = new Item({
    name: "Make chicken kebab",
});
const d = [i1, i2, i3];

//Storing Todo items
var i = ""

//To send request to server
app.get("/", function (req, res) {
    Item.find({}, function (e, f) {
        //Condition for if item length is 0 then only add
        /**if (f.length === 0) {
            Item.insertMany(d, function (e) {
                if (e) {
                    console.log("Error")
                } else {
                    console.log("saved....!!!")
                }
            });
            res.redirect("/");
        } else {
            //else our items will get rendered**/
            res.render("list", { TodoItems: f });
       // }
    })
})

//To add todo to web page
app.post("/", function (req, res) {
    i = req.body.n;
    //console.log(i);
    const item = new Item({
        name: i
    });
    item.save();
})

app.post("/delete", function (req, res) {
    const check = req.body.checkbox;
    Item.findByIdAndRemove(check, function (err) {
        if (!err) {
            console.log("Successfully deleted");
            res.redirect("/");
        }
    })
});

//creating server
app.listen(5000, function () {
    console.log("listining to port 5000");
});