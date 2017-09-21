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

    // 用户表
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

    // 问题表
    create table questions(
        q_id smallint unsigned primary key auto_increment,
        q_title varchar(220) not null,
        q_tag varchar(50) not null,
        q_content longtext not null,
        votes int not null default 0,
        views int unsigned not null default 0,
        answer int unsigned not null default 0,
        last_res_id int unsigned comment '最近回复的用户id',
        create_time timestamp default current_timestamp,
        user_id int not null
    )engine=innodb default charset=utf8;

    // 标签表
    create table tags(
        t_id int unsigned primary key auto_increment,
        t_name varchar(40) not null
    )engine=innodb default charset = utf8;
```