import { useEffect } from 'react';
import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '~/utils/api';
import '~/styles/main.css';

let reloadInterval: NodeJS.Timer;

function lazyReload() {
    clearInterval(reloadInterval);
    reloadInterval = setInterval(() => {
        if (document.hasFocus()) {
            window.location.reload();
        }
    }, 100);
}

function forcePageReload(registration: ServiceWorkerRegistration) {
    if (!navigator.serviceWorker.controller) {
        return;
    }

    if (registration.waiting) {
        registration.waiting.postMessage('skipWaiting');
        return;
    }

    function listenInstalledStateChange() {
        registration.installing?.addEventListener('statechange', function () {
            if (this.state === 'installed' && registration.waiting) {
                registration.waiting.postMessage('skipWaiting');
            } else if (this.state === 'activated') {
                lazyReload();
            }
        });
    }

    if (registration.installing) {
        listenInstalledStateChange();
        return;
    }

    registration.addEventListener('updatefound', listenInstalledStateChange);
}

async function registerServiceWorker() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/sw.js');
        forcePageReload(registration);
    }
}

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
    useEffect(() => {
        void registerServiceWorker();
    }, []);

    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
