from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Literal, Optional, Dict, Any


class Config(BaseSettings):
    model_config = SettingsConfigDict(
        env_file='.env',
        env_ignore_empty=True,
        extra='ignore',
    )

    # Kafka

    KAFKA_BOOTSTRAP_SERVER: str = 'localhost'
    KAFKA_BOOTSTRAP_SERVER_PORT: int = 9092
    KAFKA_GROUP_ID: str = 'ml'
    KAFKA_CONSUMER_TOPIC: str = 'read'
    KAFKA_PRODUCER_TOPIC: str = 'write'
    KAFKA_CONSUMER_ISOLATION_LEVEL: str = "read_committed"

    # Other
    ENVIRONMENT: Literal["production", "development", 'test'] = "development"


cfg = Config()
