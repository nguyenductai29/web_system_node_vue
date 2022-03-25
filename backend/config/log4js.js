export default {
    appenders: {
      system: { type: 'dateFile', filename: 'logs/system.log', pattern: '-yyyy-MM-dd', daysToKeep: 7, layout: { type: 'pattern', pattern: '[%d] [%5p] [%h] - %m' } }
    },
    categories: {
      default: { appenders: ['system'], level: 'all', enableCallStack: true }
    }
  }
