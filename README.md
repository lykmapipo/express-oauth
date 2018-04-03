# express-oauth(WIP)

[![Build Status](https://travis-ci.org/lykmapipo/express-oauth.svg?branch=master)](https://travis-ci.org/lykmapipo/express-oauth)
[![Dependency Status](https://img.shields.io/david/lykmapipo/express-oauth.svg?style=flat)](https://david-dm.org/lykmapipo/express-oauth)
[![npm version](https://badge.fury.io/js/%40lykmapipo%2Fexpress-oauth.svg)](https://badge.fury.io/js/@lykmapipo/express-oauth)


minimal [oauth](https://oauth.net/2/) implementation for [express](http://expressjs.com/)

*Note: It highly advice to use TLS*

## Requirements

- NodeJS v9.3.0+
- mongoose v5.0.9+

## Install
```sh
$ npm install --save @lykmapipo/express-oauth @lykmapipo/express-common
```

## Usage

```javascript
'use strict';

const app = require('@lykmapipo/express-common');
const oauth = require('@lykmapipo/express-oauth');

app.mount(oauth);
app.start();

```

```curl
curl http://0.0.0.0:5000/v1.0.0/oauth/athenticate
curl http://0.0.0.0:5000/v1.0.0/oauth/authorize
curl http://0.0.0.0:5000/v1.0.0/oauth/token
curl http://0.0.0.0:5000/v1.0.0/users
curl http://0.0.0.0:5000/v1.0.0/clients
curl http://0.0.0.0:5000/v1.0.0/tokens
curl http://0.0.0.0:5000/v1.0.0/codes
```


## Testing
* Clone this repository

* Install all development dependencies
```sh
$ npm install
```
* Then run test
```sh
$ npm test
```

## Contribute
It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.


## References
- [oauth.net](https://oauth.net/2/)
- [oauth-2-simplified](https://aaronparecki.com/oauth-2-simplified/)
- [expressjs](https://expressjs.com/)
- [Production Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Using Middleware](http://expressjs.com/en/guide/using-middleware.html)
- [Health Checks and Graceful Shutdown](https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html)
- [The Twelve Factors App](https://12factor.net/)
- [node-oauth2-server](https://github.com/oauthjs/node-oauth2-server)
- [refresh-token-with-jwt-authentication-node-js](https://solidgeargroup.com/refresh-token-with-jwt-authentication-node-js)


## Licence
The MIT License (MIT)

Copyright (c) 2018 lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 