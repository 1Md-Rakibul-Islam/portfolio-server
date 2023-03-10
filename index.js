const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gksews0.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {

    try{
        const projectsCollection = client.db('PortfolioRakibul').collection('projects');
        const skillsCollection = client.db('PortfolioRakibul').collection('skills');
        const blogsCollection = client.db('PortfolioRakibul').collection('blogs');
        const testimonialsCollection = client.db('PortfolioRakibul').collection('testimonials');

       app.get('/skills', async (req, res) => {
            const result = await skillsCollection.find({}).toArray();
            res.send(result)  
       })

       app.get('/projects', async (req, res) => {
            const result = await projectsCollection.find({}).toArray();
            res.send(result)  
       })

       app.get('/blogs', async (req, res) => {
            const result = await blogsCollection.find({}).toArray();
            res.send(result)  
       })

       app.get('/testimonials', async (req, res) => {
            const result = await testimonialsCollection.find({}).toArray();
            res.send(result)  
       })

       app.get('/project/details/:_id', async (req, res) => {
            const id = req.params._id;
            const filter = { _id: ObjectId(id) };
            const project = await projectsCollection.findOne(filter);
            res.send(project)  
       })

       app.get('/blog/details/:_id', async (req, res) => {
            const id = req.params._id;
            const filter = { _id: ObjectId(id) };
            const blog = await blogsCollection.findOne(filter);
            res.send(blog)  
       })

    }

    finally{

    }
    
}
run().catch(console.log())


app.get('/', async(req, res) => {
    res.send('Portfolio server is Running');
})

app.listen(port, () => {
    console.log(`Portfolio runnin on: ${port}`);
})