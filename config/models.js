

module.exports.models = {
  schema: true,
  migrate: 'alter',//保证数据不丢失
  attributes: {
    createdAt: { type: 'number', autoCreatedAt: true, },
    updatedAt: { type: 'number', autoUpdatedAt: true, },
    id: { type: 'number', autoIncrement: true, }, 
  },
  dataEncryptionKeys: {
    default: 'z45XJhpoMha5mmJCiOpbssZ7HG3HLTwbi/kp65BkH8k='
  },
  cascadeOnDestroy: true
};
