from kafka import KafkaProducer
from app.core.config import Config


def build_producer(cfg: Config) -> KafkaProducer:
    bootstrap = f"{cfg.KAFKA_BOOTSTRAP_SERVER}:{cfg.KAFKA_BOOTSTRAP_SERVER_PORT}"
    producer_config = {
        "bootstrap_servers": bootstrap,
        "acks": "all",
        "linger_ms": 10,
        "retries": 3,
        "value_serializer": lambda v: v.encode("utf-8") if isinstance(v, str) else v,
        "key_serializer": lambda k: k.encode("utf-8") if isinstance(k, str) else k,
    }

    return KafkaProducer(**producer_config)
