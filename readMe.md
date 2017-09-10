# express+vue+mysql 仿segment论坛

### segment
- vue + vue-router + vuex + less   

### server
- express+mysql

- #### API error code
    - 200 success
    - 400 error  
    - 401 连接错误  
    - 402 登录过期

### mysql tables

- user

```mysql

    CREATE TABLE `user` (
        `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
        `mobile` char(15) DEFAULT NULL,
        `email` varchar(60) DEFAULT NULL,
        `pwd` varchar(60) NOT NULL,
        `username` varchar(120) NOT NULL,
        `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
        `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        PRIMARY KEY (`uid`),
        UNIQUE KEY `username_unique` (`username`),
        UNIQUE KEY `email_unique` (`email`),
        UNIQUE KEY `mobile_unique` (`mobile`) USING BTREE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

```