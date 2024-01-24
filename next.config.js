// // next.config.js
// module.exports = {
//     webpack: (config) => {
//       config.module.rules.push({
//         test: /\.(mp4|webm)$/,
//         use: {
//           loader: 'file-loader',
//           options: {
//             publicPath: '/_next',
//             name: 'static/media/[name].[hash].[ext]',
//           },
//         },
//       });
  
//       return config;
//     },
//   };
  
const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  // next.js config
})