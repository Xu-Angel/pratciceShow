let args = {
  '-h':displayHelp,
  '-r':readFile
},
      fs = require('fs');
function displayHelp () {
  console.log('argunment processer',args);
}
function readFile (file) {
  // body
 fs.createReadStream(file).pipe(process.stdout);
}
/* // print process.argv
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
 */
if (process.argv.length>2) {
  args[process.argv[2]](process.argv[3]);
}