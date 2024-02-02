const checkInteger = (num) => (parseInt(num, 10) !== parseFloat(num) 
  || Number(num) < 1 || Number(num) > 5); 

module.exports = checkInteger;
