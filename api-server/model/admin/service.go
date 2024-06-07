package admin

import (
	"cosmoballers/util"
)

func (Admin) TableName() string {
	return "admins4"
}

func GenerateAdmin() Admin {
	return Admin{
		Email:     "alec@null.net",
		FirstName: "Alec",
		LastName:  "Atienza",
		Password:  "mechmarket",
	}
}

func (s AdminResource) CreateOne(email, firstName, lastName, password string) (*Admin, error) {
	hashedPassword, err := util.HashPassword(password)
	if err != nil {
		return nil, err
	}

	admin := Admin{
		Email:     email,
		FirstName: firstName,
		LastName:  lastName,
		Password:  hashedPassword,
	}

	result := s.Conn.Create(&admin)
	if result.Error != nil {
		return nil, result.Error
	}

	return &admin, nil
}

func (s AdminResource) GetOne(id uint) (*Admin, error) {
	var admin Admin

	result := s.Conn.First(&admin, id)
	if result.Error != nil {
		return nil, result.Error
	}

	return &admin, nil
}

func (s AdminResource) GetAll() (*[]Admin, error) {
	var admins []Admin

	result := s.Conn.Find(&admins)
	if result.Error != nil {
		return nil, result.Error
	}

	return &admins, nil
}

func (s AdminResource) UpdateOne(id uint, d *Admin) (*Admin, error) {
	result := s.Conn.Where(&Admin{ID: id}).Updates(*d)
	if result.Error != nil {
		return nil, result.Error
	}

	// shouldn't error here if the update above was successful
	admin, _ := s.GetOne(id)

	return admin, nil
}

func (s AdminResource) DeleteOne(id uint) error {
	result := s.Conn.Delete(&Admin{ID: id})
	if result.Error != nil {
		return result.Error
	}

	return nil
}
