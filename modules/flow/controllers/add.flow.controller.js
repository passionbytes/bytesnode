'use strict';
const Flow = require('../../../models/flow.model');
const FlowTemplate = require('../../../models/flow-template.model');
const Boom = require('boom');

module.exports = (request, reply) => {

    // TODO: Move this to flow model
    FlowTemplate.findByName(request.payload.template, (err, flowTemplate, metrics) => {

        request.addMetrics(metrics);
        if (err) {
            const message = Boom.badRequest(err.message);
            return reply(message);
        }
        if (!flowTemplate) {
            console.log(new Error('Flow Template not found'));
            const err = Boom.badRequest('Flow Template not found');
            return reply(err);
        }
        const callback = (err, result, resultMetrics) => {

            request.addMetrics(resultMetrics);
            if (err) {
                const message = Boom.badRequest(err);
                return reply(message);
            }
            return reply(result);
        };
        return Flow.save(request.payload, flowTemplate, callback);
    });
};
