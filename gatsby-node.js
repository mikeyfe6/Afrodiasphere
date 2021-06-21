// exports.onCreateWebpackConfig = ({ stage, actions, plugins, loaders }) => {
//   if (
//     stage === 'build-html' ||
//     stage === 'develop-html' ||
//     stage === 'develop'
//   ) {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /xterm|xterm-addon-fit/,
//             use: loaders.null(),
//           },
//         ],
//       },
//     });
//   }
// };
