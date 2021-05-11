const express = require('express');
const { generatePDF } = require('./pdf-generator');
const app = express()
const port = 3000;

const MAX_JOBS = 30;

const jobs = new Map();

app.get('/', (req, res) => {
  res.send('Welcome to PDFGenerator. Please submit jobs using /job endpoint')
})

app.post('/job/:session/page/:page', async (req, res)=> {    
    if (jobs.size < MAX_JOBS) {
        const jobId = req.params.session;  
        const page = req.params.page;
        jobs.set(jobId,'pending')
        let pdf =  await generatePDF(`page=${page}&sessionId=${jobId}`);
        jobs.delete(jobId)
        res.send(pdf);
    } else {
        res.status(503);
        jobs.delete(jobId);
        res.send('Server busy try after 2 seconds. Number of jobs: '+ MAX_JOBS);
    }
    
});

app.get('/jobs', (req, res)=> {
   res.send(JSON.stringify([...jobs]));
});

if (checkEnv()){
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
} else {
  console.log('Required environment variables not set. Unable to start the server. Set TARGET environment varibale to point to your data source ');
}

function checkEnv() {
  return process.env.TARGET ;
}

