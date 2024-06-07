package main

import (
	"cosmoballers/model/admin"
	"log"

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
}
