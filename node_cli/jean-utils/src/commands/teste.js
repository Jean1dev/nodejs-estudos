
module.exports = {
    name: 'jean-utils',
    run: async toolbox => {
      const { print, parameters  } = toolbox
      console.log(parameters)
      print.info('Welcome to your CLI')
    }
  }
  