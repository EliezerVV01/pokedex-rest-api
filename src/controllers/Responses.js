class Responses {
  static responseOK({ body }) {
    return { status: 200, body };
  }

  static responseBadRequest({ body }) {
    return { status: 400, body };
  }

  static responseUnauthorized({ body }) {
    return { status: 401, body };
  }

  static responseNotFound({ body }) {
    return { status: 404, body };
  }

  static responseConclict({ body }) {
    return { status: 409, body };
  }

  static responseInternalServerError({ body }) {
    return { status: 500, body };
  }

  static getErrorMessage(message) {
    return {
      errorMessage: message,
    }
  }

  static createErrorResponse(err) {
    switch (err.code) {
      case 400: return this.responseBadRequest({ body: this.getErrorMessage(err.message) });
      case 401: return this.responseUnauthorized({ body: this.getErrorMessage(err.message) });
      case 409: return this.responseConclict({ body: this.getErrorMessage(err.message) });
      case 500: return this.responseInternalServerError({ body: this.getErrorMessage(err.message) });
      default: return this.responseInternalServerError({ body: this.getErrorMessage(err.message) });
    }
  }
}

module.exports = Responses;
