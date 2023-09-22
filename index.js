const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const { url } = require("inspector");
const filePath = path.join(__dirname, "load-img.bat");
const writeStream = fs.createWriteStream(filePath, { flags: "a" });

//limit loading episode page
const max = 425;
let min = 1;

while (min <= max) {
  let arr = [];
  // create folder every episode
  writeStream.write(`mkdir ${path.join(__dirname, `/img/${min}`)}\n`);

  //link html file for read file
  const fileName = path.join(__dirname, `${min}.html`);

  // loading html page , prepare  for analysis
  const htmlContent = fs.readFileSync(fileName, "utf-8");

  // using cheerio parsing html page
  const $ = cheerio.load(htmlContent);
  const imgUrl = $(".content-text ").find(".text-center img");

  // taking all src from images
  Array.from(imgUrl).forEach((ele) => arr.push(ele.attribs.src));

  // transform src to load img command
  const res = Array.from(arr).map((ele, index) => {
    return `curl ${ele} -o ./img/${min}/${index + 1}.jpg\n`;
  });

  // write command to script file
  res.forEach((ele) => {
    writeStream.write(ele);
  });
  min++;
}

writeStream.end();
