const express = require('express');
const mongoose = require('mongoose');
const users = require('./models/users');
const questions = require('./models/questions');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//AWS image upload part
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const dotenv = require("dotenv")
dotenv.config();

const localStorage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, "uploads/");
    },
    filename(req, file, cb){
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const localUpload = multer({storage: localStorage})

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

var mimetype;
const upload = multer({
    storage : multerS3({
        s3:s3,
        bucket:'316projectimage',
        key : function(req, file, cb) {
            mimetype = file.mimetype;
            console.log(mimetype);
            var ext = file.mimetype.split('/')[1];
            if(!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(ext)) {
                return cb(new Error('Only images are allowed'));
            }
            cb(null, Date.now() + '.' + file.originalname.split('.').pop());
            
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,
    }),
    acl : 'public-read-write',
    limits: { fileSize: 100 * 1024 * 1024 },
});

//request for image upload
app.post('/img', upload.single('file'), async (req, res) => {
    console.log("in upload method");
    //const files = req.files;
    const file = req.file;
    //console.log(files)
    console.log(file)
    // console.log(req.file.location)
    // res.status(200).json({ location: req.file.location })
    //res.send({"status":"api okay"})
    res.send(file);
});

//Set up mongoose connection
var mongoDB = 'mongodb://eunewoo:mongoconquer98@ac-0vyijen-shard-00-00.kciyq16.mongodb.net:27017,ac-0vyijen-shard-00-01.kciyq16.mongodb.net:27017,ac-0vyijen-shard-00-02.kciyq16.mongodb.net:27017/?ssl=true&replicaSet=atlas-9pxc0l-shard-0&authSource=admin&retryWrites=true&w=majority'; // insert your database URL here
mongoose.set('strictQuery', true);
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Using an async function to be able to use the "await" functionality below, which makes
// the find command run synchronously.
app.get('/api/users', async function (req,res) {
    const usersInstance = await users.find({});
    // An example using select to only retrieve specific fields when finding authors. Remember, you want to avoid
    // returning unnecessary information.
    // const authors = await Author.find({}).select("family_name date_of_birth");
    res.json(usersInstance);
});

//get a user id from db
app.get('/api/users/:user_id', async function (req,res) {
    let idInstance = req.params.user_id;
    const user = await users.find({user_id : idInstance});
    if( user ) {
        res.json(user);
    } else {
        res.send("No user with id: " + id);
    }
});

app.post('/api/users', async function (req,res) {
    console.log("Posted with body: " + JSON.stringify(req.body));

    try {
        const newUser = new users({
            user_id: req.body.user_id,
            password: req.body.password,
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            address_f: req.body.address_f,
            adress_i: req.body.address_i,
            img: req.body.img
        })
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        console.log("Error on Post: " + error.message)
        res.status(400);
        res.send(error.message);
    }
})

//not work, error occur
//put 요청주소에 특정 아이디를 않넣어서 그런
//위에 post 는 잘 돌아감

app.put('/api/users', async function (req,res) {
    console.log("Put with body: " + JSON.stringify(req.body));

    try {
        const userId = req.body.user_id
        const newUser = new users({
            user_id: req.body.user_id,
            password: req.body.password,
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            address_f: req.body.address_f,
            adress_i: req.body.address_i,
            img: req.body.img
        })
        await users.findByIdAndUpdate({user_id : userId}, newUser, {runValidators: true});
        res.json(newUser);
    } catch (error) {
        console.log("Error on Post: " + error.message)
        res.status(400);
        res.send(error.message);
    }
});



// //update the specific profile by id of db
// app.put('/api/diary/users', (req, res) => {
//     db.query("UPDATE users SET password=\""+req.body.password+"\", img=\""+req.body.profile+"\", user_name=\""+req.body.name+"\", user_email=\""+req.body.email+"\", address_f=\""+req.body.address1+"\", address_l=\""+req.body.address2+"\" WHERE user_id=\""+req.body.user_id+"\";", (err, result) => {
//         if(!err){
//             res.json(result);
//         }else{
//             console.log(err);
//         } 
//     })
// });

app.post('/api/questions', async function (req,res) {
    console.log("Posted with body: " + JSON.stringify(req.body));

    try {
        if (req.body.question_type === 'multiple choice') { 
            const newQuestion = new questions({
                user_id: req.body.user_id,
                question: req.body.question,
                question_selection: req.body.question_selection,
                question_type: req.body.question_type,
            })
            await newQuestion.save();
            //await questions.updateOne({user_id: req.body.user_id}, {$set : {question_answers: []}})
            res.json(newQuestion);
        }
        else {
            const newQuestion = new questions({
                user_id: req.body.user_id,
                question: req.body.question,
                //question_selection: JSON.stringify([]),
                question_type: req.body.question_type,
                //question_answers: JSON.stringify([]),
            })
            await newQuestion.save();
            //await questions.updateOne({user_id: req.body.user_id}, {$set : {question_selection: []}})
            res.json(newQuestion);
        }
    } catch (error) {
        console.log("Error on Post: " + error.message)
        res.status(400);
        res.send(error.message);
    }
})

//get questions by user_id
app.get('/api/questions/:user_id', async function (req,res) {
    let idInstance = req.params.user_id;
    const question = await questions.find({user_id : idInstance});
    if( question ) {
        res.json(question);
    } else {
        res.send("No questions with id: " + id);
    }
});






// //delete 
// app.delete('/api/diary/questions/user_id=:user_id&id=:id', (req,res) => {
//     db.query("Delete from questions where user_id =\"" + req.params.user_id + "\" and id=\"" + req.params.id +"\";", (err, result) => {
//         if (!err) {
//             console.log("Delete from questions where user_id =\"" + req.params.user_id + "\" and id=\"" + req.params.id +"\";")
//             res.json(result);
//         } else {
//             console.log(err);
//         }})});

// app.put('/api/diary/questions/', (req,res) => {
//     db.query("update questions set question_answers = '"+ req.body.question_answers + "' where  question = '"+ req.body.question+"' and user_id = '" + req.body.user_id+ "';", (err, result) => {
//         if (!err) {
//             console.log("update questions set question_answers = '"+ req.body.question_answers + "' where  question = '"+ req.body.question+"' and user_id = '" + req.body.user_id+ "';");
//             res.json(result);
//         } else {
//             console.log(err);
//         }
//     });
// })

port = process.env.PORT || 3000;
app.listen(port, () => { console.log('server started!')});