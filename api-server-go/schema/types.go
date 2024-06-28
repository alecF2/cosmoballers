package schema

import "github.com/emicklei/go-restful/v3"

type DataPayload[T any] struct {
	Status string `json:"status"`
	Data   T      `json:"data"`
}

type Controller[T any] interface {
	CreateOne(*T) (*T, error)
	GetOne(uint) (*T, error)
	GetAll() (*[]T, error)
	UpdateOne(uint, *T) (*T, error)
	DeleteOne(uint) error
	WebService() *restful.WebService
}
