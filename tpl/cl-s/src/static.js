import url from 'url';
import path from 'path';
import fs from 'fs';
import mime from 'mime';
import handyp from 'handyp';

let getStaticPath = (wwwPath, pathname) => {
    let staticPath = path.join(wwwPath, pathname);
    staticPath = path.normalize(staticPath);
    if (staticPath.indexOf(wwwPath) !== 0) {
        return false;
    }
    return staticPath;
}

let outputFile = async (staticPath, res) => {
    if (await handyp.exist(staticPath)) {
        let fileStat = await handyp.fs.stat(staticPath);
        if (fileStat.isFile()) {
            let type = mime.lookup(staticPath);
            res.setHeader('Content-Type', type);
            // pipe static resource
            fs.createReadStream(staticPath).pipe(res);
        } else {
            res.statusCode = 404;
            res.end();
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
}

export default (rootPath, staticDir) => async (req, res, next) => {
    let urlObj = url.parse(req.url);
    let pathname = urlObj.pathname;

    if (pathname.indexOf(`/${staticDir}/`) === 0) {
        let staticPath = getStaticPath(rootPath, pathname);
        // check legal path
        if (staticPath === false) {
            res.statusCode = 404;
            res.end();
        } else {
            await outputFile(staticPath, res);
        }
    } else {
        await next();
    }
}