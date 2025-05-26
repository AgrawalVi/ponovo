import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

const EmailVerification = ({ name, url }: { name: string; url: string }) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address to get started with Ponovo</Preview>
      <Tailwind>
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[20px]">
            <Section className="mb-[20px] text-center">
              <Heading
                className="m-0 text-[32px] font-bold text-[#337A85]"
                style={{ fontFamily: "'Maven Pro', sans-serif" }}
              >
                Ponovo
              </Heading>
            </Section>

            <Heading className="mb-[24px] mt-[10px] text-center text-[24px] font-bold text-gray-800">
              Reset Your Password
            </Heading>

            <Text className="mb-[16px] text-[16px] leading-[24px] text-gray-600">
              Hi {name},
            </Text>

            <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-600">
              Welp, looks like you forgot your password. No worries, we've got
              you covered. Click the button below to create a new one. This link
              will expire in 1 hour.
            </Text>

            <Section className="mb-[32px] text-center">
              <Button
                className="box-border rounded-[4px] bg-[#337A85] px-[24px] py-[12px] text-center font-bold text-white no-underline"
                href={url}
              >
                Reset Password
              </Button>
            </Section>

            <Text className="mb-[16px] text-[14px] leading-[24px] text-gray-600">
              If you didn't request a password reset, you can safely ignore this
              email. Your password will not be changed.
            </Text>

            <Text className="mb-[24px] text-[14px] leading-[24px] text-gray-600">
              If the button above doesn't work, copy and paste this link into
              your browser:
            </Text>

            <Text className="mb-[32px] break-all text-[14px] leading-[20px] text-[#337A85]">
              <Link href={url} className="text-[#337A85] no-underline">
                {url}
              </Link>
            </Text>

            <Hr className="my-[24px] border-gray-200" />

            <Section className="text-center">
              <Text className="m-0 text-[12px] leading-[16px] text-gray-500">
                &copy; {new Date().getFullYear()}{' '}
                <Link href="https://vishrut.tech" className="text-[#337A85]">
                  Vishrut Agrawal
                </Link>
                . All rights reserved.
              </Text>

              {/* <Text className="mb-0 mt-[8px] text-[12px] leading-[16px] text-gray-500">
              10400 W Innovation Dr #210, Milwaukee, WI 53226
              </Text> */}

              <Text className="mb-0 mt-[8px] text-[12px] leading-[16px] text-gray-500">
                Due to the transactional nature of this email, you cannot
                unsubscribe.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

EmailVerification.PreviewProps = {
  name: 'Vish',
  url: 'https://example.com/verify?token=123456789abcdef',
}

export default EmailVerification
