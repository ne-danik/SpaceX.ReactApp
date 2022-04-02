export const numberToRanks = (num) => {
  const reg = /\B(?=(\d{3})+(?!\d))/g;
  const newNum = num.toString().replace(reg, " ").split(" ");

  switch (newNum.length) {
    case 1:
      return newNum[0];
    case 2:
      return newNum[0] + 'K';
    case 3:
      return newNum[0] + 'M';
    case 4:
      return newNum[0] + 'B';
    default:
      return num;
  }
}