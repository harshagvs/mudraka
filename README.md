## Mudraka
The one who prints 
A PDF Generator for applications that require the browser rendered output to be saved as PDF.

## Features

* Can be run in a docker container
* Can be used to deploy for different environments by changing the environment variable TARGET

## Coming soon
* Currently a new browser instance is launched for every PDF request. change it to a pooled browsers - you know why
* Ability to upload the pdfs to s3 to support asynchronous workloads

## How to use

* Clone the repo

~~~~~~
    git clone <repo>
    cd mudraka
~~~~~~

* Run the application
~~~~~~
    export TARGET=yourAppsBaseURL # example http://www.google.com
    npm install
    npm start
    #application starts on port 3000
~~~~~~

* Submit a print job
~~~~~~
curl -X POST http://localhost:3000/job/sessionIdOrJobId/page/yourpagetoprint

~~~~~~
Note: it is up to your application to handle how to interpret sessionIdOrJobId and page to deliver the content to be converted to PDF

* Check the current pending jobs
~~~~~~
curl http://localhost:3000/jobs

~~~~~~

# Deployment

Ideally you would want the application to run behind a load balancer that can handle print jobs efficiently. 

* Build the docker image
~~~~~~
    docker build . -t yourorg/mudraka
~~~~~~

* Run the docker image
~~~~~~
    docker run -p3000:3000 --env TARGET=YourBaseURL --cap-add=SYS_ADMIN -d yourOrg/mudraka:latest
~~~~~~

