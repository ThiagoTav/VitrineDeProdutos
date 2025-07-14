import Head from 'next/head';

interface Props {
  title: string;
  description: string;
}

export default function HeadMeta({ title, description }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}