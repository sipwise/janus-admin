JanusAdmin
===========

JanusAdmin is a node.js http client, that implements the entire admin interface of the Janus WebRTC Gateway.

Usage
-------------
```javascript
var JanusAdmin = require('janus-admin').JanusAdmin;

var admin = new JanusAdmin({
    url: 'http://janus-admin:7088',
    secret: '*****'
});
```

Methods
---------------

### List sessions

```javascript
admin.listSessions().then((res)=>{
    console.log(res.sessions)
}).catch((err)=>{
    ...
});
```

### List handles

```javascript
admin.listHandles(sessionId).then((res)=>{
    console.log(res.handles)
}).catch((err)=>{
    ...
});
```

### Show single handle

```javascript
admin.handleInfo(sessionId, handleId).then((res)=>{
    console.log(res.info)
}).catch((err)=>{
    ...
});
```

### Set the log level

```javascript
admin.setLogLevel([0...7]).then((res)=>{
    console.log(res.level)
}).catch((err)=>{
    ...
});
```

### Set locking debug

```javascript
admin.setLockingDebug([0,1]).then((res)=>{
    console.log(res.debug)
}).catch((err)=>{
    ...
});
```
    
Methods (token based authentication)
------------------------------------

### Add token

```javascript
admin.addToken(token).then((res)=>{
    console.log(res.plugins);
}).catch((err)=>{
    ...
});
```

### Allow token

```javascript
admin.allowToken(token, plugins).then((res)=>{
    console.log(res.plugins);
}).catch((err)=>{
    ...
});
```

### Disallow token

```javascript
admin.disallowToken(token, plugins).then((res)=>{
    console.log(res.plugins);
}).catch((err)=>{
    ...
});
```

### List all tokens

```javascript
admin.listTokens().then((res)=>{
    console.log(res.tokens);
}).catch((err)=>{
    ...
});
```

### Remove token

```javascript
adminClient.removeToken(token).then((res)=>{
    ...
}).catch((err)=>{
    ...
});
```

### Remove all tokens

```javascript
adminClient.removeAllTokens().then((res)=>{
    ...
}).catch((err)=>{
    ...
});
```
