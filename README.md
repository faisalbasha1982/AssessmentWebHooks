# node-scheduling-cron-jobs
Scheduling Cron Jobs in Node.js

This a program that creates an entry for every 15 minutes
In which it will again schedule another webhook for every 6 hrs

 To run the application
node index.js

 PORT 8000
 POST http://localhost:8000/entries
 GET  http://localhost:8000

 PORT 8080
 POST http://localhost:8080/entries
 GET  http://localhost:8080
