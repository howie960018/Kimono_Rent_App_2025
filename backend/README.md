# 和服租賃後端 API

## 前置需求

1. **安裝 MongoDB**
   - 下載並安裝 MongoDB Community Server
   - 或使用 MongoDB Atlas 雲端服務

2. **啟動 MongoDB**
   ```bash
   # Windows (如果使用本機 MongoDB)
   # MongoDB 應該會自動作為服務運行
   # 或手動啟動：
   mongod
   ```

## 安裝步驟

1. 進入 backend 資料夾
   ```bash
   cd backend
   ```

2. 安裝依賴套件（已完成）
   ```bash
   npm install
   ```

3. 設定環境變數
   - 編輯 `.env` 檔案
   - 如果使用 MongoDB Atlas，更新 `MONGODB_URI`
   - 修改 `JWT_SECRET` 為更安全的密鑰

## 啟動伺服器

```bash
# 開發模式（自動重啟）
npm run dev

# 或正式模式
npm start
```

伺服器將運行在 `http://localhost:3000`

## API 端點

### 認證 API (`/api/auth`)

#### 1. 註冊
```
POST /api/auth/register

Request Body:
{
  "fullName": "王小明",
  "email": "wang@example.com",
  "phone": "0912-345-678",
  "password": "12345678",
  "confirmPassword": "12345678"
}

Response:
{
  "success": true,
  "message": "註冊成功",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "fullName": "王小明",
    "email": "wang@example.com",
    "phone": "0912-345-678",
    "memberLevel": "普通會員",
    "points": 0
  }
}
```

#### 2. 登入
```
POST /api/auth/login

Request Body:
{
  "email": "wang@example.com",
  "password": "12345678"
}

Response:
{
  "success": true,
  "message": "登入成功",
  "token": "jwt_token_here",
  "user": { ... }
}
```

### 使用者 API (`/api/user`)

**注意**: 以下 API 需要在 Header 中加入 Authorization

```
Headers:
Authorization: Bearer {your_jwt_token}
```

#### 1. 取得使用者資料
```
GET /api/user/profile

Response:
{
  "success": true,
  "user": {
    "id": "user_id",
    "fullName": "王小明",
    "email": "wang@example.com",
    "phone": "0912-345-678",
    "memberLevel": "普通會員",
    "points": 0,
    "birthday": "1990-01-01",
    "address": "台北市信義區",
    "createdAt": "2025-11-13T..."
  }
}
```

#### 2. 更新使用者資料
```
PUT /api/user/profile

Request Body:
{
  "fullName": "王大明",
  "phone": "0912-999-888",
  "birthday": "1990-01-01",
  "address": "台北市大安區"
}

Response:
{
  "success": true,
  "message": "更新成功",
  "user": { ... }
}
```

#### 3. 更改密碼
```
PUT /api/user/change-password

Request Body:
{
  "currentPassword": "12345678",
  "newPassword": "newpassword123"
}

Response:
{
  "success": true,
  "message": "密碼更新成功"
}
```

#### 4. 刪除帳號
```
DELETE /api/user/profile

Response:
{
  "success": true,
  "message": "帳號已刪除"
}
```

## 測試 API

使用 Postman 或 Thunder Client (VS Code 擴展) 測試 API：

1. 先呼叫註冊 API 建立帳號
2. 取得返回的 token
3. 在其他 API 請求中加入 Authorization header
4. 測試各種功能

## MongoDB Compass 連接

1. 打開 MongoDB Compass
2. 連接字串: `mongodb://localhost:27017`
3. 連接後可以看到 `kimonorental` 資料庫
4. 查看 `users` collection 中的使用者資料

## 資料模型

### User (使用者)
- `fullName`: 姓名
- `email`: 電子郵件（唯一）
- `phone`: 手機號碼
- `password`: 密碼（加密儲存）
- `birthday`: 生日
- `address`: 地址
- `memberLevel`: 會員等級（普通/銀牌/金牌/白金）
- `points`: 點數
- `createdAt`: 建立時間
- `updatedAt`: 更新時間

## 安全性

- 密碼使用 bcrypt 加密
- JWT token 7 天有效期
- 敏感 API 需要身份驗證
- 查詢時預設不返回密碼

## 下一步

現在後端 API 已經準備好了！接下來需要：

1. 確保 MongoDB 正在運行
2. 啟動後端伺服器（`npm run dev`）
3. 整合前端頁面與 API
4. 測試完整的登入/註冊流程
