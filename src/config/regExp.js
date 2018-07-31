export default function (val, type) {
  if (type === 'phone') {
    let reg = new RegExp('^(13|14|15|17|18)[0-9]{9}$')
    if (reg.test(val)) {
      return true
    } else {
      return false
    }
  } else if (type === 'regCode') {
    let reg = new RegExp('^[0-9]{6}$')
    if (reg.test(val)) {
      return true
    } else {
      return false
    }
  } else if (type === 'password') {
    let reg = new RegExp('^[a-zA-Z_0-9]{6,20}$')
    if (reg.test(val)) {
      return true
    } else {
      return false
    }
  }
}
