'use strict';

module.exports = (err, req, res, next) => {
    if (err.status === 403) {
      res.status(403).send(err.message);
    } else {
      next(err);
    }
  };