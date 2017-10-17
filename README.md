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
|版本号|version|String|true|

#### 成功返回样例

```javascript

{
    "code": 0,
    "msg": "OK",
    "data": {
    	"version":'V2.0.0',
        "cover": {
            "opacityLogo": "/img/T1SRKTBQAv1RCvBVdK.png",
            "logo": "/img/T1SRKTBQAv1RCvBVdK.png",
			"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png",
			"sPic": "/img/T1SRKTBQAv1RCvBVdK.png"
        },
        "introduction": [
            {
                "pic": "/img/T1SRKTBQAv1RCvBVdK.png",
                "title": "支持万人企业通讯录",
                "summary": "企业通讯录支持一人多职务、多团队、多级组织架构，隐藏指定高管手机号。"
                "detail": {}
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
		"platform": {
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
|-|-|-|-|
|平台类型|platform|String|false| Window,Mac,Android,iOS, 没有参数返回所有 |

#### 成功返回样例

```javascript

{
    "code": 0,
    "msg": "OK",
    "data": {
    	"version":'V2.0.0',
    	"platform": [
			 {
			 	platform: "Windows",
	        	"title": "Aeromind Android版",
	            "summary": "便捷、高效、迅速",
	            "size": "30.2 M",
	            "version": "V2.0.0",
	            "system": "Android4.0及以上",
				"time": "2017-10-10",
				"url": 'http://.....',
				"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
	        },{
			 	platform: "Mac",
	        	"title": "Aeromind Android版",
	            "summary": "便捷、高效、迅速",
	            "size": "30.2 M",
	            "version": "V2.0.0",
	            "system": "Android4.0及以上",
				"time": "2017-10-10",
				"url": 'http://.....',
				"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
	        },{
			 	platform: "Android",
	        	"title": "Aeromind Android版",
	            "summary": "便捷、高效、迅速",
	            "size": "30.2 M",
	            "version": "V2.0.0",
	            "system": "Android4.0及以上",
				"time": "2017-10-10",
				"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
	        },{
			 	platform: "iOS",
	        	"title": "Aeromind Android版",
	            "summary": "便捷、高效、迅速",
	            "size": "30.2 M",
	            "version": "V2.0.0",
	            "system": "Android4.0及以上",
				"time": "2017-10-10",
				"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
	        }
    	]
    }
}

```

### 3. 版本列表： method: GET

```javascript
http://host/admin/getVersionList?platform=Windows
```

|参数名 |字段|类型|是否必填|备注|
|-|-|-|-|
|平台类型|platform|String|false| Window,Mac,Android,iOS, 无参数将返回所有 |

#### 成功返回样例

```javascript

{
    "code": 0,
    "msg": "OK",
    "data": {
    	"version":'V2.0.0',
    	"platform": [
			{
			 	"platform": "Windows",
			 	"lists": [
					{
	        			"title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
						"time": "2017-10-10",
						"version": "V1.1.1"
					}
					...
			 	]
	        },{
	        	"platform": "Mac",
			 	"lists": [
					{
	        			"title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
						"time": "2017-10-10",
						"version": "V1.1.1"
					}
					...
			 	]
	        }
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
|-|-|-|-|
|平台类型|platform|String|true| |
|版本号|version|String|true| |

```javascripts

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
http://host/admin/createVersion
```

|参数名 |字段|类型|是否必填|备注|
|-|-|-|-|
|版本号|version|String|true|不能重复|


```javascripts

{
    "code": 0,
    "msg": "OK"
}

```

### 6. 获取所有创建的版本:  method: get

```javascript
http://host/admin/getCreateVersion
```