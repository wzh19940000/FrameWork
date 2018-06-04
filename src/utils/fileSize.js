const fixTo3 = double => {
    double = double.toString()
    if (double.includes('.')) {
        const [digit, decimal] = double.split('.')
        if (digit.length > 2) {
            return digit
        } else {
            if (digit.length + decimal.length < 4) {
                return double.padEnd(4, '0')
            } else {
                return parseFloat(double).toFixed(3 - digit.length)
            }
        }
    } else {
        return double.length < 3 ? (double + '.').padEnd(4, '0') : double
    }
}
const formatSize = size => {
    if (size > 1e12) {
        return fixTo3(size / 1099511627776) + 'T'
    } else if (size > 1e9) {
        return fixTo3(size / 1073741824) + 'G'
    } else if (size > 1e6) {
        return fixTo3(size / 1048576) + 'M'
    } else if (size > 1e3) {
        return fixTo3(size / 1024) + 'K'
    } else {
        return size + 'B'
    }
}
export default formatSize