# express+vue+mysql 仿segment论坛

### segment
- vue+vue-router+less   

### server
- express+mysql


### mysql tables

- user

```mysql

    create table user(
        uid int not null primary key auto_increment comment '用户id',
        email varchar(60) not null,
        pwd varchar(60) not null,
        username varchar(120) not null,
        update_time timestamp not null default current_timestamp comment '更新时间',
        create_time timestamp not null default current_timestamp comment '创建时间',
        unique key email_unique(email),
        unique key username_unique(username)
    )ENGINE=innodb DEFAULT CHARSET=utf8;

```