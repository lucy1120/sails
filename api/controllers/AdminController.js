// const Manage = require('../models/Manage');

module.exports = {
  index: function (req, res) {
    const nickname=req.query.nickname;
    const id=req.query.id;
    res.view({layout:false,nickname,id})//不使用公共模板
  },
  insert: async function (req, res) {
    req.file('myfile').upload(
      {
        dirname:require('path').resolve(sails.config.appPath,'assets/upload')
      },
      function(err,files){
      if (err)
        return res.serverError(err);
      let path=files[0].fd.split('\\');
      path=path[path.length-1];
      console.log(path);//获取的文件默认放在.tmp/uploads下,这个名字应存一份到数据库
      return res.json(filename);
    });
  },
  addNotice:async function (req,res){
    let obj=req.allParams();
    let record=await Notice.create(obj).fetch();
    res.json(record);
  },
  addNew: function (req, res) {
    //先收图片 图片的上传后的名字是不会重复有冲突的
    req.file('small').upload({
      dirname:require('path').resolve(sails.config.appPath,'assets/newSmallImg')
    },
    async function(err,files){
      if(err)
        return res.serverError(err);
      let path=files[0].fd.split('\\');
      filename=path[path.length-1];
      let obj=req.allParams();
      obj.smallSrc=filename;
      //await要和对应的async进行配对
      let record=await News.create(obj).fetch();
      res.json(record)
    });
  },
  addNewHot: function (req, res) {
    //先收图片 图片的上传后的名字是不会重复有冲突的
    req.file('imgFile').upload({
      dirname:require('path').resolve(sails.config.appPath,'assets/imgNewHot')
    },
    async function(err,files){
      if(err)
        return res.serverError(err);
      let path=files[0].fd.split('\\');
      filename=path[path.length-1];
      let obj=req.allParams();
      obj.imgSrc=filename;
      //await要和对应的async进行配对
      //表名为NewHot
      let record=await NewHot.create(obj).fetch();
      res.json(record)
    });
  },
  addCarousel: function (req, res) {
    //先收图片 图片的上传后的名字是不会重复有冲突的
    req.file('imgFile').upload({
      dirname:require('path').resolve(sails.config.appPath,'assets/imgCarousel')
    },
    async function(err,files){
      if(err)
        return res.serverError(err);
      let path=files[0].fd.split('\\');
      filename=path[path.length-1];
      let obj=req.allParams();
      obj.imgSrc=filename;
      //await要和对应的async进行配对
      //表名为NewHot
      let record=await NewCarousel.create(obj).fetch();
      res.json(record)
    });
  },
  addImg: function (req,res){
    req.file('image').upload({
      dirname:require('path').resolve(sails.config.appPath,'assets/newImage')
    },
    function(err,files){
      if(err)
        return res.serverError(err);
      let path=files[0].fd.split('\\');
      filename=path[path.length-1];
      return res.json(filename);
    });
  },
  getCarousel:async function(req,res){
    let curPage=req.query.curPage;
    let arr=await NewCarousel.find().sort('id desc').skip(curPage*4).limit(4);
    arr=arr.map(el=>{
      let d=new Date(el.updatedAt);
      el.date=d.getFullYear()+'/'+(d.getMonth()+1)+"/"+d.getDate();
      return el
    })
    res.json(arr)
  },
  delCar:async function(req,res){
    let id=req.query.id;
    let arr=await NewCarousel.destroy({id}).fetch();
    if(arr.length===1){
      res.json(true);
    }
    else{
      res.json(false);
    }
  },
  findTitle:async function(req,res){
    const keyword=req.query.keyword;
    let arr=await NewCarousel.find({title:{contains:keyword}});
    if(arr.length===0){
      res.json(arr)
    }else{
      res.json(arr)
    }
  },
  editCar:async function(req,res){
    let json = req.allParams();
    const id=json.id;
    delete json.id;
    let obj = await NewCarousel.update({id},json).fetch();
    if(obj) res.json(true)
    else res.json(false)
  },
  findCarOne:async function(req,res){
    const id=req.query.id;
    let obj=await NewCarousel.findOne({id})
    res.json(obj)
  },
  getCarNum:async function(req,res){
    let num=await NewCarousel.count();
    res.json(num);
  },
  login:function (req,res){
    let captcha=require("svg-captcha").create();
    req.session.yzmText=captcha.text;
    res.view({layout:false,imgData:captcha.data});
    // res.view({layout:"layouts/layout_cqwu",captcha:captcha.data})
  },
  getYzm:async function (req,res){
    let captcha=require("svg-captcha").create();
    req.session.yzmText=captcha.text;
    res.json(captcha.data);
    // res.view({layout:"layouts/layout_cqwu",captcha:captcha.data})
  },
  logined:async function (req,res){
    let json=req.allParams();
   
    let yzm=json.yzm.toLowerCase();
    delete json.yzm

    let yzmText=req.session.yzmText.toLowerCase();

    if(yzm===yzmText){
      let obj=await Manage.findOne(json)
      if(obj){
        req.session.userId=obj.id
        res.json(obj)//正确
      }
      else{
        res.json(1)//输入账号或者密码错误
      }
    }
    else{
      res.json(2)//验证码错误
    }
  },
  logout:async function (req,res){
    delete req.session.userId
    res.json(true)
  },
  changePwd:async function (req,res){
    const id=req.body.id;
    const oldPwd=req.body.oldPwd;
    const newPwd=req.body.newPwd;
    const userInfo=await Manage.findOne({id,password:oldPwd});
    if(userInfo){
      const userInfoNew=await Manage.update({id},{password:newPwd}).fetch();
      //delete userInfoNew.password
      res.json(userInfoNew)
    }else{
      res.json(false)
    }
  },
  changeUserInfo:async function (req,res){
    const id=req.query.id;
    const chinaName=req.query.chinaName;
    const nickname=req.query.nickname;
    const userInfoNew=await Manage.update(
        {id},
        {chinaName,nickname}
        ).fetch();
      res.json(userInfoNew)
  },
  register:async function (req,res){
    res.view({layout:false});
  },
  writeInfo: async function (req,res){
    const json=req.allParams()
    try{
      const obj=await Manage.create(json).fetch()
      delete obj.password
      res.json(obj)
    }catch(error){
      if(error){
        res.json(false)
      }
    }    
  },
};
//get 用 query
//post 用 body

