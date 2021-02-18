// This are the customization rules for use by the @johnls/git-extra tool

const params = await ui.prompts([
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

const newBinName = changeCase.param(params.projectName)
const newToolName = changeCase.pascal(params.projectName) + "Tool"

await fs.inPlaceUpdate("src/node-ts-cli.ts", [[/NodeTsCliTool/g, newToolName]])
await fs.inPlaceUpdate("src/NodeTsCliTool.ts", [
  [/NodeTsCliTool/g, newToolName],
])
await fs.inPlaceUpdate("src/NodeTsCliTool.test.ts", [
  [/NodeTsCliTool/g, newToolName],
])

await fs.move("src/node-ts-cli.ts", path.join("src", newBinName + ".ts"))
await fs.move("src/NodeTsCliTool.ts", path.join("src", newToolName + ".ts"))
await fs.move(
  "src/NodeTsCliTool.test.ts",
  path.join("src", newToolName + ".test.ts")
)

await fs.inPlaceUpdate("package.json", [
  [/node-ts-cli/g, newBinName],
  [/some-user/g, params.userName],
])

await fs.inPlaceUpdate("LICENSE", [[/Some User/, params.copyrightOwner]])

await fs.ensureDir(".vscode")
