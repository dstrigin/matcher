from app.core.config import cfg
from app.app import Gateway


def main() -> None:
    gateway = Gateway(cfg)
    gateway.run()


if __name__ == "__main__":
    main()
