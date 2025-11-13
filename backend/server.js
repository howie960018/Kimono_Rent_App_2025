const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 中間件
app.use(cors());
app.use(express.json());

// MongoDB 連接
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB 連接成功'))
  .catch((err) => console.error('❌ MongoDB 連接失敗:', err));

// 基本路由
app.get('/', (req, res) => {
  res.json({ message: '和服租賃 API 正在運行' });
});

// API 路由
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 伺服器運行在 http://localhost:${PORT}`);
});
