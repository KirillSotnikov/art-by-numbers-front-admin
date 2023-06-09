export const ProductType = Object.freeze({
  patriotic: 'patriotic',
  golden_picture: 'golden-picture',
  people: 'people',
  animals: 'animals',
  flowers_and_kitchen: 'flowers-and-kitchen',
  scenery: 'scenery',
  still_life: 'still-life',
  reproduction: 'reproduction',
  holidays: 'holidays',
  character_and_heroes: 'character-and-heroes',
  space_and_abstraction: 'space-and-abstraction',
  transport: 'transport',
  for_children: 'for-children',
  polyptychs: 'polyptychs',
  men: 'men',

  mosaik: 'mosaik',

  acril_varnish: 'acril-varnish',
  molbert: 'molbert',
  tassel: 'tassel',

  other: 'other',
})

export const productTypeLabels = {
  [ProductType.patriotic]: 'Патріотичні сюжети',
  [ProductType.golden_picture]: 'Картини в золоті',
  [ProductType.people]: 'Люди на картині',
  [ProductType.animals]: 'Тварини',
  [ProductType.flowers_and_kitchen]: 'Квіти та кухонні',
  [ProductType.scenery]: 'Пейзажі',
  [ProductType.still_life]: 'Натюрморти',
  [ProductType.reproduction]: 'Репродукції художників',
  [ProductType.holidays]: 'Свята',
  [ProductType.character_and_heroes]: 'Персонажі та герої',
  [ProductType.space_and_abstraction]: 'Абстракція і космос',
  [ProductType.transport]: 'Транспорт',
  [ProductType.for_children]: 'Картиини для дітей',
  [ProductType.polyptychs]: 'Поліптихи',
  [ProductType.men]: 'Чоловічі',

  [ProductType.mosaik]: 'Алмазна мозаїка',

  [ProductType.acril_varnish]: 'Акрилові лаки',
  [ProductType.molbert]: 'Мольберти',
  [ProductType.tassel]: 'Пензлі',

  [ProductType.other]: 'Інше',
}

export const ProductSize = Object.freeze({
  '25_25': '25x25',
  '30_30': '30x30',
  '30_40': '30x40',
  '40_40': '40x40',
  '40_50': '40x50',
  '50_50': '50x50',
  '40_60': '40x60',
  '20_ML': '20ml',
  '50_ML': '50ml',
  'M_14': 'm14',
  'M_19': 'm19',
});

export const Difficult = Object.freeze({
  NULL: '0',
  ONE: '1',
  TWO: '2',
  THREE: '3',
  FOUR: '4',
  FIVE: '5',
});

export const Category = Object.freeze({
  picture_by_numbers: 'picture-by-numbers',
  mosaik: 'mosaik',
  combo_technique: 'combo-technique',
  accessories: 'accessories',
  other: 'other',
})

export const categoryLabels = {
  [Category.picture_by_numbers]: 'Картини за номерами',
  [Category.mosaik]: 'Алмазна мозаїка',
  [Category.accessories]: 'Аксесуари',
  [Category.combo_technique]: 'Комбінована техніка',
  [Category.other]: 'Інше',
}

export const LabelType = Object.freeze({
  SALE: 'sale',
  NEW: 'new',
  TOP_SALES: 'top-sales',
})
export const labelTypeLabels = {
  [LabelType.SALE]: 'Розпродаж',
  [LabelType.NEW]: 'Новинка',
  [LabelType.TOP_SALES]: 'Топ продажів',
}

export const DeliveryType = Object.freeze({
  POST:'post',
  POSTOMAT:'postomat',
  TAKEAWAY:'takeaway',
})


export const PaymentType = Object.freeze({
  APPLE_PAY:'apple-pay',
  GOOGLE_PAY:'google-pay',
  CARD:'card',
  COD:'cod',
})

export const OrderStatus =  Object.freeze({
  REQUESTED: 'requested',
  PROCESSED: 'processed',
  DELIVERED: 'delivered',
  SENT: 'sent',
  RECEIVED: 'received',
  CANCELED: 'canceled',
})

export const paymentTypeLabels = {
  [PaymentType.APPLE_PAY]: 'Apple pay',
  [PaymentType.GOOGLE_PAY]: 'Google pay',
  [PaymentType.CARD]: 'Visa/Mastercard',
  [PaymentType.COD]: 'Накладний платіж',
}

export const orderStatusLabels = {
  [OrderStatus.REQUESTED]: 'Прийнято',
  [OrderStatus.PROCESSED]: 'У процессі',
  [OrderStatus.DELIVERED]: 'Доставлено',
  [OrderStatus.SENT]: 'Відправлено',
  [OrderStatus.RECEIVED]: 'Забрано',
  [OrderStatus.CANCELED]: 'Відмінено',
}

export const orderDeliveryTypeLabels = {
  [DeliveryType.TAKEAWAY]: 'Самовивіз',
  [DeliveryType.POST]: 'Відділення НП',
  [DeliveryType.POSTOMAT]: 'Поштомат НП',
}

export const PaymentStatus = Object.freeze({
  REQUESTED: 'requested',
  RECEIVED: 'received',
})

export const orderPaymentDataLabels = {
  [PaymentStatus.REQUESTED]: 'Запрошено',
  [PaymentStatus.RECEIVED]: 'Отримано',
}
