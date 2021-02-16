import { NodeTsCliTool } from "./NodeTsCliTool"

let container = null

beforeEach(() => {
  container = {
    toolName: "stampver",
    debug: false,
    log: {
      info: () => undefined,
      warning: () => undefined,
      error: () => undefined,
    },
  }
})

test("constructor", () => {
  const tool = new NodeTsCliTool(container)

  // Happy path
  expect(tool).not.toBeNull()

  // Missing options
  expect(() => new NodeTsCliTool({})).toThrowError("Must supply")
})

test("run", async () => {
  // Happy path
  const tool = new NodeTsCliTool(container)

  await expect(tool.run([])).resolves.toBe(0)

  // Version
  await expect(tool.run(["--version"])).resolves.toBe(0)

  // Help
  await expect(tool.run(["--help"])).resolves.toBe(0)
})
