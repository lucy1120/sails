//方法路由和路径路由
function creataDate(t){
  const d=new Date(t);
  return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); ;
}
module.exports = {

  index: async function (req, res) {
    let newData=await News.find().sort('id desc').limit(1);
    newData[0].para=newData[0].content.match(/<p>[^>]+<\/p>/)[0];
    let hotData=await NewHot.find().sort('id desc').limit(9);
    let newTwo=[];
    hotData.forEach(el => {
        newTwo.push({id:el.id,title:el.title})
    });

    let carData=await NewCarousel.find().sort('id desc').limit(5);
    let newThree=[];
    carData.forEach(el => {
      newThree.push({id:el.id,title:el.title,imgSrc:el.imgSrc})
    });

    res.view({newOne:newData[0],newTwo,newThree});
  },
  list: function (req, res) {
    res.view();
  },
  getNotice: async function (req, res) {
    let noticeData=await Notice.find().sort('id desc').limit(8);
    noticeData=noticeData.map(el=>{
      el.date=creataDate(el.updatedAt);
      return el;
    })
    res.json(noticeData)
  },
  //增加
  addData: async function (req, res) {
    let json=[
      {sid:'201958304000',sname:'小红',sage:20},
      {sid:'201958304001',sname:'小明',sage:21},
      {sid:'201958304002',sname:'小王',sage:22},
      {sid:'201958304003',sname:'小陈',sage:21},
      {sid:'201958304004',sname:'小朱',sage:21},
      {sid:'201958304005',sname:'小韩',sage:22},
      {sid:'201958304006',sname:'小赵',sage:21},
      {sid:'201958304007',sname:'小魏',sage:23},
      {sid:'201958304008',sname:'小齐',sage:21},
      {sid:'201958304009',sname:'小秦',sage:21},
      {sid:'201958304010',sname:'小楚',sage:20},
      {sid:'201958304011',sname:'小刚',sage:19},
    ]
    //fetch 把数据取出来
    let record=await Student.createEach(json).fetch();
    res.json(record)
  },
  //查询
  selectData: async function (req, res) {
    //定义一个变量，但是不可再修改
    //模糊条件查询
    const row=await Student.find({sname:{contains:'玲'}});
    console.log(row);
    res.send(row);
  },
  //更新
  updateData:async function (req, res){
    //多一条同id号的数据是为了保证
    const row=await Student.update({id:3},{sname:'苏大强'}).fetch();
    console.log(row);
    res.json(row);
  },
  //删除
  deleteData:async function (req, res){
    const row=await Student.destroy({id:3}).fetch();
    console.log(row);
    res.json(row);
  },
  //分页查询
  pageData:async function (req, res){
    //跳过指定个数数据 一页四个 
    const rows=await Student.find().sort('id desc').skip(1).limit(5);
    console.log(rows);
    res.json(rows);
  },
  //登录
  login:function(req,res){
    req.session.userID='lxt'
    res.send('success!')
  },
  //统计 也可以带着查询
  count: async function(req,res){
    let num=await Student.count({id:4})
    res.json(num)
  },
  //计算分页和列表
  getList: async function(req,res){
    const curPage=req.query.curPage;
    let arr=await News.find().sort('id desc').skip(curPage*5).limit(5);
    arr=arr.map(el=>{
      let str=el.content.match(/<p>[^>]+>/)[0];
      el.para=str;
      return el;
    })
    res.json(arr);
  },
  getNum: async function(req,res){
    const num=await News.count();
    res.json(num);
  },
  getList1: async function(req,res){
    const curPage=req.query.curPage;
    const arr=await Notice.find().sort('id desc').skip(curPage*5).limit(5);
    let arr1=[];
    arr.forEach(el=>{
      arr1.push({id:el.id,title:el.title,date:new Date(el.updatedAt).toLocaleDateString()})
    })
    res.json(arr1);
  },
  getNum1: async function(req,res){
    const num=await Notice.count();
    res.json(num);
  },
  //切换通知公告页面路由
  isNotice:async function (req, res) {
    res.view();
  },
  //
  //发送方式默认为get所以使用query而不是body
  searchInfo:async function (req, res) {
    const keyword=req.query.keyword;
    req.session.keyword=keyword
    res.view();
  },
  getSearch:async function (req, res) {
    const keyword=req.session.keyword;
    let arr=[];
    const news=await News.find({title:{contains:keyword}}).sort('id desc')
    news.forEach(el=>{
      let date=new Date(el.updatedAt).toLocaleDateString()
      arr.push({id:el.id,title:el.title,date,detailName:'detail',source:el.source})
    })
    const notices=await Notice.find({title:{contains:keyword}}).sort('id desc')
    notices.forEach(el=>{
      let date=new Date(el.updatedAt).toLocaleDateString()
      arr.push({id:el.id,title:el.title,date,detailName:'detailNotice',source:el.source})
    })
    const carousels=await NewCarousel.find({title:{contains:keyword}}).sort('id desc')
    carousels.forEach(el=>{
      let date=new Date(el.updatedAt).toLocaleDateString()
      arr.push({id:el.id,title:el.title,date,detailName:'carDetail',source:el.source})
    })
    res.json(arr);
  },
  //详情页渲染
  detailNotice:async function (req, res) {
    const id=req.query.id
    const record=await Notice.findOne({id})
    res.view(record);
  },
  carDetail:async function (req, res) {
    const id=req.query.id
    const record=await NewCarousel.findOne({id})
    res.view(record);
  },
  detail:async function (req, res) {
    const id=req.query.id
    const record=await News.findOne({id})
    res.view(record);
  }
};

