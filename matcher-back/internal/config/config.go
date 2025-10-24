package config

import (
	"fmt"
	"time"

	"github.com/spf13/viper"
)

// Config — основная структура конфигурации
type Config struct {
	JWT  JWT  `yaml:"jwt"`
	DB   DB   `yaml:"db"`
	HTTP HTTP `yaml:"http"`
}

type HTTP struct {
	Host string `yaml:"host"`
	Port int    `yaml:"port"`
}

type DB struct {
	Host     string `yaml:"host"`
	Port     int    `yaml:"port"`
	User     string `yaml:"user"`
	Password string `yaml:"password"`
	Name     string `yaml:"name"`
	SSLMode  string `yaml:"sslmode"`
}

type JWT struct {
	PublicKeyAccess  string        `yaml:public_key_access`
	PrivateKeyAccess string        `yaml:private_key_access`
	TtlAccess        time.Duration `yaml:ttl_access`
	TtlSession       time.Duration `yaml:ttl_session`
}

func LoadConfig(path string) (*Config, error) {
	v := viper.New()

	v.SetConfigFile(path)
	v.SetConfigType("yaml")
	v.AutomaticEnv()

	if err := v.ReadInConfig(); err != nil {
		return nil, fmt.Errorf("error reading config file: %w", err)
	}

	var cfg Config
	if err := v.Unmarshal(&cfg); err != nil {
		return nil, fmt.Errorf("error parsing config: %w", err)
	}

	return &cfg, nil
}
