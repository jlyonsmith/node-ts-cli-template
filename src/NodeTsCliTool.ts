import parseArgs from "minimist"
import { fullVersion } from "./version"

export class NodeTsCliTool {
  toolName: string
  log: any
  debug: boolean

  constructor(options: any) {
    if (!options || !options.toolName || !options.log) {
      throw new Error("Must supply options argument with toolName and log")
    }

    this.toolName = options.toolName
    this.log = options.log
    this.debug = !!options.debug
  }

  async run(argv: string[]): Promise<number> {
    const options = {
      string: [],
      boolean: ["help", "version", "debug"],
      alias: {},
      default: {},
    }
    const args = parseArgs(argv, options)

    if (args.help) {
      this.log.info(`
NodeJS/TypeScript CLI Tool

Usage:
 ${this.toolName} [--help] [--debug] [--version]

Does something cool.

Options:

--help            Displays this help
--version         Displays tool version
--debug           Give additional debugging information
`)
      return 0
    }

    this.debug = args.debug

    if (args.version) {
      this.log.info(`${fullVersion}`)
      return 0
    }

    // TODO: Do something cool...

    return 0
  }
}
