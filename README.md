# node-scheduling-cron-jobs
Scheduling Cron Jobs in Node.js

This a program that creates an entry for every 15 minutes
In which it will again schedule another webhook for every 6 hrs

To run the application
node webhooks.js

Alternative way is
node index.js

There are two files i.e webhooks.js and index.js
Both are separate ways to solve this problem

webhooks.js uses node-cron scheduler which creates entries
every 15 minutes, within this scheduler there is another
scheduler that starts after 6 hours , within this scheduler
there is a webhook from node-webhooks which can be triggered.
Once these webhooks are triggered then an event emitter is checked
to process these webhooks

index.js uses node-cron scheduler which creates entries
every 15 minutes, within this scheduler there is another
scheduler that starts after 6 hours , within this scheduler
there is a webhook from that is generated via get/post which 
can be triggered. Once these webhooks are triggered then an 
event emitter is checked to process these webhooks

PORT 8000
POST http://localhost:8000/entries
GET  http://localhost:8000

PORT 8080
POST http://localhost:8080/entries
GET  http://localhost:8080
