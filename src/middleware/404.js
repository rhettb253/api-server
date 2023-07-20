'use strict';

module.exports = (req, res) => {
    res.status(404).send('ERROR: Route not found');
};