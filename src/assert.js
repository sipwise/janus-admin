// micro assert
var assert = (test, error, object)=>{
  if(!test)
    throw new Error(error + "with :" + JSON.stringify(object));
  return true
}
assert.property = (object, property, error)=>{
  if (!object[property])
    throw new Error(error);
  return true
}
assert.isString = (object, error)=>{
  return _.isString(object);
  if(!_.isString(object))
    throw new Error(error);
  return true;
}
assert.isNumber = (object, error)=>{
  if(!_.isNumber(object))
    throw new Error(error);
  return true;
}
assert.isArray = (object, error)=>{
  if(!_.isArray(object))
    throw new Error(error);
  return true;
}
assert.equal = (left,right,error)=>{
  if(left !== right)
    throw new Error(error);
  return true;
}

module.exports.assert = assert;