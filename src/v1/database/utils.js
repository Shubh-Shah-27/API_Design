const fs = require("fs");   // file system-related operations.

const saveToDatabase = (DB) => {
  fs.writeFileSync("./src/v1/database/db.json", JSON.stringify(DB, null, 2), {
    encoding: "utf-8",
  });
};

module.exports = { saveToDatabase };
