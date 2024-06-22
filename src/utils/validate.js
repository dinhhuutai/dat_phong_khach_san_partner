export class Validate {
  static email = value => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  static password = value => {
    return value.length >= 6;
  };

  static phone = value => {
    var pattern = /^\+?[0-9\s-]{8,}$/;
    return pattern.test(value);
  };
}
