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
  if (['Дед Мороз', 'Снегурочка'].includes(hero)) {
    return `${hero}! ${hero}! ${hero}!`;
  }
  return 'Не будем такого звать';
};
