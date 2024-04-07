class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
      this.message = message;
    }
  }
  class PermissionError extends Error {
    constructor(message) {
      super(message);
      this.name = 'PermissionError';
      this.message = message;
    }
  }
  class AuthorizationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'AuthorizationError';
      this.message = message;
    }
  }
  
  class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotFoundError';
      this.message = message;
    }
  }
  
  class DatabaseError extends Error {
    constructor(message) {
      super(message);
      this.name = 'DatabaseError';
      this.message = message;
    }
  }
  
  class OperationalError extends Error {
    constructor(message) {
      super(message);
      this.name = 'OperationalError';
      this.message = message;
    }
  }
  
  
  module.exports = {
    ValidationError,
    PermissionError,
    AuthorizationError,
    DatabaseError,
    NotFoundError,
    OperationalError
  }