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
        target: &#34;http://localhost:3000&#34;,
        bypass: function(req, res) {
          console.log(req.path);
          console.log(process.env.MOCK);
          if (req.headers.accept.indexOf(&#34;html&#34;) !== -1) {
            console.log(&#34;Skipping proxy for browser request.&#34;);
            return &#34;/index.html&#34;;
          } else if(process.env.MOCK !== &#34;none&#34;) {
            const name = req.path
              .split(&#34;/api/&#34;)[1]
              .split(&#34;/&#34;)
              .join(&#34;_&#34;);
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

