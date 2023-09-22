const fs = require("fs");
const path = require("path");
require("dotenv").config();
const filePath = path.join(__dirname, "load-file.bat");
const url = process.env.SITE_URL;
let arr = [];
const max = 425;
let min = 1;

while (min <= max) {
  let temp = `curl ${url}${min}/ -o ${min}.html`;
  arr.push(temp);
  min++;
}
// write handle
const writeStream = fs.createWriteStream(filePath, { flags: "a" });
arr.forEach((value) => {
  writeStream.write(value + "\n");
});
writeStream.end();
