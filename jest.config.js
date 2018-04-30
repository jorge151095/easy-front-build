'use strict';

module.exports = {
    verbose: true,
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'lib/index.js'
    ],
    coverageReporters: ['text-summary', 'html']
};

