export const kolobok = (nameHero) => {
  switch (nameHero) {
    case 'дедушка':
      return 'Я от дедушки ушёл';
    case 'заяц':
      return 'Я от зайца ушёл';
    case 'лиса':
      return 'Меня съели';
    default:
      return `Не встречал ${nameHero}`;
  }
};

export const newYear = (hero) => {
  return `${hero}! ${hero}! ${hero}!`;
};
