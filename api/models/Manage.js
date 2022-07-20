module.exports = {
    attributes: {
      chinaName:{type:'string',required:true},
      account:{type:'string',required:true,unique:true},
      nickname:{type:'string',required:true},
      password:{type:'string',required:true}
    }
  };
  