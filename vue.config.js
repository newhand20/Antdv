module.exports = {
  lintOnSave:false,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#1DA57A',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },

  devServer: {
    proxy: {
      '/api': {
        changeOrigin: true,
        target: "http://127.0.0.1:8080",
        bypass: function(req, res) {
          console.log(req.path);
          console.log(process.env.MOCK);
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else if(process.env.MOCK !== null) {
            const name = req.url
              .split('/api/')[1]
              .split('/')
              .join('_')
              .split('?')[0]
            console.log(name);
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
          return null;
        }
      }
    }
  },
};

