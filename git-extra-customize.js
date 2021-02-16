// This are the customization rules for use by the @johnls/git-extra tool

var params = await ui.prompts([
  {
    name: "projectName",
    initial: args.projectName,
    message: "Project name?",
    regex: "[a-z-][a-z0-9-]*",
    error:
      "Name must be supplied and be in param-case (all lowercase, only hyphens)",
  },
  {
    name: "userName",
    initial: args.userName,
    message: "GitHub user name?",
    regex: "^[a-zd](?:[a-zd]|-(?=[a-zd])){0,38}$", // From https://github.com/shinnn/github-username-regex
    error: "Must be a valid GitHub user name",
  },
  {
    name: "copyrightOwner",
    message: "Copyright owner?",
  },
])

params.projectNamePascal = changeCase.pascal(params.projectName)

let packageJson = await fs.readFile("package.json")

packageJson = packageJson
  .replace(/node-ts-cli/g, params.projectName)
  .replace(/some-user/g, params.userName)

await fs.writeFile("package.json", packageJson)

let license = await fs.readFile("LICENSE")

license.replace(/Some User/, params.copyrightOwner)

await fs.writeFile("LICENSE", license)

await fs.mkdir(".vscode")
