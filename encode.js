var fs = require('fs'),
    iconv = require('iconv-lite');
var pathname = root + '/' + file,
    from_code = 'GBK',
    to_code   = 'UTF8';
fs.writeFile(pathname , iconv.decode(fs.readFileSync(pathname), from_code), {
    encoding: to_code,
    mode:'0666'
}, function(err) {
    if (err) {
        throw err;
    }
});