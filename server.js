const express = require('express');
const puppeteer = require('puppeteer')

const app = express();

const port = process.env.port || 5000;

app.get('/', (req,res)=>{
    res.send();
})

app.listen(port, ()=> {
    console.log("port running ");
});
