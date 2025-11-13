const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 註冊
router.post('/register', async (req, res) => {
  try {
    console.log('📝 收到註冊請求，body:', req.body);
    const { fullName, email, phone, password, confirmPassword } = req.body;

    // 驗證必填欄位
    if (!fullName || !email || !phone || !password) {
      console.log('❌ 缺少必填欄位:', { fullName: !!fullName, email: !!email, phone: !!phone, password: !!password });
      return res.status(400).json({ 
        success: false,
        message: '請填寫所有必填欄位' 
      });
    }

    // 驗證密碼匹配
    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: '密碼不匹配' 
      });
    }

    // 檢查郵箱是否已存在
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: '此電子郵件已被註冊' 
      });
    }

    // 建立新使用者
    const user = await User.create({
      fullName,
      email,
      phone,
      password
    });

    // 生成 JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: '註冊成功',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        memberLevel: user.memberLevel,
        points: user.points
      }
    });

  } catch (error) {
    console.error('註冊錯誤:', error);
    res.status(500).json({ 
      success: false,
      message: '註冊失敗，請稍後再試' 
    });
  }
});

// 登入
router.post('/login', async (req, res) => {
  try {
    console.log('📧 登入請求:', { email: req.body.email, hasPassword: !!req.body.password });
    const { email, password } = req.body;

    // 驗證必填欄位
    if (!email || !password) {
      console.log('❌ 缺少必填欄位');
      return res.status(400).json({ 
        success: false,
        message: '請輸入電子郵件和密碼' 
      });
    }

    // 查找使用者（包含密碼）
    const user = await User.findOne({ email }).select('+password');
    console.log('👤 找到使用者:', user ? '是' : '否');
    
    if (!user) {
      console.log('❌ 使用者不存在');
      return res.status(401).json({ 
        success: false,
        message: '電子郵件或密碼錯誤' 
      });
    }

    // 驗證密碼
    const isPasswordCorrect = await user.comparePassword(password);
    console.log('🔑 密碼驗證:', isPasswordCorrect ? '成功' : '失敗');
    
    if (!isPasswordCorrect) {
      console.log('❌ 密碼錯誤');
      return res.status(401).json({ 
        success: false,
        message: '電子郵件或密碼錯誤' 
      });
    }

    // 生成 JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ 登入成功，已生成 token');
    res.json({
      success: true,
      message: '登入成功',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        memberLevel: user.memberLevel,
        points: user.points,
        birthday: user.birthday,
        address: user.address
      }
    });

  } catch (error) {
    console.error('❌ 登入錯誤:', error);
    res.status(500).json({ 
      success: false,
      message: '登入失敗，請稍後再試' 
    });
  }
});

module.exports = router;
