package admin

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Email     string    `json:"email"`
	FirstName string    `json:"firstName"`
	LastName  string    `json:"lastName"`
	Password  string    `json:"-"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type AdminResource struct {
	Conn *gorm.DB
}
