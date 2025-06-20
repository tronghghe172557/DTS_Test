import { StatusCodes } from "./statusCodes.js";
import { ReasonPhrases } from "./reasonPhrases.js";

class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
    metadata = {},
  }) {
    this.message = !message ? reasonStatusCode : message;
    this.metadata = metadata;
    this.statusCode = statusCode;
  }

  send(res, headers = {}) {
    return res.status(this.statusCode).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class Created extends SuccessResponse {
  constructor({
    options = {},
    message,
    statusCode = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
    metadata,
  }) {
    super({ message, statusCode, reasonStatusCode, metadata });
    this.options = options;
  }
}

class NoContent extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.NO_CONTENT,
    reasonStatusCode = ReasonPhrases.NO_CONTENT,
    metadata = {},
  }) {
    super({ message, statusCode, reasonStatusCode });
  }
}

export { OK, Created, SuccessResponse, NoContent };
