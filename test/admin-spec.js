'use strict';

var Admin = require('../src/admin').JanusAdmin;
var assert = require('chai').assert;
var _ = require('lodash');

var JanusAdminServer = require('../src/mock/janus-admin-server').JanusAdminServer;

describe('Admin', function() {

    var adminServer;
    var adminClient;

    before(function(done){
        adminServer = new JanusAdminServer();
        adminServer.init().then(()=>{
            done();
        }).catch((err)=>{
            done(err);
        });
    });

    beforeEach(function(){
        adminClient = new Admin({
            url: adminServer.getUrl(),
            secret: adminServer.getAdminSecret()
        });
    });

    it('should throw an error caused by missing option url', function(done){
        try {
            adminClient = new Admin({
                secret: adminServer.getAdminSecret()
            });
        } catch(err) {
            done();
        }
    });

    it('should throw an error caused by invalid url', function(done){
        try {
            adminClient = new Admin({
                url: 'foo',
                secret: adminServer.getAdminSecret()
            });
        } catch(err) {
            done();
        }
    });

    it('should list all sessions', function(done){
        adminClient.listSessions().then((res)=>{
            assert.isArray(res.sessions);
            done();
        }).catch((err)=>{
            done(err);
        });
    });

    it('should list all handles', function(done){
        adminClient.listHandles('123456').then((res)=>{
            assert.isArray(res.handles);
            done();
        }).catch((err)=>{
            done(err);
        });
    });

    it('should fetch single handle', function(done){
        adminClient.handleInfo('123456', '123456').then((res)=>{
            assert.isObject(res.info);
            done();
        }).catch((err)=>{
            done(err);
        });
    });

    it('should set the log level', function(done){
        adminClient.setLogLevel(7).then((res)=>{
            assert.equal(res.level, 7);
            done();
        }).catch((err)=>{
            done(err);
        });
    });

    it('should throw an error, caused by wrong log level', function(done){
        adminClient.setLogLevel(8).then(()=>{
            done(new Error());
        }).catch(()=>{
            done();
        });
    });

    it('should set locking debug', function(done){
        adminClient.setLockingDebug(1).then((res)=>{
            assert.equal(res.debug, 1);
            done();
        }).catch((err)=>{
            done(err);
        });
    });

    describe('Token based authentication',function(){

        var exampleToken = 'abcdef';
        var examplePlugins = [
            'janus.plugin.videoroom',
            'janus.plugin.echotest'
        ];

        it('should add a new token', function(done){
            adminClient.addToken(exampleToken).then((res)=>{
                assert.isArray(res.plugins);
                done();
            }).catch((err)=>{
                done(err);
            });
        });

        it('should add a new token, that has access to a set of given plugins', function(done){
            adminClient.addToken(exampleToken, examplePlugins).then((res)=>{
                assert.isArray(res.plugins);
                assert.deepEqual(examplePlugins, res.plugins);
                done();
            }).catch((err)=>{
                done(err);
            });
        });

        it('should allow a token to access a set of given plugins', function(done){
            adminClient.allowToken(exampleToken, examplePlugins).then((res)=>{
                assert.isArray(res.plugins);
                assert.deepEqual(_.intersection(res.plugins, examplePlugins), examplePlugins);
                done();
            }).catch((err)=>{
                done(err);
            });
        });

        it('should disallow a token to access a set of given plugins', function(done){
            adminClient.disallowToken(exampleToken, examplePlugins).then((res)=>{
                assert.isArray(res.plugins);
                assert.deepEqual(_.intersection(res.plugins, examplePlugins), []);
                done();
            }).catch((err)=>{
                done(err);
            });
        });

        it('should list all tokens', function(done){
            adminClient.listTokens().then((res)=>{
                assert.isArray(res.tokens);
                done();
            }).catch((err)=>{
                done(err);
            });
        });

        it('should remove a token', function(done){
            adminClient.removeToken(exampleToken).then((res)=>{
                done();
            }).catch((err)=>{
                done(err);
            });
        });
    });
});
