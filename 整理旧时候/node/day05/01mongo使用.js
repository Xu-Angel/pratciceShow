//mongod:服务器
//mongo:客户端,mongodb自带的客户端

//增:insert操作
db.person.insert({"name":"zhangsan"+Math.ceil(Math.random()*100),age:41})
//查:find操作
db.person.find({"name":"zhangsan"});
//删:remove操作
db.person.remove({"name":"zhangsan"});
//改:updata操作
db.person.update({"name":"zhangsan60"},{$set:{"singer":"张学友"}});
db.person.find({"singer":"张学友"});