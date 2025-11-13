export interface Record {
  id: string;
  date: string;
  type: string; // 服務體驗、商品購買
  menu_item: string;
  rating: number; // 1-5
  notes: string;
  image_url: string;
  status: string;
}

export const RECORD_TYPES = ['服務體驗', '商品購買', '其他'];

export const MENU_ITEMS = [
  '着付け教室',
  '重ね襟',
  '着物 丸洗い',
  '着物 仕立て',
  '訪問著',
  '留袖',
  '浴衣',
  '帯',
  '草履',
  '其他',
];

export const mockRecords: Record[] = [
  {
    id: 'R001',
    date: '2025年11月14日',
    type: '服務體驗',
    menu_item: '着付け教室',
    rating: 4,
    notes: '老師非常耐心，讓我很快掌握了基本的穿著步驟。',
    image_url: 'https://picsum.photos/seed/record1/600/400',
    status: 'completed',
  },
  {
    id: 'R002',
    date: '2025年11月13日',
    type: '商品購買',
    menu_item: '重ね襟',
    rating: 5,
    notes: '選購了粉色和綠色的重ね襟，搭配振袖效果很好。',
    image_url: 'https://picsum.photos/seed/record2/600/400',
    status: 'completed',
  },
  {
    id: 'R003',
    date: '2025年11月10日',
    type: '服務體驗',
    menu_item: '着物 丸洗い',
    rating: 5,
    notes: '清洗後的和服煥然一新，非常滿意專業的服務。',
    image_url: 'https://picsum.photos/seed/record3/600/400',
    status: 'completed',
  },
];
