let denyList = []

exports.replaceDenyList = list => {
  denyList = list
}

exports.getDenyList = () => denyList

exports.clear = () => denyList.splice(0, denyList.length)
