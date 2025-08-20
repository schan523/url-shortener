# url-shortener
Built using ExpressJS and MongoDB.  
Project page url: https://roadmap.sh/projects/url-shortening-service

## Setup
1. Run `git clone https://github.com/schan523/url-shortener.git` in your terminal to clone the repository.
1. `npm install` to install all the necessary dependencies.
2. Set up a MongoDB database and make a .env file to store the ATLAS_URL (remember to add the .env file to .gitignore):
   ```
   ATLAS_URL="mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@cluster0.example.mongodb.net/?retryWrites=true&w=majority"
   ```
  

## Project Structure
```
├───db  
    └───mongoConn.js  
└───src  
    ├───middleware  
        └───createUrl.js  
        └───deleteUrl.js
         ...  
    └───routes  
        └───urls.js
    └───app.js
    └───utils.js
```
All endpoints are under the urls router, with middleware for each endpoint located in separate files under the middleware folder. A connection to the MongoClient is established in mongoConn.js and exported to the middleware files where the database is accessed. 
