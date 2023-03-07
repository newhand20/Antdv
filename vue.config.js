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
        target: "http://127.0.0.1:3000",
        bypass: function(req, res) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else if(process.env.MOCK !== "none") {
            const name = req.url
              .split('/api/')[1]
              .split('/')
              .join('_')
              .split('?')[0]
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            console.log("req.method",req.method)
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
          return null;
        }
      }
    }
  },
};

