// eslint-disable-next-line no-unused-vars
const kolobok = (nameHero) => {
  switch (nameHero) {
    case 'дедушка':
      return 'Я от дедушки ушёл';
    case 'заяц':
      return 'Я от зайца ушёл';
    case 'лиса':
      return 'Меня съели';
  }
  return 'Не встречал';
};

// eslint-disable-next-line no-unused-vars
const newYear = (hero) => {
  return `${hero}! ${hero}! ${hero}!`;
};
