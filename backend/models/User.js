const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, '請輸入姓名'],
    trim: true
  },
  email: {
    type: String,
    required: [true, '請輸入電子郵件'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, '請輸入有效的電子郵件']
  },
  phone: {
    type: String,
    required: [true, '請輸入手機號碼'],
    trim: true
  },
  password: {
    type: String,
    required: [true, '請輸入密碼'],
    minlength: [8, '密碼至少需要 8 個字元'],
    select: false // 查詢時預設不返回密碼
  },
  birthday: {
    type: Date
  },
  address: {
    type: String,
    trim: true
  },
  memberLevel: {
    type: String,
    enum: ['普通會員', '銀牌會員', '金牌會員', '白金會員'],
    default: '普通會員'
  },
  points: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 儲存前加密密碼
userSchema.pre('save', async function(next) {
  // 如果密碼沒有修改，跳過加密
  if (!this.isModified('password')) return next();
  
  // 加密密碼
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 比對密碼方法
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// 更新 updatedAt 時間戳
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
