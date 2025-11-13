# 登入註冊功能說明

## 新增頁面

### 1. 登入頁面 (LoginScreen)
**路徑**: `/login`
**檔案**: `screens/LoginScreen.tsx`, `app/login.tsx`

**功能包含**:
- 電子郵件/帳號輸入
- 密碼輸入
- 忘記密碼連結
- 登入按鈕
- 第三方登入選項 (Apple, Google)
- 註冊連結

**測試方式**:
在 ProfileScreen 點擊「登入」按鈕即可進入

---

### 2. 註冊頁面 (RegisterScreen)
**路徑**: `/register`
**檔案**: `screens/RegisterScreen.tsx`, `app/register.tsx`

**功能包含**:
- 姓名輸入
- 電子郵件輸入
- 手機號碼輸入
- 密碼輸入
- 確認密碼輸入
- 服務條款同意確認框
- 第三方註冊選項 (Apple, Google)
- 登入連結

**測試方式**:
- 在 ProfileScreen 點擊「註冊新帳號」按鈕
- 或在 LoginScreen 點擊「立即註冊」連結

---

### 3. 個人資料頁面 (ProfileScreen)
**路徑**: `/(tabs)/我的`
**檔案**: `screens/ProfileScreen.tsx`

**功能包含**:

#### 未登入狀態:
- 歡迎訊息
- 登入按鈕
- 註冊按鈕
- 會員權益展示

#### 已登入狀態:
- 使用者頭像和基本資訊
- 會員等級徽章
- 點數卡片
- 功能選單:
  - 我的預約
  - 我的收藏
  - 我的優惠券
  - 付款方式
- 設定選單:
  - 通知設定
  - 隱私權設定
  - 幫助中心
  - 聯絡我們
- 登出按鈕

**測試登入狀態切換**:
在 `ProfileScreen.tsx` 第 14 行修改 `isLoggedIn` 的初始值:
```typescript
const [isLoggedIn, setIsLoggedIn] = useState(true);  // 設為 true 查看登入狀態
```

---

### 4. 編輯個人資料頁面 (EditProfileScreen)
**路徑**: `/edit-profile`
**檔案**: `screens/EditProfileScreen.tsx`, `app/edit-profile.tsx`

**功能包含**:
- 更換頭像按鈕
- 個人資料表單:
  - 姓名
  - 電子郵件
  - 手機號碼
  - 生日 (日期選擇器)
  - 地址
- 安全設定:
  - 更改密碼
  - 雙重認證
- 刪除帳號功能
- 儲存/返回按鈕

**測試方式**:
在已登入的 ProfileScreen 點擊「編輯」按鈕

---

## 導航架構

```
app/
├── _layout.tsx (新增了 login, register, edit-profile 路由)
├── login.tsx (登入頁面路由)
├── register.tsx (註冊頁面路由)
├── edit-profile.tsx (編輯個人資料路由)
└── (tabs)/
    └── _layout.tsx (包含 ProfileScreen 的標籤)
```

---

## 設計特色

1. **一致的視覺風格**:
   - 使用品牌色 `#A0522D` (棕色)
   - 統一的輸入框樣式
   - 圓角設計 (8px)

2. **良好的使用者體驗**:
   - 鍵盤自適應 (KeyboardAvoidingView)
   - 清晰的導航流程
   - 友善的錯誤提示區域

3. **完整的功能覆蓋**:
   - 登入/註冊流程
   - 個人資料管理
   - 第三方登入選項
   - 安全設定

---

## 待實作功能 (TODO)

所有頁面目前僅為前端 UI，以下功能需要後續實作:

- [ ] 真實的登入 API 整合
- [ ] 真實的註冊 API 整合
- [ ] 表單驗證 (email 格式、密碼強度等)
- [ ] 第三方登入整合 (Apple Sign In, Google Sign In)
- [ ] 個人資料更新 API
- [ ] 日期選擇器實作
- [ ] 圖片上傳功能
- [ ] 忘記密碼流程
- [ ] JWT token 管理
- [ ] 使用者狀態管理 (Context/Redux)
- [ ] 錯誤處理和顯示

---

## 如何測試

1. **啟動應用程式**:
   ```bash
   npm start
   ```

2. **測試未登入狀態**:
   - 進入「我的」標籤
   - 應該看到登入/註冊按鈕

3. **測試登入頁面**:
   - 點擊「登入」按鈕
   - 查看登入表單

4. **測試註冊頁面**:
   - 從登入頁面點擊「立即註冊」
   - 或從個人資料頁面點擊「註冊新帳號」

5. **測試已登入狀態**:
   - 修改 `ProfileScreen.tsx` 中的 `isLoggedIn` 為 `true`
   - 重新載入應用程式
   - 查看完整的個人資料介面

6. **測試編輯功能**:
   - 在已登入狀態下點擊「編輯」按鈕
   - 查看編輯表單

---

## 注意事項

- 當前版本不會真正儲存任何資料
- 登入狀態切換需要手動修改程式碼
- 所有 API 調用都是 console.log 模擬
- 第三方登入按鈕目前無實際功能
