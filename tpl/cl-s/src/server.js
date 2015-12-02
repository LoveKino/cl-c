import S from './cl-s';

(async () => {
    let server = await S().createServer(8777);
    console.log(server.address().port);
})();