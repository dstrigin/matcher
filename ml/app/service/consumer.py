from kafka import KafkaConsumer
from app.core.config import Config


def build_consumer(cfg: Config) -> KafkaConsumer:
    consumer = KafkaConsumer(
        bootstrap_servers=f"{cfg.KAFKA_BOOTSTRAP_SERVER}:{cfg.KAFKA_BOOTSTRAP_SERVER_PORT}",
        group_id=cfg.KAFKA_GROUP_ID,
        auto_offset_reset="earliest",
        enable_auto_commit=False,
        isolation_level=getattr(cfg, "KAFKA_CONSUMER_ISOLATION_LEVEL", "read_uncommitted"),
    )
    consumer.subscribe([cfg.KAFKA_CONSUMER_TOPIC])
    return consumer
