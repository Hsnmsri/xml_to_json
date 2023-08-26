const fs = require("fs");
const xml2js = require("xml2js");
const readline = require("readline");
const { json } = require("stream/consumers");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Please enter the path to the XML file: ", (filePath) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading the XML file:", err);
      rl.close();
      return;
    }

    xml2js.parseString(data, (parseErr, result) => {
      if (parseErr) {
        console.error("Error parsing XML:", parseErr);
        rl.close();
        return;
      }

      // Convert to json file
      let jsonString = JSON.stringify(result);
      fs.writeFile(filePath + ".json", jsonString, "utf-8", (err) => {
        if (err) {
          console.error("Error writing JSON file:", err);
        } else {
          console.log("JSON data has been written to the file.");
        }
        rl.close();
      });
      console.log("File Writted!");

      rl.close();
    });
  });
});
