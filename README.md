# gome_cms

> gome cms

## 后台录入页面   Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 外网页面 && 服务接口

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:12345
node app.js

```

### 1. 主页 数据读取： method: GET

```javascript
http://host/admin/getMainPage
```

|参数名 |字段|类型|是否必填|
|-|-|-|-|
|无||||

#### 成功返回样例

```javascript
{
    "code": 0,
    "msg": "OK",
    "data": {
        "cover": {
            "opacityLogo": "/img/T1SRKTBQAv1RCvBVdK.png",
            "logo": "/img/T1SRKTBQAv1RCvBVdK.png",
			"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png",
			"smallPic": "/img/T1SRKTBQAv1RCvBVdK.png",
			"blurBackgroundPic":"",
			"blurSmallPic":""
        },
        "introduction": [
            {
                "pic": "/img/T1SRKTBQAv1RCvBVdK.png",
                "title": "支持万人企业通讯录",
                "summary": "企业通讯录支持一人多职务、多团队、多级组织架构，隐藏指定高管手机号。"
            }
            ...
        ],
		"feature": {
			"title": "",
			"subTitle": "",
			"list": [
				{
					"pic" : "/img/T1SRKTBQAv1RCvBVdK.png",
					"title": "支持万人企业通讯录",
	                "summary": "企业通讯录支持一人多职务、多团队、多级组织架构，隐藏指定高管手机号。"
				}
				...
			]
		},
		"download": {
			"title": "",
			"subTitle": "",
			"list": [
				{
					"pic1": "",
					"pic2": "",
					"url" : ""
				}
				...
			]
		}
    }
}
```

### 2. 下载页 数据读取： method: GET

```javascript
http://host/admin/getDownloadPage?platform=Windows
```

|参数名 |字段|类型|是否必填|备注|
|-|-|-|-|-|
|平台类型|platform|String|false| Window,Mac,Android,iOS, 没有参数返回所有 |

#### 成功返回样例

```javascript
{
    "code": 0,
    "msg": "OK",
    "data": {
    	"windows":{
			"title": "Aeromind Android版",
            "summary": "便捷、高效、迅速",
            "size": "30.2 M",
            "version": "V2.0.0",
            "system": "Android4.0及以上",
			"time": "2017-10-10",
			"url": 'http://.....',
			"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
    	},
    	"mac":{
    		"title": "Aeromind Android版",
            "summary": "便捷、高效、迅速",
            "size": "30.2 M",
            "version": "V2.0.0",
            "system": "Android4.0及以上",
			"time": "2017-10-10",
			"url": 'http://.....',
			"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
		},
		"android":{
			"title": "Aeromind Android版",
            "summary": "便捷、高效、迅速",
            "size": "30.2 M",
            "version": "V2.0.0",
            "system": "Android4.0及以上",
			"time": "2017-10-10",
			"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
		},
		"ios":{
			"title": "Aeromind Android版",
            "summary": "便捷、高效、迅速",
            "size": "30.2 M",
            "version": "V2.0.0",
            "system": "Android4.0及以上",
			"time": "2017-10-10",
			"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
		}
    }
}
```

### 3. 版本列表： method: GET

```javascript
http://host/admin/getVersionList?platform=Windows
```

|参数名 |字段|类型|是否必填|备注|
|-|-|-|-|-|
|平台类型|platform|String|false| Window,Mac,Android,iOS, 无参数将返回所有 |

#### 成功返回样例
```javascript
{
    "code": 0,
    "msg": "OK",
    "data": {
    	"windows": [
			{
    			"title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
				"time": "2017-10-10",
				"version": "V1.1.1"
			},
			....
	    ],
	    "mac": [
	    	{
    			"title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
				"time": "2017-10-10",
				"version": "V1.1.1"
			},
			...
	    ],
	    "android": [
			{
    			"title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
				"time": "2017-10-10",
				"version": "V1.1.1"
			},
			...
    	],
    	"ios":[
			{
    			"title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
				"time": "2017-10-10",
				"version": "V1.1.1"
			},
			...
    	]
    }
}
```

### 4. 版本详情： method: GET

```javascript
http://host/admin/getVersionDetail
```

|参数名 |字段|类型|是否必填|备注|
|-|-|-|-|-|
|平台类型|platform|String|true| |
|版本号|version|String|true| |

#### 成功返回样例
```javascript
{
    "code": 0,
    "msg": "OK",
    "data": {
    	"version":'V2.0.0',
    	"title": 'Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！',
    	"time": "2017-10-10",
    	"detail": [
			{
    			"title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
				"imgs": [
					"/img/a.png",
					"/img/b.png"
				]
	        }
    	]
    }
}
```

### 5.  创建版本： method: post

```javascript
http://host/admin/super/createVersion
```

|参数名 |字段|类型|是否必填|备注|
|-|-|-|-|-|
|自定义版本|title|String|true|不能重复|

#### 成功返回样例
```javascript
{
    "code": 0,
    "msg": "OK"
}
```

### 6. 获取所有创建的版本:  method: get

```javascript
http://host/admin/super/getCreateVersion
```

|参数名 |字段|类型|是否必填|备注|
|-|-|-|-|-|
||||||

#### 成功返回样例
```javascript
{
    "code": 0,
    "msg": "OK",
    "versions":[
		{
			title: 'V1.0.0',
			active: 0
		}
		...
    ]
}
```

### 7. 删除版本:  method: post

```javascript
http://host/admin/super/deleteVersion
```

|参数名 |字段|类型|是否必填|备注|
|-|-|-|-|-|
|自定义版本|V|String|true||

#### 成功返回样例
```javascript
{
    "code": 0,
    "msg": "OK"
}
```

### 8. 发布版本:  method: post

```javascript
http://host/admin/super/v-releaseVersion  //超级管理员才有权限
```

|参数名 |字段|类型|是否必填|备注|
|-|-|-|-|-|
|自定义版本|V|String|true||

#### 成功返回样例
```javascript
{
    "code": 0,
    "msg": "OK"
}
```

### 9. 提交版本:  method: post

```javascript
http://host/admin/super/releaseVersion 
```

|参数名 |字段|类型|是否必填|备注|
|-|-|-|-|-|
|自定义版本|V|String|true||

#### 成功返回样例

```javascript
{
    "code": 0,
    "msg": "OK"
}
```


### 10. 登录:  method: post

```javascript
http://host/admin/super/login 
```

|参数名 |字段|类型|是否必填|备注|
|-|-|-|-|-|
|用户名|username|String|true||
|密码|password|String|true||


#### 成功返回样例
```javascript
{
    "code": 0,
    "msg": "OK",
    "token":"asdsafasdfsdfsfadf"
}
```


### 11. 主页信息入库:  method: post

```javascript
http://host/admin/super/setMain 
```

|参数名 |字段|类型|是否必填|备注|
|-|-|-|-|-|
|自定义版本|V|String|true||
|横幅|banner|Object|false||
|透明logo| &nbsp; &nbsp;opacityLogo|String|true||
|logo| &nbsp; &nbsp;logo|String|true||
|大背景图| &nbsp; &nbsp;backgroundPic|String|true||
|模糊大背景图| &nbsp; &nbsp;blurBackgroundPic|String|true||
|文字图片| &nbsp; &nbsp;smallPic|String|true||
|模糊文字图片| &nbsp; &nbsp;blurSmallPic|String|true||
|介绍|introduction|Array|false||
|图片| &nbsp; &nbsp;pic|String|true||
|title| &nbsp; &nbsp;title|String|true||
|简介| &nbsp; &nbsp;summary|String|true||
|功能介绍|feature|Object|false||
|title| &nbsp; &nbsp;title|String|true||
|子标题| &nbsp; &nbsp;subTitle|String|true||
|功能列表| &nbsp; &nbsp;list|Array|true||
|图片| &nbsp; &nbsp; &nbsp; &nbsp;pic|String|true||
|title| &nbsp; &nbsp; &nbsp; &nbsp;title|String|true||
|简介| &nbsp; &nbsp; &nbsp; &nbsp;summary|String|true||
|下载入口|download|Object|false||
|title| &nbsp; &nbsp;title|String|true||
|子标题| &nbsp; &nbsp;subTitle|String|true||
|入口列表| &nbsp; &nbsp;list|Array|true||
|图片1| &nbsp; &nbsp; &nbsp; &nbsp;pic1|String|true||
|图片2| &nbsp; &nbsp; &nbsp; &nbsp;pic2|String|true||


#### 成功返回样例
```javascript
{
    "code": 0,
    "msg": "OK"
}
```

### 12. 下载页信息入库:  method: post

```javascript
http://host/admin/super/setDownload
```

|参数名 |字段|类型|是否必填|备注|
|-|-|-|-|-|
|自定义版本|V|String|true||
|windows|windows|Object|true||
|title| &nbsp; &nbsp;title|String|true||
|简介| &nbsp; &nbsp;summary|String|true||
|大小| &nbsp; &nbsp;size|String|true||
|版本| &nbsp; &nbsp;version|String|true||
|适应系统| &nbsp; &nbsp;system|String|true||
|发布时间| &nbsp; &nbsp;time|Number|true|时间戳|
|下载地址| &nbsp; &nbsp;url|String|true||
|背景图片| &nbsp; &nbsp;backgroundPic|String|true||
|mac|mac|Object|true||
|title| &nbsp; &nbsp;title|String|true||
|简介| &nbsp; &nbsp;summary|String|true||
|大小| &nbsp; &nbsp;size|String|true||
|版本| &nbsp; &nbsp;version|String|true||
|适应系统| &nbsp; &nbsp;system|String|true||
|发布时间| &nbsp; &nbsp;time|Number|true|时间戳|
|下载地址| &nbsp; &nbsp;url|String|true||
|背景图片| &nbsp; &nbsp;backgroundPic|String|true||
|android|android|Object|true||
|title| &nbsp; &nbsp;title|String|true||
|简介| &nbsp; &nbsp;summary|String|true||
|大小| &nbsp; &nbsp;size|String|true||
|版本| &nbsp; &nbsp;version|String|true||
|适应系统| &nbsp; &nbsp;system|String|true||
|发布时间| &nbsp; &nbsp;time|Number|true|时间戳|
|背景图片| &nbsp; &nbsp;backgroundPic|String|true||
|更新日志标题|android|String|true||

#### 成功返回样例
```javascript
{
    "code": 0,
    "msg": "OK"
}
```

### 13. 版本详情入库:  method: post

```javascript
http://host/admin/super/setDetail
```

|参数名 |字段|类型|是否必填|备注|
|-|-|-|-|-|
|自定义版本|V|String|true||
|平台|platform|String|true||
|详情|details|Array|true||
|title| &nbsp; &nbsp;title|String|true||
|图片| &nbsp; &nbsp;imgs|Array|true||
|地址| &nbsp; &nbsp; &nbsp; &nbsp;url|String|true||

#### 成功返回样例
```javascript
{
    "code": 0,
    "msg": "OK"
}
```

### 14. 图片上传:  method: post

```javascript
http://host/admin/super/uploadImg
```


### 15. 获取要上线的版本:  method: get

```javascript
http://host/admin/super/getCreateVersion
```

|参数名 |字段|类型|是否必填|备注|
|-|-|-|-|-|
||||||