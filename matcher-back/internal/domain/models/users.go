package models

import (
	"github.com/dstrigin/matcher/matcher-back/internal/domain"
)

type GroupType uint64

const (
	InterestsGroup      GroupType = 1
	SkillsGroup         GroupType = 2
	PersonalTraitsGroup GroupType = 3
	CityGroup           GroupType = 4
)

type TagType uint64

const ()

type GenderType uint64

const (
	MaleGender   GenderType = 1
	FemaleGender GenderType = 2
)

type User struct {
	UserID     domain.UserID
	UserNumber uint64
	Email      string
	Password   string
	Telegram   string
	Profile    Profile
	Score      float64
}

type Profile struct {
	FirstName  string
	LastName   string
	PictureURL string
	Info       map[GroupType]TagType
	Gender     GenderType
	Age        uint64
	About      string
}
