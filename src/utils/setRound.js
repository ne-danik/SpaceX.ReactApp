export const setSplit = (num, limit = 3) => {
  const reg = new RegExp(`(?=(?:\\d{${limit}})+(?!\\d))`);
  const arr = String(num).split(reg);
  return arr;
}

export const setRound = (num, limit = 3) => {
  const result = setSplit(num, limit);

  switch (result.length) {
    case 1:
      return result[0];
    case 2:
      return result[0] + 'K';
    case 3:
      return result[0] + 'M';
    case 4:
      return result[0] + 'B';
    default:
      return num;
  }
}

export const setFloor = (num, limit = 3) => {
  const newNum = setSplit(num, limit);
  return newNum.join('.');
}