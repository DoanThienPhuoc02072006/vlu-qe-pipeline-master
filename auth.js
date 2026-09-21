// Danh sách tài khoản hợp lệ (giả lập "database" người dùng)
const USERS = {
  admin: { password: '123', locked: false },
  locked_user: { password: 'abc123', locked: true },
};

/**
 * Kiểm tra thông tin đăng nhập.
 * @param {string} username - Tên đăng nhập.
 * @param {string} password - Mật khẩu.
 * @returns {boolean} true nếu đăng nhập hợp lệ, ngược lại false.
 */
function login(username, password) {
  // Input không hợp lệ (rỗng, null, undefined, không phải string)
  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    username.trim() === '' ||
    password === ''
  ) {
    return false;
  }

  const user = USERS[username];

  // Tài khoản không tồn tại
  if (!user) {
    return false;
  }

  // Tài khoản bị khóa
  if (user.locked) {
    return false;
  }

  // Sai mật khẩu (so khớp chính xác, phân biệt hoa/thường)
  if (user.password !== password) {
    return false;
  }

  return true;
}

module.exports = { login };
