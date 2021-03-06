import path from 'path';

const config = {
  framework: 'react',
  projectName: 'myApp',
  date: '2021-12-20',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/services': path.resolve(__dirname, '..', 'src/services'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
  },
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  mini: {
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    commonChunks: [
      'runtime',
      'vendors',
      'taro',
      'common',
      'custom-components',
      'taroify',
      'custom-common',
      'react-vendor',
    ],
    webpackChain(chain, webpack) {
      chain.merge({
        optimization: {
          minimize: true,
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              'custom-components': {
                test: /[\\/]src[\\/](components).*[\\/]/,
                name: 'custom-components',
                enforce: true,
                priority: 5,
              },
              taroify: {
                test: /[\\/]node_modules[\\/](@taroify|taroify).*[\\/]/,
                name: 'taroify',
                enforce: true,
                priority: 5,
              },
              'custom-common': {
                test: /[\\/]node_modules[\\/](dayjs|lodash).*[\\/]/,
                name: 'custom-common',
                enforce: true,
                priority: 5,
              },
              'react-vendor': {
                test: /[\\/]node_modules[\\/](react).*[\\/]/,
                name: 'react-vendor',
                enforce: true,
                priority: 5,
              },
            },
          },
        },
      });
    },
  },
  h5: {
    // 启动兼容插件
    router: {
      mode: 'browser',
    },
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['@taroify'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  let configPath = 'prod';
  if (process.env.BUILD_ENV) {
    configPath = `${configPath}-${process.env.BUILD_ENV}`;
  }

  return merge({}, config, require(`./${configPath}`));
};
