import Document, {DocumentContext, DocumentProps, Head, Html, Main, NextScript} from "next/document"
import path from "path";
import * as fs from "fs/promises";


class AppDocument extends Document {
    private static absoluteFontsPath = '/assets/fonts';
    private static ignoreFonts: string[] = []; //* Example ['Kanit']
    private static fontsPaths: Record<string, string[]>;
    private absoluteFontsPath = '/assets/fonts';


    constructor(props: DocumentProps) {
        super(props)
        console.log('construktor')
        //console.log(props, a)
    }

    componentDidMount() {
        console.log(2321321)
    }

    static async getInitialProps(ctx: DocumentContext) {
        console.log(ctx.pathname, 'getInitialProps');
        const originalRenderPage = ctx.renderPage;

        if (!AppDocument.fontsPaths) {
            AppDocument.fontsPaths = await AppDocument.getFontsPaths()
        }

        // Run the React rendering logic synchronously
        ctx.renderPage = () => originalRenderPage({

            // Useful for wrapping the whole react tree
            enhanceApp: (App) => {
                return App;
            },
            // Useful for wrapping in a per-page basis
            enhanceComponent: (Component) => {
                //Component.defaultProps = {isAuth}
                return Component;
            },
        })

        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        const fontsPaths = AppDocument.fontsPaths;

        return (
            <Html>
                <Head>
                    {Object.keys(fontsPaths).map(font => fontsPaths[font].map(fileName => (
                        <link
                            key={fileName}
                            href={`${this.absoluteFontsPath}/${font}/${fileName}`}
                            rel="stylesheet"
                        />
                    )))}
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }

    private static async getFontsPaths() {
        const fontsPath = path.join(`${process.cwd()}/public`, AppDocument.absoluteFontsPath);

        return await fs.readdir(fontsPath).then(async result => {
            const fontsPaths: Record<string, string[]> = {}

            for (let i = 0; i < result.length; i++) {
                const dir = result[i];
                const currentPath = `${fontsPath}/${dir}`;

                if ((await fs.lstat(currentPath)).isDirectory() && !AppDocument.ignoreFonts.includes(dir)) {
                    const files = await fs.readdir(currentPath)

                    files.forEach(file => {
                        if (file.includes('.woff2')) {
                            !fontsPaths[dir] && (fontsPaths[dir] = []);
                            fontsPaths[dir].push(file);
                        }
                    })
                }
            }
            return fontsPaths;
        })
    }
}

export default AppDocument;