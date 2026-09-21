const { login } = require('./auth');

describe('Regression Test - Đăng nhập', () => {
  describe('Sai mật khẩu', () => {
    test('trả về false khi mật khẩu sai', () => {
      expect(login('admin', 'wrongpass')).toBe(false);
    });

    test('phân biệt hoa/thường đối với mật khẩu', () => {
      expect(login('admin', '123 ')).toBe(false); // có khoảng trắng thừa
    });
  });

  describe('Sai username', () => {
    test('trả về false khi username không tồn tại', () => {
      expect(login('unknown_user', '123')).toBe(false);
    });

    test('phân biệt hoa/thường đối với username', () => {
      expect(login('Admin', '123')).toBe(false);
    });
  });

  describe('Username hoặc mật khẩu rỗng', () => {
    test('trả về false khi username rỗng', () => {
      expect(login('', '123')).toBe(false);
    });

    test('trả về false khi mật khẩu rỗng', () => {
      expect(login('admin', '')).toBe(false);
    });

    test('trả về false khi cả hai đều rỗng', () => {
      expect(login('', '')).toBe(false);
    });

    test('trả về false khi username chỉ chứa khoảng trắng', () => {
      expect(login('   ', '123')).toBe(false);
    });
  });

  describe('Input không hợp lệ (null/undefined/kiểu dữ liệu sai)', () => {
    test('trả về false khi username là null', () => {
      expect(login(null, '123')).toBe(false);
    });

    test('trả về false khi password là undefined', () => {
      expect(login('admin', undefined)).toBe(false);
    });

    test('trả về false khi username là số', () => {
      expect(login(12345, '123')).toBe(false);
    });
  });

  describe('Mật khẩu chứa ký tự đặc biệt', () => {
    test('trả về false khi mật khẩu chứa ký tự đặc biệt không khớp', () => {
      expect(login('admin', '123!@#')).toBe(false);
    });

    test('trả về false khi mật khẩu chứa ký tự SQL injection', () => {
      expect(login('admin', "' OR '1'='1")).toBe(false);
    });

    test('trả về false khi mật khẩu chứa thẻ script (XSS)', () => {
      expect(login('admin', '<script>alert(1)</script>')).toBe(false);
    });
  });

  describe('Tài khoản bị khóa', () => {
    test('trả về false khi tài khoản bị khóa dù đúng mật khẩu', () => {
      expect(login('locked_user', 'abc123')).toBe(false);
    });
  });
});
