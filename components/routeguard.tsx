import { useState, useEffect, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { isLoggedIn } from '@/lib/api';
import Placeholder from './placeholder';

export { RouteGuard };

function RouteGuard({ children }: PropsWithChildren) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, []);

    async function authCheck(url: string) {
        //paths to ignore:
        const publicPaths = ['/login', '/signup', '/'];
        const path = url.split('?')[0];
        const loggedIn = await isLoggedIn();

        if (!loggedIn && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/login',
                query: { return: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }    

    return (<>{authorized ? children : <Placeholder></Placeholder>}</>);
}