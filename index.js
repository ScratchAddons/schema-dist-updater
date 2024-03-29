import chalk from 'chalk'
import latestSemver from 'latest-semver'
import fs from 'fs-extra'
import { globSync } from 'glob'
import path from 'path'

let fileArr = globSync("*/*.json")
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
fs.outputFileSync("dist/schema.json", JSON.stringify(JSON.parse(fs.readFileSync(verObj[latestVer], "utf-8"))))

console.log("All done!")
