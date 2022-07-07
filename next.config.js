//const getArrayFromEnumValues = require("./util/getArrayFromEnumValues");
//const {EStaticProtectedRoutes} = require("./types/config");
//const staticProtectedRoutes = getArrayFromEnumValues(EStaticProtectedRoutes).map((r) => r.slice(1)).join('|');

module.exports =  async (phase, { defaultConfig }) => {

    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        // async headers() {
        //     return []
        // },
        // async rewrites() {
        //     return [
        //         {
        //             source: '/(make|portfolio)',
        //             destination: '/_____'
        //
        //         },
        //     ]
        // },
        async redirects() {
            return [
                {
                    source: '/(sign-in|sign-up)',
                    has: [
                        {
                            type: "cookie",
                            key: "accessToken",
                        },
                    ],
                    permanent: false,
                    destination: '/',
                },
                {
                    source: '/(sign-in|sign-up)',
                    has: [
                        {
                            type: "cookie",
                            key: "refreshToken",
                        },
                    ],
                    permanent: false,
                    destination: '/',
                },
                // {
                //     source: '/make',
                //     // has: [
                //     //     {
                //     //         type: 'query',
                //     //         key: 'mustRedirected',
                //     //         value: 'false'
                //     //     }
                //     // ],
                //     permanent: false,
                //     destination: '/_?mustRedirected=make',
                // },
            ]
        },
    }

    return nextConfig
}
