const csv = require('csv');
const { program } = require('commander');
const { readFileSync, writeFileSync } = require('fs');

program.option('--infile <string>', 'infile', 'input.csv');
program.option('--outfile <string>', 'outfile', undefined);

program.parse();

const options = program.opts();

const inFile = options.infile;
const outFile = options.outfile ?? options.infile;

const content = readFileSync(inFile);

const records = csv.parse(content, {columns: true});

const outLines = [
    'uprn,date,epc_rating'
];

console.log(`start ${inFile} to ${outFile}`);

records.toArray().then(arr => {
    var i = 0;
    for (const epc of arr) {
        i++;
        if (i == 1) continue; // first line of the file is additional headers? ignore this

        outLines.push(`${epc['OSG_REFERENCE_NUMBER']},${epc['LODGEMENT_DATE']},${epc['CURRENT_ENERGY_RATING']}`);
    }

    writeFileSync(outFile, outLines.join("\n"));

    console.log(`finish ${inFile} to ${outFile}`);
});

console.log("finished!");
