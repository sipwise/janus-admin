'use strict';

process.env.DEBUG = '';

var _ = require('lodash');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('debug-logger')('mock:janus-admin-server');

/**
 * @class
 */
class JanusAdminServer {

    constructor(options) {
        options = options || {};
        this.port = options.port || 9000;
        this.app = express();
        this.http = null;
    }

    init() {
        return new Promise((resolve, reject)=>{
            var requestHandler = (req, res, next)=>{ this.dispatchRequest(req, res, next); }
            this.app.use(bodyParser.json());
            this.app.use((req, res, next)=>{
                logger.info('Request', req.originalUrl, req.body);
                next();
            });
            this.app.post('/admin', requestHandler);
            this.app.post('/admin/:sessionId', requestHandler);
            this.app.post('/admin/:sessionId/:handleId', requestHandler);
            this.http = http.createServer(this.app);
            this.http.listen(this.port, (err)=>{
                if(_.isObject(err)) {
                    reject(err);
                } else {
                    logger.info('Started');
                    resolve();
                }
            });
        });
    }

    getUrl() {
        return 'http://localhost:' + this.port;
    }

    getAdminSecret() {
        return 'master';
    }

    dispatchRequest(req, res, next) {
        switch(req.body.janus) {
            case 'list_sessions':
                this.listSessions(req, res, next);
                break;
            case 'list_handles':
                this.listHandles(req, res, next);
                break;
            case 'handle_info':
                this.handleInfo(req, res, next);
                break;
            case 'set_log_level':
                this.setLogLevel(req, res, next);
                break;
            case 'set_locking_debug':
                this.setLockingDebug(req, res, next);
                break;
            case 'add_token':
                this.addToken(req, res, next);
                break;
            case 'allow_token':
                this.allowToken(req, res, next);
                break;
            case 'disallow_token':
                this.disallowToken(req, res, next);
                break;
            case 'list_tokens':
                this.listTokens(req, res, next);
                break;
            case 'remove_token':
                this.removeToken(req, res, next);
                break;
        }
    }

    listSessions(req, res, next) {
        res.json({
            janus: 'success',
            transaction: req.body.transaction,
            session: []
        });
    }

    listHandles(req, res, next) {
        res.json({
            janus: 'success',
            transaction: req.body.transaction,
            session_id: req.params.sessionId,
            handles: []
        });
    }

    handleInfo(req, res, next) {
        res.json({
            janus: 'success',
            transaction: req.body.transaction,
            session_id: req.params.sessionId,
            handle_id: req.params.handleId,
            info: {

            }
        });
    }

    setLogLevel(req, res, next) {
        res.json({
            janus: 'success',
            transaction: req.body.transaction,
            level: req.body.level
        });
    }

    setLockingDebug(req, res, next) {
        res.json({
            janus: 'success',
            transaction: req.body.transaction,
            debug: req.body.debug
        });
    }

    addToken(req, res, next) {

        var plugins = [
            "janus.plugin.audiobridge",
            "janus.plugin.voicemail",
            "janus.plugin.echotest",
            "janus.plugin.recordplay",
            "janus.plugin.videoroom",
            "janus.plugin.videocall",
            "janus.plugin.streaming",
            "janus.plugin.sip"
        ];
        if(_.isArray(req.body.plugins)) {
            plugins = req.body.plugins;
        }

        res.json({
            "janus": "success",
            "transaction": req.body.transaction,
            "data": {
                "plugins": plugins
            }
        });
    }

    allowToken(req, res, next) {

        var plugins = [
            "janus.plugin.audiobridge",
            "janus.plugin.voicemail"
        ];

        plugins = req.body.plugins.concat(plugins);

        res.json({
            "janus": "success",
            "transaction": req.body.transaction,
            "data": {
                "plugins": plugins
            }
        });
    }

    disallowToken(req, res, next) {

        var plugins = [
            "janus.plugin.audiobridge",
            "janus.plugin.voicemail"
        ];

        res.json({
            "janus": "success",
            "transaction": req.body.transaction,
            "data": {
                "plugins": plugins
            }
        });
    }

    listTokens(req, res, next) {
        res.json({
            "janus": "success",
            "transaction": req.body.transaction,
            "data": {
                "tokens": [
                    {
                        "token": "abcdef",
                        "allowed_plugins": [
                            "janus.plugin.audiobridge",
                            "janus.plugin.voicemail",
                            "janus.plugin.recordplay",
                            "janus.plugin.videocall",
                            "janus.plugin.streaming",
                            "janus.plugin.sip",
                            "janus.plugin.videoroom",
                            "janus.plugin.echotest"
                        ]
                    }
                ]
            }
        });
    }

    removeToken(req, res, next) {
        res.json({
            "janus": "success",
            "transaction": req.body.transaction
        });
    }
}

module.exports.JanusAdminServer = JanusAdminServer;
