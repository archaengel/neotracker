import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';
import {
  Client,
  LocalKeyStore,
  LocalMemoryStore,
  LocalUserAccountProvider,
  NEOONEDataProvider,
  NEOONEProvider,
  NetworkType,
  ReadClient,
} from '@neo-one/client';
import { Monitor } from '@neo-one/monitor';
import * as appRootDir from 'app-root-dir';
import fs from 'fs';
import { create } from 'jss';
// @ts-ignore
import preset from 'jss-preset-default';
import { Context } from 'koa';
import compose from 'koa-compose';
import compress from 'koa-compress';
import { RootLoader } from 'neotracker-server-db';
import { makeRelayEnvironment, RelaySSRQueryCache, schema } from 'neotracker-server-graphql';
import { CodedError } from 'neotracker-server-utils';
import { getMonitor } from 'neotracker-server-utils-koa';
import {
  App,
  AppOptions,
  AppServer,
  configureStore,
  createTheme,
  routeConfigs,
  ThemeProvider,
  // @ts-ignore
} from 'neotracker-shared-web';
import * as path from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
// @ts-ignore
import { JssProvider, SheetsRegistry } from 'react-jss';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { MatchedRoute, matchRoutes } from 'react-router-config';
import { of as _of } from 'rxjs';
import { getNonce, getRootLoader, getUserAgent } from '../common';
import { AddBodyElements, AddHeadElements, makeServerHTML } from './makeServerHTML';
export { AddHeadElements, AddBodyElements } from './makeServerHTML';

const provider = new LocalUserAccountProvider({
  keystore: new LocalKeyStore({
    store: new LocalMemoryStore(),
  }),

  provider: new NEOONEProvider(),
});

const client = new Client({
  memory: provider,
  localStorage: new LocalUserAccountProvider({
    keystore: new LocalKeyStore({
      store: new LocalMemoryStore('localStorage'),
    }),

    provider: new NEOONEProvider(),
  }),
});

const renderAppShell = (monitor: Monitor, network: NetworkType, appOptions: AppOptions) => {
  const store = configureStore(false);
  const theme = createTheme();
  const sheetsRegistry = new SheetsRegistry();
  const jss = create(preset());
  // @ts-ignore
  jss.options.createGenerateClassName = createGenerateClassName; // tslint:disable-line no-object-mutation

  const app = (
    <JssProvider registry={sheetsRegistry} jss={jss}>
      <ThemeProvider theme={theme} sheetsManager={new Map()}>
        <StaticRouter location="/" context={{}} basename="">
          <Provider store={store}>
            <AppServer
              appContext={{
                css: [],
                nonce: '1234',
                options$: _of(appOptions),
                monitor,
                network,
                client,
                userAgent: {},
              }}
            />
          </Provider>
        </StaticRouter>
      </ThemeProvider>
    </JssProvider>
  );

  const appShell = renderToString(app);
  const helmet = Helmet.renderStatic();
  const appStyles = sheetsRegistry.toString();

  return {
    reactAppString: appShell,
    reactHelmet: helmet,
    relay: undefined,
    records: undefined,
    styles: appStyles,
  };
};

const renderApp = async ({
  match,
  location,
  rootLoader,
  css,
  nonce,
  monitor,
  userAgent,
  network,
  appOptions,
}: {
  // tslint:disable-next-line no-any
  readonly match: ReadonlyArray<MatchedRoute<{}>>;
  readonly location: string;
  readonly rootLoader: RootLoader;
  readonly css: ReadonlyArray<string>;
  readonly nonce: string;
  readonly monitor: Monitor;
  readonly userAgent: IUAParser.IResult;
  readonly network: NetworkType;
  readonly appOptions: AppOptions;
}) => {
  const relaySSRQueryCache = new RelaySSRQueryCache();
  const relayEnvironment = makeRelayEnvironment({
    monitor,
    rootLoader,
    schema,
    relaySSRQueryCache,
  });

  await App.asyncBootstrap(match[0], relayEnvironment);

  const store = configureStore(false);
  const context = {};
  const theme = createTheme();
  const sheetsRegistry = new SheetsRegistry();
  const jss = create(preset());
  // @ts-ignore
  jss.options.createGenerateClassName = createGenerateClassName; // tslint:disable-line no-object-mutation

  const readClient = new ReadClient(
    new NEOONEDataProvider({
      network,
      rpcURL: appOptions.rpcURL,
    }),
  );

  const app = (
    <JssProvider registry={sheetsRegistry} jss={jss}>
      <ThemeProvider theme={theme} sheetsManager={new Map()}>
        <StaticRouter location={location} context={context} basename="">
          <Provider store={store}>
            <App
              relayEnvironment={relayEnvironment}
              appContext={{
                environment: relayEnvironment,
                css,
                nonce,
                options$: _of(appOptions),
                monitor,
                network,
                client,
                readClient,
                userAgent,
                fileSaver: {
                  saveAs: () => {
                    // do nothing
                  },
                },
              }}
            />
          </Provider>
        </StaticRouter>
      </ThemeProvider>
    </JssProvider>
  );

  const reactAppString = renderToString(app);
  const relay = () => relaySSRQueryCache.toData();
  const records = () =>
    relayEnvironment
      .getStore()
      .getSource()
      .toJSON();
  const reactHelmet = Helmet.renderStatic();
  const styles = sheetsRegistry.toString();

  return {
    reactAppString,
    reactHelmet,
    relay,
    records,
    styles,
  };
};

const getAssets = (clientAssetsPath: string) =>
  JSON.parse(fs.readFileSync(path.resolve(appRootDir.get(), clientAssetsPath), 'utf8')).index;
export interface Environment {
  readonly appVersion: string;
}
export interface Options {
  readonly clientAssetsPath: string;
  readonly ssr: {
    readonly enabled: boolean;
    readonly userAgents: string;
  };

  readonly rpcURL: string;
  readonly adsenseID?: string;
}

// tslint:disable-next-line export-name
export const reactApplication = ({
  monitor: baseMonitor,
  addHeadElements,
  addBodyElements,
  environment,
  options,
  network,
  appOptions,
}: {
  readonly monitor: Monitor;
  readonly addHeadElements: AddHeadElements;
  readonly addBodyElements: AddBodyElements;
  readonly environment: Environment;
  readonly options: Options;
  readonly network: NetworkType;
  readonly appOptions: AppOptions;
}) => {
  const userAgents = new RegExp(options.ssr.userAgents);
  const appShellResult = renderAppShell(baseMonitor, network, appOptions);
  const asset = getAssets(options.clientAssetsPath);

  return {
    type: 'route',
    method: 'get',
    name: 'reactApplication',
    path: '/*',
    middleware: compose([
      compress(),
      async (ctx: Context): Promise<void> => {
        const nonce = getNonce(ctx);
        const rootLoader = getRootLoader(ctx);
        const monitor = getMonitor(ctx);
        const userAgent = getUserAgent(ctx);

        const match = matchRoutes(routeConfigs, ctx.request.path);
        // tslint:disable-next-line strict-type-predicates
        if (match == undefined || match.length === 0) {
          throw new CodedError(CodedError.PROGRAMMING_ERROR);
        }

        const missed = match[0].route.path === undefined;
        const routePath = match[0].route.path;
        if (routePath !== undefined) {
          monitor.setLabels({ [monitor.labels.HTTP_PATH]: routePath });
        }

        const isSSR = options.ssr.enabled && userAgents.test(userAgent.ua);
        const { reactAppString, reactHelmet, relay, records, styles } = await (isSSR
          ? renderApp({
              match,
              location: ctx.request.url,
              rootLoader,
              css: [asset.css],
              nonce,
              monitor,
              userAgent,
              network,
              appOptions,
            })
          : appShellResult);

        const html = makeServerHTML({
          css: [asset.css],
          js: [asset.js],
          reactAppString,
          nonce,
          helmet: reactHelmet,
          relay,
          records,
          styles,
          userAgent,
          network,
          appOptions,
          appVersion: environment.appVersion,
          addHeadElements,
          addBodyElements,
          adsenseID: options.adsenseID,
        });

        ctx.type = 'html';
        ctx.status = missed ? 404 : 200;

        ctx.body = html;
      },
    ]),
  };
};
