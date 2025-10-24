from typing import Callable, Any
from app.core.config import Config
from app.service.consumer import build_consumer
from app.service.producer import build_producer


class Gateway:

    def __init__(self, cfg: Config) -> None:
        self.cfg = cfg
        self.consumer = build_consumer(cfg)
        self.producer = build_producer(cfg)

    def run(self) -> None:
        try:
            while True:
                records = self.consumer.poll(timeout_ms=1000)
                for tp, batch in records.items():
                    for record in batch:
                        try:
                            pass
                        except Exception as e:

                            print(f"Error processing message at offset {record.offset}: {e}")
                            continue
                        future = self.producer.send(self.cfg.KAFKA_PRODUCER_TOPIC, value=result)
                        try:
                            future.get(timeout=10)
                        except Exception as e:
                            print(f"Error producing result for offset {record.offset}: {e}")

                            continue
                    if batch:
                        try:
                            self.consumer.commit()
                        except Exception as e:
                            print(f"Failed to commit offsets: {e}")
        except KeyboardInterrupt:
            pass
        finally:
            try:
                self.producer.flush(timeout=10)
            except Exception:
                pass
            self.consumer.close()
            self.producer.close()
