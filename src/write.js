export default function(type, ob) {
  Object.assign(ob, { type });
  const data = JSON.stringify(ob);
  const fs = require("fs");
  try {
    fs.writeFileSync("myfile.json", data);
  } catch (e) {
    alert("Failed to save the file !");
  }
}
