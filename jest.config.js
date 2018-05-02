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
<<<<<<< HEAD
        'lib/**/*.js'
    ],
    coverageReporters: ['text-summary', 'html']
};
=======
        'lib/index.js'
    ],
    coverageReporters: ['text-summary', 'html']
};

>>>>>>> 13d5a14b9f9cf6c0aacf19b64c9b64a2a3a4dbbc
