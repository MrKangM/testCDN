const glob = require("fast-glob");
const fs = require("fs");

const folders = ["clothes", "heads", "vehicles", "weapons"];

const HTMLBoiler = `
<html>
  <head>
    <title>Stuyk's GTA:V Image Archive</title>
  </head>
  <body>
    <h2>
        <a href="index.html">&lt; Back</a><br/>
    </h2>
    <!-- Replace Me -->
    <h2>
        <a href="index.html">&lt; Back</a><br/>
    </h2>
  </body>
</html>
`;

for (let folder of folders) {
  let content = "";
  const files = glob.sync(`./${folder}/**/*.webp`);

  for (let file of files) {
    const fileSplit = file.split("/");
    const fileWithExt = fileSplit[fileSplit.length - 1];
    const fileName = fileWithExt.split(".")[0];

    const url = `https://cdn.jsdelivr.net/gh/Stuyk/gtav-image-archive/${folder}/${fileWithExt}`;

    content += `${fileName}<br />\n`;
    content += `<img src="${url}"/><br />\n`;
  }

  const data = HTMLBoiler.replace("<!-- Replace Me -->", content);
  fs.writeFileSync(`${folder}.html`, data);
}
