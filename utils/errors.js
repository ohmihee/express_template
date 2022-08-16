import { createRequire } from "module";
const require = createRequire(import.meta.url);

const _ = require("lodash");
// ()=>{} 화살표 함수에서는 this를 사용할 수 없다.

export const errors = {
  BadRequest: {
    error: "Bad Request",
    status: 400,
  },

  Unauthorized: {
    error: "Unauthorized",
    status: 401,
  },

  Forbidden: {
    error: "Forbidden",
    status: 403,
  },

  NotFound: {
    error: "Not Found",
    status: 404,
  },

  UnprocessableEntity: {
    error: "Unprocessable Entity",
    status: 422,
  },

  InternalServerErrpr: {
    error: "Internal Server Error",
    status: 500,
  },

  Success: {
    error: "",
    status: 200,
  },

  onlyAdmin: function () {
    return _.assignIn({}, this.Forbidden, {
      message: "Only admins are allowed to do this",
    });
  },

  noPermission: function () {
    return _.assignIn(
      {},
      {
        error: "Forbidden",
        status: 403,
        message: "You do not have permission to consume this resource",
      }
    );
  },
  invalidId: function () {
    return _.assignIn({}, this.BadRequest, {
      message: "Invalid Id parameter",
    });
  },
  invalidSearchTerm: function () {
    return _.assignIn({}, this.BadRequest, {
      message: "Invalid search term",
    });
  },
  missingAttr: function (attrs) {
    return _.assignIn({}, this.BadRequest, {
      message: `Attribute(s) (${attrs.join(",")}) seem(s) to be missing`,
    });
  },
  unwantedAttr: function (attrs) {
    return _.assignIn({}, this.BadRequest, {
      message: `Attribute(s) (${attrs.join(",")}) seem(s) to be missing`,
    });
  },
  uniqueAttr: function (attrs) {
    return _.assignIn({}, this.BadRequest, {
      message: `Attribute(s) (${attrs.join(",")}) seem(s) to be missing`,
    });
  },
  custom: function (msg) {
    return _.assignIn({}, this.BadRequest, {
      message: `Attribute(s) (${msg.join(",")}) seem(s) to be missing`,
    });
  },
  addFailure() {
    return _.assignIn({}, this.BadRequest, {
      message: "Item WAS NOT added",
    });
  },
  deleteFailure() {
    return _.assignIn({}, this.BadRequest, {
      message: "Item WAS NOT deleted",
    });
  },

  updateFailure() {
    return _.assignIn({}, this.BadRequest, {
      message: "Item WAS NOT updated",
    });
  },

  addSuccess() {
    return _.assignIn({}, this.Success, {
      message: "Item added successfully",
    });
  },
  deleteSuccess() {
    return _.assignIn({}, this.Success, {
      message: "Item deleted successfully",
    });
  },

  updateSuccess() {
    return _.assignIn({}, this.Success, {
      message: "Item updated successfully",
    });
  },
  empty: [],
};

// (() => {
//   console.log("즉시 실행");
// })();

console.log(errors.updateSuccess());
export default errors;
