import type { NextApiRequest, NextApiResponse } from 'next';
import { Kafka } from 'kafkajs';
import env from 'env-var';

const kafkaClient = new Kafka({
  clientId: env
    .get('KAFKA_CLIENT_ID')
    .required()
    .asString(),
  brokers: env
    .get('KAFKA_BROKERS')
    .required()
    .asString()
    .split(',')
  
});

const producer = kafkaClient.producer()

type EventData = {
  type: string,
  data: Record<string, any>
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as EventData;
  if (!body) {
    return res.status(400)
      .json({message: "failed to process body"});
  }
  await producer.connect();
  await producer.send({
    topic: "client-event-stream",
    messages: [{
      key: body.type,
      value: JSON.stringify(body.data),
    }]
  });
  res.status(200).end();
}
