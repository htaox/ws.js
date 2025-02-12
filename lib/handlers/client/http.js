var utils = require('../../utils')
  , request = require('request')

exports.HttpClientHandler = HttpClientHandler

function HttpClientHandler() {}

HttpClientHandler.prototype.send = function(ctx, callback) {
  var options = { url: ctx.url
    , body: ctx.request
    , headers: { "SOAPAction": ctx.action
      , "Content-Type": ctx.contentType
      , "MIME-Version": "1.0"
    }
   , encoding: null
   , rejectUnauthorized: false
  };

  if (ctx.cookie) {
    var j = request.jar()
    var cookie = request.cookie(ctx.cookie)
    j.setCookie(cookie, ctx.url);
    options.jar = j;
  }

  request.post(options,     
               function (error, response, body) {
    ctx.response = body
      if (response) {
        ctx.resp_contentType = response.headers["content-type"]
      }
      if (error) ctx.error = error
      else ctx.statusCode = response.statusCode
      callback(ctx)
    })  
}
