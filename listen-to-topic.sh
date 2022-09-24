#! /usr/bin/env bash
docker compose exec kafka \
    kafka-console-consumer.sh \
        --bootstrap-server kafka:9092 \
        --topic client-event-stream \
        --from-beginning
