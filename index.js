const fs = require('fs');
const watch = require('watch');
const source = 'SOURCE';
const destination = 'DESTINATION';

console.log("Backup server running");
console.log("Drop/change/rename/delete a few files in SOURCE folder");

watch.createMonitor(source, (monitor) =>{
    monitor.files[source];

    monitor.on("created", (f, stat) => {
        const actualFileNamePath = parseFilename(f);
        fs.copyFileSync(f, actualFileNamePath);
        console.log("COPIED: " + f + " => " + actualFileNamePath);
    });

    monitor.on("changed", (source, curr, prev) => {
        const actualFileNamePath = parseFilename(source);
        fs.copyFileSync(source, actualFileNamePath);
        console.log("CHANGED: " + source);
    });

    monitor.on("removed", (f, stat) =>{
        const filePathAndNameToDelete = parseFilename(f);
        fs.unlink(filePathAndNameToDelete, (err) =>{
            if(err){
                console.log("Uhh ohh ... something went wrong: " + err);
            }else{
                console.log("DELETED: " + filePathAndNameToDelete);
            }
        });
    });

    //monitor.stop();
});

function parseFilename(input){
    return destination + input.replace(source,'');
}