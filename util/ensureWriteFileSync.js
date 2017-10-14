const { existsSync, mkdirSync, writeFileSync } = require('fs')

// writes into a file but creates directories optionally if they don't exist
const ensureWriteFileSync = (path, data, options) => {
  const dirPath = path.substring(0, path.lastIndexOf('/'))

  if (!existsSync(dirPath)) {
    mkdirSync(dirPath)
  }

  return writeFileSync(path, data, options)
}

module.exports = ensureWriteFileSync
