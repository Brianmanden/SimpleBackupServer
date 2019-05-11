const fs = require('fs');
const watch = require('watch');
const source = 'SOURCE';
const destination = 'DESTINATION';

console.log("Backup server running");
console.log("Drop a few files in SOURCE folder");

var someData;

watch.createMonitor(source, (monitor) =>{
    monitor.files[source];

    monitor.on("created", (f, stat) => {
        const actualFileNamePath = parseFilename(f);
        fs.copyFileSync(f, actualFileNamePath);
        console.log("COPIED: " + f + " => " + actualFileNamePath);
    });

    monitor.on("changed", (source, curr, prev) => {
        console.log("on changed");
        console.log("CHANGED: " + source);
        console.log("CHANGED: " + curr);
        console.log("CHANGED: " + prev);
    });

    monitor.on("removed", (f, stat) =>{
        console.log("on remove");
        const filePathAndNameToDelete = parseFilename(f);
        fs.unlink(filePathAndNameToDelete, (err) =>{
            if(err){
                throw err;
            }
            console.log("DELETED: " + filePathAndNameToDelete);
        });
    });

    //monitor.stop();
});

function parseFilename(input){
    return destination + input.replace(source,'');
}