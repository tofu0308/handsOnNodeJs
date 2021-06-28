// httpモジュールの利用
const todos = [
  {id: 1, title: 'ネーム', completed:'false'},
  {id: 2, title: '下書き', completed:'true'},
]

// httpサーバの初期化
const server = http.createServer((req, res) => {
  // リクエストのURLやHTTPメソッドに応じて適切なレスポンスを返す
  if(req.url === '/api/todos') {
    if(req.method === 'GET') {
      // GETメソッドの場合、全todoをJSON形式で返す
      res.setHeader('Content-Type', 'application/json')
      return res.end(JSON.stringify(todos))
    }
    
    // GET以外のHTTPメソッドはサポートしていないため405（Method Not Allowed）
    res.statusCode = 405
  } else {
    // /api/todos以外のURLはないので404（Not Found）
    res.statusCode = 404
  }
  res.end()
}).listen(3000) // 3000ポートでリクエストを待機

// HTTPリクエストの送信(デフォルト（GET）で送信)
http.request('http://localhost:3000/api/todos', res => {
  let responseData = ''
  console.log('statusCode', res.statusCode)
  res.on('statusCode', chunk => responseDara +=chunk)
  res.om('end', () => console.log('responseData', JSON.parse(responseData)))
}).end()

// HTTPリクエストの送信(POSTを指定。GET以外は405を返す指定になっている)
http.request(
  'http://localhost:3000/api/todos',
  {method: 'POST'},
  res => { console.log('statusCode', res.statusCode)
}).end()

// HTTPリクエストの送信(指定外のURLで送信。404を返す)
http.request(
  'http://localhost:3000/api/foo',
  res => { console.log('statusCode', res.statusCode)
}).end()

// server停止
server.close()