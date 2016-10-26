JanusAdmin
===========

JanusAdmin is a node.js http client, that implements the entire admin interface of the Janus WebRTC Gateway.

Usage
-------------

    var JanusAdmin = require('janus-admin').JanusAdmin;
    
    var admin = new JanusAdmin({
        url: 'http://janus-admin:7088',
        secret: '*****'
    });
    
Methods
---------------

### List sessions

    admin.listSessions().then((res)=>{
        console.log(res.sessions)
    }).catch((err)=>{
        ...
    });

### List handles

    admin.listHandles(sessionId).then((res)=>{
        console.log(res.handles)
    }).catch((err)=>{
        ...
    });

### Show single handle

    admin.handleInfo(sessionId, handleId).then((res)=>{
        console.log(res.info)
    }).catch((err)=>{
        ...
    });

### Set the log level

    admin.setLogLevel([0...7]).then((res)=>{
        console.log(res.level)
    }).catch((err)=>{
        ...
    });

### Set locking debug

    admin.setLockingDebug([0,1]).then((res)=>{
        console.log(res.debug)
    }).catch((err)=>{
        ...
    });
    
Methods (token based authentication)
------------------------------------

### Add token

    admin.addToken(token).then((res)=>{
        console.log(res.plugins);
    }).catch((err)=>{
        ...
    });

### Allow token

    admin.allowToken(token, plugins).then((res)=>{
        console.log(res.plugins);
    }).catch((err)=>{
        ...
    });

### Disallow token

    admin.disallowToken(token, plugins).then((res)=>{
        console.log(res.plugins);
    }).catch((err)=>{
        ...
    });

### List all tokens

    admin.listTokens().then((res)=>{
        console.log(res.tokens);
    }).catch((err)=>{
        ...
    });

### Remove token

    adminClient.removeToken(token).then((res)=>{
        ...
    }).catch((err)=>{
        ...
    });
