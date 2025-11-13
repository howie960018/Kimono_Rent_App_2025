const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    // 從 header 取得 token
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: '未提供身份驗證令牌' 
      });
    }

    // 驗證 token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false,
      message: '身份驗證失敗' 
    });
  }
};

module.exports = authMiddleware;
