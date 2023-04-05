const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");
const chalk = require("chalk");

const base = path.join(__dirname, "temp");

(async function start() {
  try {
    if (!fsSync.existsSync(base)) {
      await fs.mkdir(base);
      console.log(chalk.green("Created temporary directory"));
      await fs.writeFile(
        path.join(base, "logs.txt"),
        process.argv.slice(2).join(" ") ?? ""
      );
      console.log(chalk.green("Created logs.txt"));
    } else {
      await fs.appendFile(
        path.join(base, "logs.txt"),
        ["\n", ...process.argv.slice(2).join(" ")].join("") ?? ""
      );
      console.log(chalk.green("Created logs.txt"));
      const data = await fs.readFile(path.join(base, "logs.txt"), {
        encoding: "utf-8",
      });
      console.log(chalk.green(data));
    }
  } catch (e) {
    console.log(chalk.red("Failed to create temporary directory\n"), e);
  }
})();
