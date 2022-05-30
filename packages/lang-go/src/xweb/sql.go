package xweb

import (
	"database/sql"
	"time"
)

// 使用的db-sdk应该完全实现golang database/sql接口，这样底层的db切换不会影响代码的调用
// MySQL https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/05.2.md

// 通常我们很少裸调用sql: 这样既不安全，实例化数据也不方便 => ORM

// NOSQL => 非关系型数据库 Redis / MongoDB // https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/05.6.md

// ===> GORM

// SOP.1 模型定义

// 可以继承自gorm.Model

type Model struct {
	ID        uint `gorm:"primary_key"` // 默认主键为ID // `gorm:"primary_key"` 可以手动指定主键
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt time.Time
}

type User struct { // 默认表名为users
	Model                   // gorm.Model
	Name      string        `gorm:"type:varchar(100);unique_index"`
	Age       sql.NullInt64 `gorm:"size:255"`
	Birthday  *time.Time
	Email     string
	Role      string
	LoverId   int64  // 默认列名为 lover_id
	OtherAttr string `gorm:"column:other_xx"` // 指定列名
}

// 可以复写表名
func (User) TableName() string {
	return "my_users"
}

// SOP.2 - CURD方法
