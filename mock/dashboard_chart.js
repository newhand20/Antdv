function chart(method){
  let res = null
  switch(method) {
    case 'GET':
      res = [21, 40, 32, 67, 35, 56]
      break;
    default:
      res = null
  }
  return res
}

module.exports = chart;