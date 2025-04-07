export const kolobok = (nameHero: string) => {
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

export const newYear = (hero: string) => {
  if (['Дед Мороз', 'Снегурочка'].includes(hero)) {
    return `${hero}! ${hero}! ${hero}!`;
  }
  return 'Не будем такого звать';
};
