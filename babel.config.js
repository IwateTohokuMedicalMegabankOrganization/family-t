module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                'modules': 'false',
                'useBuiltIns': 'usage',
                'targets': '> 0.25%, not dead',
            }
        ]
    ],
    env: {
        test: {
            presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
            plugins: ['babel-plugin-rewire'] 
        },
    },
};
// module.exports = {
//     presets: ['@babel/preset-env'],
//     env: {
//         test: {
//           plugins: [
//             "transform-es2015-modules-commonjs",
//           ],
//         },
//     },
// };