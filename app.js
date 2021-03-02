var express = require('express');
var fs = require('fs');
var app = express();

app.engine('html', require('express-art-template'));

var content = [];

app.get('/',function(req,res){
    var arrs = fs.readFileSync('views/data.txt','utf-8');
    content = eval(arrs)
    res.render('index.html',{
        contents:content
    })
})

app.get('/post',function(req,res){
    res.render('post.html');
})

app.get('/postValue',function(req,res){
    var data = req.query;
    data.dateTime = '2021/03/02';
    content.unshift(data);
    var cundata = JSON.stringify(content)
    fs.writeFile('views/data.txt',cundata,'utf8',function(err){
        if(err)console.log('写文件出错了，错误是：'+err);
    });
    res.redirect('/');
})

app.listen(3000,function(){
    console.log('runing...')
})