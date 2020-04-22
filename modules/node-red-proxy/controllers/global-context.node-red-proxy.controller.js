'use strict';
const AppConstants = require('../../../config/app-constants');

module.exports = (request, reply) => {

    const uri = request.params.paths ? `${AppConstants.NODE_RED_URL}/global/${request.params.paths}` : `${AppConstants.NODE_RED_URL}/global`;
    console.log(uri);
    return reply.proxy({ uri });
};
