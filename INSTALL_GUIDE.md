# 安裝指引

## 前端依賴套件

請在專案根目錄執行：

```bash
npm install @react-native-async-storage/async-storage
```

## 後端依賴套件

請在 backend 目錄執行：

```bash
cd backend
npm install jsonwebtoken bcryptjs
```

## 環境變數設定

在 `backend` 目錄建立 `.env` 檔案（如果還沒有）：

```env
MONGODB_URI=mongodb://localhost:27017/kimono_rental
JWT_SECRET=your_super_secret_key_change_this_in_production
PORT=3000
```

## 啟動說明

### 1. 啟動 MongoDB
確保 MongoDB 服務正在運行

### 2. 啟動後端伺服器
```bash
cd backend
npm run dev
```

### 3. 啟動前端應用
在另一個終端機視窗：
```bash
npm start
```

## 完成的功能

### ✅ 後端 API
- JWT 認證中間件
- 使用者註冊（帶 JWT）
- 使用者登入（帶 JWT）
- 取得使用者個人資料（需要 JWT）
- 更新使用者資料（需要 JWT）
- 更改密碼（需要 JWT）
- 刪除帳號（需要 JWT）

### ✅ 前端整合
- AuthContext 狀態管理
- AsyncStorage 儲存 token 和使用者資料
- API 服務自動附加 JWT token
- 登入後自動儲存並保持登入狀態
- 登出清除所有認證資料
- ProfileScreen 顯示真實使用者資料
- EditProfileScreen 更新使用者資料
- 自動處理 401 未授權回應

## 測試流程

1. **註冊新帳號**
   - 進入 App → 我的 → 註冊新帳號
   - 填寫資料並送出
   - 註冊成功後會自動登入

2. **登入**
   - 進入 App → 我的 → 登入
   - 輸入帳號密碼
   - 登入成功後會返回個人資料頁面

3. **查看個人資料**
   - 個人資料頁面會顯示真實的使用者資訊
   - 包含姓名、信箱、會員等級和點數

4. **編輯個人資料**
   - 點擊「編輯」按鈕
   - 修改資料並儲存
   - 資料會同步到資料庫和本地狀態

5. **登出**
   - 點擊「登出」按鈕
   - 確認後會清除所有認證資料
   - 返回未登入狀態

6. **重新啟動 App**
   - 關閉並重新開啟 App
   - 應該會自動保持登入狀態（從 AsyncStorage 載入）

## 安全性說明

- 所有需要認證的 API 都使用 JWT 保護
- 密碼使用 bcrypt 加密儲存
- Token 儲存在裝置本地（AsyncStorage）
- API 請求自動附加 Authorization header
- 401 回應自動清除無效 token
