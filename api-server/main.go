package main

import (
	"cosmoballers/schema/admin"
	"log"
	"net/http"

	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	restful "github.com/emicklei/go-restful/v3"
	"github.com/spf13/viper"
	sqlite "github.com/ytsruh/gorm-libsql"
	"gorm.io/gorm"

	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

func getEnv(key string) string {
	err := viper.ReadInConfig()

	if err != nil {
		log.Fatalf("Error while reading config file %s", err)
	}

	value, ok := viper.Get(key).(string)

	if !ok {
		log.Fatalf("Invalid type assertion for key %s", key)
	}

	return value
}

func main() {
	viper.SetConfigFile("configs/.env")

	dbUrl := getEnv("DB_URL") + "?authToken=" + getEnv("DB_AUTH_TOKEN")

	db, err := gorm.Open(sqlite.New(sqlite.Config{
		DSN:        dbUrl,
		DriverName: "libsql",
	}), &gorm.Config{})

	if err != nil {
		log.Fatalf("Failed to connect to database; %s", err)
	}

	adminResource := admin.AdminResource{Conn: db}

	restful.DefaultContainer.Add(adminResource.WebService())

	config := restfulspec.Config{
		WebServices: restful.RegisteredWebServices(),
		APIPath:     "/apidocs.json",
	}
	restful.DefaultContainer.Add(restfulspec.NewOpenAPIService(config))
	log.Printf("start listening on localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
