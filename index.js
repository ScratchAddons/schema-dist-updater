const chalk = require("chalk")
const latestSemver = require("latest-semver")
const fs = require("fs-extra")
const glob = require("glob")
const path = require("path")

let fileArr = glob.sync("*/*.json")
console.log(`Found ${chalk.inverse(fileArr.length)} versions/files.`)

let verObj = {}
let verArr = []

fileArr.forEach(file => {
	const filePath = path.parse(file)
	verObj[filePath.name] = file
	verArr.push(filePath.name)
})

let latestVer = latestSemver(verArr).split(".").slice(0, 2).join(".")
console.log(`Latest version is ${chalk.inverse(latestVer)}.`)

console.log(`Copying latest schema to ${chalk.inverse("dist/schema.json")}.`)
fs.outputFileSync("dist/schema.json", fs.readFileSync(verObj[latestVer]))

console.log("All done!")
