function chart(method){
  let res = null
  switch(method) {
    case 'get':
      res = [20, 40, 32, 67, 35, 56]
      break;
    default:
      res = null
  }
  return res
}

module.exports = chart;