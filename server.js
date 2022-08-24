const express = require('express');
const puppeteer = require('puppeteer');
const { getPhone } = require('./tests/getPhone');

const app = express();

const port = process.env.port || 5000;

app.get('/', (req,res)=>{
    res.send();
(async()=> {
  await  getPhone()
})()
    
})

app.listen(port, ()=> {
    console.log("port running ");
});
