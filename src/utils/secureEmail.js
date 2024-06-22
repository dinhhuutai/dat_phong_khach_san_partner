function secureEmail(email) {
  // Kiểm tra xem email có hợp lệ không
  if (typeof email !== 'string' || !email.includes('@')) {
    return 'Email không hợp lệ';
  }

  // Phân tách phần trước và sau dấu @
  const [username, domain] = email.split('@');

  // Ẩn một phần của phần trước email
  const secureUsername = '*****' + username.slice(-3);

  // Ghép lại và trả về email đã được bảo mật
  return `${secureUsername}@${domain}`;
}

export default secureEmail;
