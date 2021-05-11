 
 const puppeteer = require('puppeteer');

 /**
  * uses process.env.TARGET with provided session information to obtain the pdf.
  * @param {sessionId} sessionId 
  * returns null if anything goes wrong
  */
 async function generatePDF(queryString) {
    const browser = await getBrowser();
    
    if (process.env.TARGET) {
        const page = await browser.newPage();
        console.log(process.env.TARGET+queryString);
        await page.goto(`${process.env.TARGET}?${queryString}`, {
            waitUntil: 'networkidle2',
          });
        const buffer = await page.pdf({format: 'a4' });
        await browser.close();   
        return buffer;   
    }    
    return null;
 } 

 /**
  * Function to return a browser instance. 
  * TODO: this needs to pooled for efficiency.
  */
 async function getBrowser() {
  return await puppeteer.launch();
 }

 module.exports = {generatePDF}