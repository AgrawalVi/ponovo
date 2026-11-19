import { sqsClient } from '@/lib/aws/sqs'
import {
  SendMessageCommand,
  SendMessageCommandInput,
} from '@aws-sdk/client-sqs'
import 'server-only'

export const publishMessage = async (message: string) => {
  const params: SendMessageCommandInput = {
    QueueUrl: process.env.SQS_QUEUE_URL!,
    MessageBody: message,
    MessageAttributes: {
      provider: {
        DataType: 'String',
        StringValue: 'gmail',
      },
      userId: {
        DataType: 'String',
        StringValue: 'userIdTest123',
      },
    },
  }
  try {
    const command = new SendMessageCommand(params)
    const result = await sqsClient.send(command)

    console.log('Message send to SQS:', result.MessageId)
  } catch (e) {
    console.error(
      '[MERCURY][PUBLISH_MESSAGE] Error sending message to SQS:\n',
      e,
    )
    throw e
  }
}
