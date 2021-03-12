// 세 자리수 마다 콤마 찍기
const pointer = (num: number): string => {
  let result = "";
  let stringify = num.toString();

  let i = 0;
  let remainder = stringify.length % 3;

  while (i < stringify.length) {
    if (i % 3 === remainder && i !== 0) result += ",";
    result += stringify[i];
    i++;
  }

  return result;
};

export default pointer;
