const _ = require('lodash')
const fs = require('fs')
const chalk = require('chalk')
const readline = require('readline')
const StateMachine = require('javascript-state-machine')

const Block = require('./Block')
const Toolpath = require('./Toolpath')
const Position = require('./Position')
const CannedCycle = require('./CannedCycle')

const transitions = [
  { name: 'start-toolpath', from: 'idle', to: 'toolpathing' },
  { name: 'end-toolpath', from: 'toolpathing', to: 'idle' },

  { name: 'start-canned-cycle', from: 'toolpathing', to: 'in-canned-cycle' },
  { name: 'end-canned-cycle', from: 'in-canned-cycle', to: 'toolpathing' }
]

class Program {
  constructor (filepath) {
    // noinspection JSUnresolvedFunction
    this._fsm()
    this._rawLines = []
    this._blocks = []
    this._fileStream = readline.createInterface({
      input: fs.createReadStream(filepath),
      crlfDelay: Infinity
    })
    this._position = {
      curr: new Position({ B: 0, X: 0, Y: 0, Z: 0 }),
      prev: new Position({ B: 0, X: 0, Y: 0, Z: 0 })
    }

    this.absinc = Position.ABSOLUTE
    this.toolpaths = []
  }

  toString () {
    return this._rawLines.join('\n')
  }

  getToolpathCount () {
    return this.toolpaths.length
  }

  getPosition () {
    return this._position.curr
  }

  getPrevPosition () {
    return this._position.prev
  }

  updatePosition (block) {
    const position = block.getPosition()

    this._position.prev = this._position.curr

    if (this.absinc === Position.ABSOLUTE) {
      Position.AXES.forEach(axis => {
        if (position[axis]) {
          this._position.curr[axis] = position[axis]
        }
      })
    }

    if (this.absinc === Position.INCREMENTAL) {
      Position.AXES.forEach(axis => {
        if (position[axis]) {
          this._position.curr[axis] += position[axis]
        }
      })
    }
  }

  async process () {
    let toolpath = null

    for await (const line of this._fileStream) {
      if (line !== '') {
        const block = new Block(line)
        this._blocks.push(block)
        this._rawLines.push(line)

        this._setModals(block)

        if (block.O) {
          this.number = block.O
          this.title = block.comment
        }

        if (block.hasMovement()) {
          this.updatePosition(block)
        }

        if (block.isStartOfCannedCycle() && this.is('toolpathing')) {
          this.startCannedCycle()

          const cannedCycle = new CannedCycle(block)

          toolpath.cannedCycles.push(cannedCycle)
        }

        if (this.is('in-canned-cycle') && block.G80 === true) {
          this.endCannedCycle()
        }

        if (this.is('in-canned-cycle') && block.hasMovement()) {
          const point = _.clone(this._position.curr)

          _.last(toolpath.cannedCycles).addPoint(point)
        }

        if (line[0] === 'N') {
          if (this.is('toolpathing')) {
            this.endToolpath()
            this.toolpaths.push(toolpath)
          }

          if (this.is('idle')) {
            toolpath = new Toolpath(line)

            this.startToolpath()
          }
        }

        // If we're toolpathing and `line` is not empty, save it to the toolpath
        if (
          (this.is('toolpathing') || this.is('in-canned-cycle')) &&
          line !== '' && line !== ' '
        ) {
          toolpath.lines.push(line)
        }
      }
    }

    this.endToolpath()
    this.toolpaths.push(toolpath)
  }

  describe (opts = { cannedCycle: true, cannedPoints: false }) {
    let output = `Program #${this.number} ${this.title}\n`
    output += '---------------------------------------------------------------------------------------\n'

    this.toolpaths.forEach((toolpath) => {
      if (toolpath.hasFeedrates()) {
        // const feedrates = toolpath.getFeedrates()

        output += chalk`{magenta T${_.padEnd(toolpath.tool.num, 3)}} | {blue ${toolpath.tool.desc}}\n`

        if (opts.cannedCycle && toolpath.cannedCycles.length > 0) {
          toolpath.cannedCycles.forEach(cannedCycle => {
            output += chalk`{greenBright ${cannedCycle.retractCommand}}`
            output += chalk`, {greenBright ${cannedCycle.cycleCommand}}`
            output += chalk` with {yellow ${cannedCycle.getPointCount()}} points\n`

            if (opts.cannedPoints) {
              cannedCycle
                .getPoints()
                .forEach(position => {
                  output += `X${position.X}, Y${position.Y}\n`
                })
            }
          })
        }

        // const minFeedrate = chalk.red.bold(_.min(feedrates).toFixed(3))

        // const average = _.sum(feedrates) / feedrates.length
        // const averageFeedrate = chalk.red.bold(average.toFixed(3))

        // const meanFeedrate = chalk.red.bold(_.mean(feedrates).toFixed(3))

        // const maxFeedrate = chalk.red.bold(_.max(feedrates).toFixed(3))

        // console.log(`${toolNum} | ${toolDesc} | MIN: ${minFeedrate} MAX: ${maxFeedrate} MEAN: ${meanFeedrate}`)
      }
    })

    console.log(output)
  }

  _setModals (block) {
    if (block.G00) this.rapfeed = Position.RAPID
    if (block.G01) this.rapfeed = Position.FEED

    if (block.G90) this.absinc = Position.ABSOLUTE
    if (block.G91) this.absinc = Position.INCREMENTAL
  }
}

module.exports = StateMachine.factory(Program, {
  init: 'idle', transitions
})
