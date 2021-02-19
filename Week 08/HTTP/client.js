const net = require('net');

class Request {
    constructor(options) {
        this.method = options.method || 'GET';
        this.host = options.host;
        this.port = options.port || '80';
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {};
        // 设置默认的格式
        if(!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        if(this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body);
        } else if(this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        }
        this.headers['Content-Length'] = this.bodyText.length;
    } 
    send(connection) {
        return new Promise((resolve, reject) => {
           let parser = new ResponseParser;
           if(connection) {
               connection.write(this.toString());
           } else {
               connection = net.createConnection({
                   host: this.host,
                   port: this.port,
               }, ()=> {
                   connection.write(this.toString());
               })
           }
           connection.on('data', (data)=> {
               console.log(data.toString());
               parser.receive(data.toString());
               if(parser.isFinished) {
                   resolve(parser.response);
                   connection.end();
               }
           })
           connection.on('error', (err)=> {
                reject(err);
               connection.end();
        })
        })
    }
    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
        ${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r\r
        ${this.bodyText}
        ` 
    }
}

class ResponseParser {
  constructor() {
    // status line 有两个状态  
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    // header有四个状态
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;

    this.WAITING_HEADER_BLOCK_END = 6;
    // body 
    this.WAITING_BODY = 7;
    // 存储解析过程中产生的结果
    this.current = this.WAITING_STATUS_LINE;  // 当前的状态
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyParser = null;

  }
  get isFinished() {
      return this.bodyParser && this.bodyParser.isFinished;
  }
  get response() {
      this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
      return {
          statusCode: RegExq.$1,
          statusText: RegExq.$2,
          headers: this.headers,
          body: this.bodyParser.content.join('')
      }
  }
  receive(string) {
    for (let i = 0; i < string.length; i++) {
        // 状态机
         this.receiveChar(string.charAt(i));
    }
  }
  // 状态机
  receiveChar(char) {
    if(this.current === this.WAITING_STATUS_LINE) {
        if(char === '\r') {
            this.current = this.WAITING_STATUS_LINE_END;
        } else {
            this.statusLine += char; 
        }
    } else if (this.current === this.this.WAITING_STATUS_LINE_END) {
        if(char === '\n') {
            this.current = this.WAITING_HEADER_NAME;
        }
    } else if (this.current === this.WAITING_HEADER_NAME) {
        if(char === ':') {
            this.current = this.WAITING_HEADER_SPACE;
        } else if (char === '\r') {
            this.current = this.WAITING_HEADER_BLOCK_END;
            // 是多个的if else node中的形式是chunked 
            if(this.headers['Transfer-Enoding'] === 'chunked') {
                this.bodyParser = new TrunkedBodyParser();
            }
        } else {
            this.headerName += char;
        }      
    } else if (this.current === this.WAITING_HEADER_SPACE) {
        if(char === ' ') {
            this.current = this.WAITING_HEADER_VALUE;
        }       
    } else if (this.current === this.WAITING_HEADER_VALUE) {
        if (char === '\r') { 
            this.current = this.WAITING_HEADER_BLOCK_END;
            this.headers[this.headerName] = this.headersValue;
            this.headerName = "";
            this.headersValue = "";
        } else {
            this.headerValue += char;
        }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
        if (char === '\n') { 
            this.current = this.WAITING_HEADER_NAME;
        }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
        if (char === '\n') { 
            this.current = this.WAITING_BODY;
        }       
    } else if ( this.current === this.WAITING_BODY) {
        console.log(char);
        // 额外的特殊处理
    }
  }
}
// 解析body
class TrunkedBodyParser {
  constructor() {
      // 两个状态记录长度
      this.WAITING_LENGTH = 0;
      this.WAITING_LENGTH_LINE_END = 1;
      // 非常规操作
      // 读回来的length在这里计数，没法用一个输入来标志结束，正是因为Trunk里面可以含有任何的字符，只能用一个预先读进来的长度来控制Trunk的大小，严格来说不是melay状态机
      this.READING_TRUNK = 2;  

      this.READING_NEW_LINE = 3;
      this.READING_NEW_LINE_END = 4;
      this.length = 0;
      this.content = [];
      this.isFinished = false;
      this.current = this.WAITING_LENGTH;
  }
  receiveChar(char) {
     if(this.current === this.WAITING_LENGTH) {
         if(char === '\r') {
             if(this.length === 0) {
                 this.isFinished = true;
             }
             this.current = this.WAITING_LENGTH_LINE_END;
         } else {
             this.length *= 16;
             this.length += parseInt(char, 16);
         }
     } else if(this.current === this.WAITING_LENGTH_LINE_END) {
        if(char === '\n') {
           this.current = this.READING_TRUNK;
        }
    } else if(this.current === this.READING_TRUNK) {
        this.content.push(char);
        this.length--;
        if(this.length === 0) {
            this.current = this.READING_NEW_LINE;
        }
    } else if(this.current === this.READING_NEW_LINE) {
        if(char === '\r') {
            this.current = this.READING_NEW_LINE_END;
         }
    } else if(this.current === this.READING_NEW_LINE_END) {
        if(char === '\n') {
            this.current = this.WAITING_LENGTH;
         }      
    }
  }
}

void async function() {
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8095',
        path: '/',
        headers: {
            ['X-Foo2'] : 'customed'
        },
        body: {
            name: 'zhangzhou'
        }
    })
    let response = await request.send();
    console.log('response:', response);
}();