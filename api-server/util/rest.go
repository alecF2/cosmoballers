package util

import "cosmoballers/schema"

func CreateDataPayload[T any](data *T) *schema.DataPayload[T] {
	return &schema.DataPayload[T]{
		Status: "SUCCESS",
		Data:   *data,
	}
}
