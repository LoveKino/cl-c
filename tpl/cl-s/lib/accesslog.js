import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../log/access.log'), {
        flags: 'a'
    }
);

let logger = morgan('combined', {
    stream: accessLogStream
});

export default async (req, res, next) => {
    await logger(req, res, async () => {
        next();
    })
}