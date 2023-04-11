import Head from 'next/head';

import MainPage from '~/components/Home/MainPage';

export default function Home() {
    return (
        <>
            <Head>
                <title>Little Italy</title>
                <meta name='description' content='Little Italy' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <MainPage title='Little Italy' address='203 Venice Blvd. CA 90291. USA' number='+1 310-823-5396' email='eat@littleitaly.com' />
        </>
    );
}
