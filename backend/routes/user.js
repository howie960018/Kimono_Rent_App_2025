const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// 取得使用者資料（需要登入）
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: '找不到使用者' 
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        memberLevel: user.memberLevel,
        points: user.points,
        birthday: user.birthday,
        address: user.address,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('取得使用者資料錯誤:', error);
    res.status(500).json({ 
      success: false,
      message: '取得使用者資料失敗' 
    });
  }
});

// 更新使用者資料（需要登入）
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { fullName, phone, birthday, address } = req.body;

    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: '找不到使用者' 
      });
    }

    // 更新欄位
    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (birthday) user.birthday = birthday;
    if (address !== undefined) user.address = address;

    await user.save();

    res.json({
      success: true,
      message: '更新成功',
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
    console.error('更新使用者資料錯誤:', error);
    res.status(500).json({ 
      success: false,
      message: '更新使用者資料失敗' 
    });
  }
});

// 更改密碼（需要登入）
router.put('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false,
        message: '請提供當前密碼和新密碼' 
      });
    }

    const user = await User.findById(req.userId).select('+password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: '找不到使用者' 
      });
    }

    // 驗證當前密碼
    const isPasswordCorrect = await user.comparePassword(currentPassword);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ 
        success: false,
        message: '當前密碼錯誤' 
      });
    }

    // 更新密碼
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: '密碼更新成功'
    });

  } catch (error) {
    console.error('更改密碼錯誤:', error);
    res.status(500).json({ 
      success: false,
      message: '更改密碼失敗' 
    });
  }
});

// 刪除帳號（需要登入）
router.delete('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: '找不到使用者' 
      });
    }

    res.json({
      success: true,
      message: '帳號已刪除'
    });

  } catch (error) {
    console.error('刪除帳號錯誤:', error);
    res.status(500).json({ 
      success: false,
      message: '刪除帳號失敗' 
    });
  }
});

module.exports = router;
