### nodejs

Nodejs is an opensource javascript runtime, built on top of Chorme's V8 javascript engine used for serverside and networking applications.


#### main modules

`Http` module allows nodejs to transfer data over http protocol.
`fs` module allows access to filesystem.
`path` module provides utilities for working with files and directories.
`event` module allows for event driven programming, creation and handling of custom events.

#### How do you deploy your Node.js application?

Nodejs application can be deployed using various tools like Heroku, AWS, DigitalOcean, etc.
Use a cloud platform like Heroku, AWS, DigitalOcean, etc.

Create a production build of the application

Configure environment variables

Use a process manager like PM2 to manage the application

Use a reverse proxy like Nginx to handle incoming requests

Set up SSL/TLS certificates for secure communication


####  If you have a large CSV data file, how would you process it?

Use Node.js streams to efficiently process large CSV data.
Use the 'fs' module to create a read stream for the CSV file.

Use a CSV parsing library like 'csv-parser' to parse the data row by row.

Process each row asynchronously to avoid blocking the event loop.

Use a database like MongoDB or PostgreSQL to store the processed data if needed.
```js
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });
```


#### package.json defines the dependencies you want, while package-lock.json locks the exact versions actually installed. ✅