# 启动

```
npm init -y # 生成package.json
```


* webpack
* html-webpack-plugin
* webpack-merge
* webpack-validator
* webpack-dev-server
* css-loader
* style-loader
* clean-webpack-plugin
* extract-text-webpack-plugin
	
	

# 文件结构

```
- app/
	- index.js
	- component.js
- build/
- package.json
- webpack.config.js
``` 


# 优化

压缩构建
webpack.optimize.UglifyJsPlugin

设置环境变量
webpack.DefinePlugin

捆绑拆分
	* vendor入口块
	* CommonsChunkPlugin

复杂依赖，去重
webpack.optimize.DedupePlugin


# 文件名

webpack的输出依赖于**占位符**

- [path] - 返回入口路径
- [name] - 返回入口名
- [hash] - 返回构建hash
- [chunkhash] - 返回块的特定hash

失效缓存


# CSS拆分

FOUC问题

移除没用到的css

'''
purifycss-webpack-plugin
'''

# 加载资源


```
{
	test: /\.css$/,
	loaders: ['style', 'css'],
	inclue: PATHS.style
}

{
	test: /\.jsx?$/,
	loader: 'babel',
	query: {
		cacheDirectory: true,
		presets: ['react', 'es2015']
	},
	include: PATHS.app
}

{
	test: /\.(jpg|png)$/,
	loader: 'url?limit=25000',
	inclue: PATHS.images
}

{
	test: /\.(jpg|png)$/,
	loader: 'file?name=[path][name].[hash].[ext]',
	inclue: PATHS.images
}

{
	test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	loader: 'url',
	query: {
		limit: 50000,
		mimetype: 'application/font-woff',
		name: './fonts/[hash].[ext]'
	}
}
```

#块的理解

* 入口块
* 常规块
* 初始块

#React

* babel-loader
* babel-core
* babel-preset-es2015
* babel-preset-react
* babel-preset-react-hmre
* react-lite
