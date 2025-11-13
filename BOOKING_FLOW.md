# 預約流程功能說明

## 📋 功能概述

完整實現了和服租賃的預約流程，包含四個主要頁面：

1. **日曆選擇頁面** (BookingCalendarScreen)
2. **內容填寫頁面** (BookingFormScreen)
3. **確認頁面** (BookingConfirmScreen)
4. **結果頁面** (BookingResultScreen)

## 🗂️ 文件結構

```
KimonoRental/
├── types/
│   └── booking.ts                      # 預約相關類型定義和常數
├── screens/
│   ├── BookingScreen.tsx               # 預約入口頁面
│   ├── BookingCalendarScreen.tsx       # 日曆選擇
│   ├── BookingFormScreen.tsx           # 表單填寫
│   ├── BookingConfirmScreen.tsx        # 確認預約
│   └── BookingResultScreen.tsx         # 預約結果
└── app/
    └── booking/
        ├── _layout.tsx                 # 預約路由配置
        ├── calendar.tsx                # 日曆頁面路由
        ├── form.tsx                    # 表單頁面路由
        ├── confirm.tsx                 # 確認頁面路由
        └── result.tsx                  # 結果頁面路由
```

## 📱 使用流程

### 1. 啟動預約
- 從主頁面點擊「開始預約」按鈕
- 路由：`/booking/calendar`

### 2. 選擇日期 (BookingCalendarScreen)
**功能：**
- 店鋪選擇器（目前顯示：和ギャラリー 川平屋）
- 月份切換（◀ 2025/11 ▶）
- 日曆網格（42格，6週顯示）
- 日期狀態標記：
  - ○ 預訂可能 (available)
  - × 休息 (unavailable)
  - ◎ 預約受理 (pending)
  - 満 預約完畢 (booked)
- 可預約日期有綠色邊框
- 選中日期會綠色填滿

**操作：**
- 點擊可預約日期 → 自動導航到表單頁面
- 傳遞參數：店鋪名稱、選擇日期

### 3. 填寫內容 (BookingFormScreen)
**功能：**
- 顯示預約日期和店鋪（只讀）
- 表單欄位：
  - 姓名 *必填（自動填入會員名）
  - 第一意願 *必填（單選）
  - 第二意願（選填，單選）
  - 店家備註（如果有）
  - 聯絡方式（單選：電話/Email/LINE）
  - 聯絡電話 *必填（自動填入會員電話）

**預約選項：**
- イベント、展示会の来店予約
- 川平屋 着付け教室の予約
- 着物レンタル
- 着付けサービス
- その他

**驗證：**
- 檢查必填欄位
- 驗證通過後導航到確認頁面

### 4. 確認內容 (BookingConfirmScreen)
**功能：**
- 以「標題 + 內容」格式顯示所有資訊
- 分為三個區塊：
  - 預約資訊（日期、店鋪）
  - 客戶資訊（姓名、聯絡方式、電話）
  - 預約內容（第一意願、第二意願）
- 提醒訊息：預約未確定，3個工作日內回覆

**操作：**
- 返回修改：返回表單頁面
- 申請預訂：提交預約請求

### 5. 預約結果 (BookingResultScreen)
**功能：**
- 成功圖示（綠色✓）
- 感謝訊息（日文+中文）
- 未確定提醒（紅字標籤）
- 緊急聯繫資訊（可點擊撥打電話）
- 補充說明

**設計元素：**
- 模態展示，無手勢關閉
- 頂部關閉按鈕
- 底部關閉按鈕（返回首頁）

## 🎨 設計規範

### 顏色配置
- 主色調：`#A0522D` (深棕色)
- 次要色：`#D2B48C` (淺棕色)
- 成功色：`#66BB6A` (綠色)
- 警告色：`#D32F2F` (紅色)
- 背景色：`#FAFAFA` (淺灰)
- 邊框色：`#E0E0E0` (灰色)

### 字體大小
- 標題：18-24px，粗體
- 內容：14-16px
- 說明：12-13px

## 📊 數據流

```
BookingState {
  storeName: string          // 店鋪名稱
  selectedDate: string       // 預約日期 (2025年11月13日)
  customerName: string       // 姓名
  contactMethod: string      // 聯絡方式
  contactNumber: string      // 聯絡電話
  firstChoice: string        // 第一意願
  secondChoice?: string      // 第二意願
  memo?: string             // 備註
}
```

## 🔧 技術特點

1. **狀態管理**
   - 使用 URL params 在頁面間傳遞數據
   - 自動填入會員資料（從 AuthContext）

2. **路由配置**
   - Stack 導航
   - Modal 展示（form 和 result）
   - 禁用手勢返回（result 頁面）

3. **表單驗證**
   - 必填欄位檢查
   - Alert 提示錯誤

4. **Mock 數據**
   - 日期狀態（mockDateStatuses）
   - 店鋪列表（STORES）
   - 預約選項（BOOKING_CHOICES）

## 🚀 如何使用

### 啟動預約流程
```typescript
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/booking/calendar');
```

### 自定義店鋪資訊
編輯 `types/booking.ts`：
```typescript
export const STORES = [
  { id: '1', name: '你的店鋪名稱', phone: '電話號碼' },
];
```

### 自定義日期狀態
編輯 `screens/BookingCalendarScreen.tsx`：
```typescript
const mockDateStatuses: Record<string, DateStatus> = {
  '2025-11-13': 'available',
  '2025-11-15': 'unavailable',
  // ...
};
```

## 📝 待實現功能

- [ ] 後端 API 整合（提交預約、查詢空檔）
- [ ] 多店鋪切換功能
- [ ] 預約歷史記錄
- [ ] 取消/修改預約
- [ ] 推送通知（預約確認）
- [ ] 真實日期狀態從後端獲取

## 🎯 測試建議

1. 測試日曆選擇不同狀態的日期
2. 測試表單驗證（留空必填欄位）
3. 測試返回修改功能
4. 測試完整流程（選擇→填寫→確認→結果）
5. 測試電話撥打功能（result 頁面）
