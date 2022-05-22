const validMarkDownFileRegExp = new RegExp(
  `\\.(md|markdown|Rmd)$`,
  'i'
)

function isValidMarkDownFile(filename) {
  return validMarkDownFileRegExp.test(filename)
}

export default isValidMarkDownFile
