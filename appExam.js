var express = require('express'); 
var app = express(); // 익스프레스 앱 실행
app.use(express.static('public')); // pulbic 디렉토리에서 정적파일관리, localhost:3000/static.html로 호출가능
app.use(express.json()) // for parsing application/json 
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded 

app.set('view engine', 'pug'); // pug 템플릿 엔진 로드, 관례적으로 적용
app.set('views','./views');
app.locals.pretty= true;

app.get('/symetic/:id/:mode',function(req,res){
    var topic=['1번선택','2번선택','3번선택'];
    var out = 
    `
    <a href="/${req.params.mode}/id1/symetic">symetic 1</a>
    <a href="/${req.params.mode}/id2/symetic">symetic 2</a>
    <a href="/${req.params.mode}/id3/symetic">symetic 3</a>
    ${topic[req.query.id]} 
    ${topic[req.params.id]}
    `
    res.send(out);
});

//폼이동
app.get('/form', function(req,res){
    res.render('form');
});

//폼정보 받기
app.post('/form_receiver', function(req,res){
    var rs = req.body.test;
    console.log(rs);
    res.send(rs);
});

//쿼리스트링 - symetic url
app.get('/query:id',function(req,res){ // /query?id=a 요청시 id값 매핑
    var topic=['1번선택','2번선택','3번선택'];
    var out = 
    `
    <a href="/query?id=0">1번입니다.</a>
    <a href="/query?id=1">2번입니다.</a>
    <a href="/query?id=2">3번입니다.</a>
    
    ${topic[req.query.id]} 
    `
    res.send(out);
});

//pug템플릿엔진
app.get('/pug', function(req,res){
    //pug의 템플릿코드 랜더링 함수
    res.render('index', {title:'my title', message: 'Hello test'}); // views/index.pug 파일에 title, message 필드 매핑
});

//동적
app.get('/dynamic', function (req,res) {
    var out =`
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body>
            hello static
        </body>
        </html>`
        res.send(out);
});

app.get('/', function (req, res) { // 사용자가 '/'로 url 접속시 콜백 실행.
  res.send('Hello World!!');
});

// app이 3000번 포트를 리스닝, 성공시 콜백실행 - 서버단
app.listen(3000, function () { 
  console.log('Example app listening on port 3000!');
});

