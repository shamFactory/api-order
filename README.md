# Install
- run `docker-compose up -d`
- configure .env by default external port is 80 (internal is 8080), mongo port is 20018 (internal 27017)
- validate api `http://localhost/api`

## Publish 
You can publish this API with "ngrok" more information in https://dashboard.ngrok.com/get-started

## Webhook
The webhook uri `https://16b0fc60.ngrok.io/api/webhook` (change with your ngrok uri), support GET for render hello test and POST for dialogflow