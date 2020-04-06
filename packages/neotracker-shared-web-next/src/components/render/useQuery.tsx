import { OperationVariables, WatchQueryFetchPolicy } from 'apollo-client';
import { DocumentNode } from 'graphql';
import * as React from 'react';
import { filter, map, take } from 'rxjs/operators';
import { AppContext } from '../../AppContext';
import {
  isResolvedQueryResult,
  observeQuery,
  ObserveQueryOptions,
  QueryResult,
  ResolvedQueryResult,
} from '../../utils';
import { useStream } from './useStream';
import { WithAppContextBase } from './WithAppContext';

// tslint:disable-next-line: no-unused
export interface QueryProps<_TData, TVariables> {
  readonly variables?: TVariables;
  readonly notifyOnNetworkStatusChange?: boolean;
}
export interface Props<TData, TVariables> extends QueryProps<TData, TVariables> {
  readonly query: DocumentNode;
  readonly appContext: AppContext;
}

interface GetObserveQueryOptions<TVariables> {
  readonly query: DocumentNode;
  readonly appContext: AppContext;
  readonly variables?: TVariables;
  readonly notifyOnNetworkStatusChange?: boolean;
  readonly fetchPolicy?: WatchQueryFetchPolicy;
}

function getObserveQueryOptions<TVariables>({
  appContext: { apollo },
  query,
  variables,
  notifyOnNetworkStatusChange = false,
  fetchPolicy = 'cache-first',
}: GetObserveQueryOptions<TVariables>): ObserveQueryOptions<TVariables> {
  return {
    apollo,
    query,
    variables: variables as TVariables,
    fetchPolicy,
    notifyOnNetworkStatusChange,
  };
}

export interface UseQueryResult<TData, TVariables> {
  readonly queryResult: QueryResult<TData, TVariables> | undefined;
  readonly fetchData: (appContext: AppContext, variables?: TVariables) => Promise<void>;
}

export interface Options<TData, TVariables> {
  readonly query: DocumentNode;
  readonly fetchNextData?: (appContext: AppContext, result: ResolvedQueryResult<TData, TVariables>) => Promise<void>;
  readonly notifyOnNetworkStatusChange?: boolean;
  readonly variables?: TVariables;
}

export function useQueryBase<TData, TVariables>(props: Props<TData, TVariables>) {
  let mutableResult$ = observeQuery<TData, TVariables>(getObserveQueryOptions(props));

  React.useEffect(() => {
    mutableResult$ = observeQuery<TData, TVariables>(getObserveQueryOptions(props));
  }, [props.appContext.apollo, props.query, props.notifyOnNetworkStatusChange, props.variables]);

  return useStream(mutableResult$);
}

export const useQuery = <TData, TVariables = OperationVariables>({
  query,
  fetchNextData,
  notifyOnNetworkStatusChange,
  variables,
}: Options<TData, TVariables>): UseQueryResult<TData, TVariables> => {
  async function fetchData(appContextIn: AppContext, variablesIn?: TVariables): Promise<void> {
    const result = await observeQuery<TData, TVariables>(
      getObserveQueryOptions({ appContext: appContextIn, query, variables: variablesIn, fetchPolicy: 'cache-first' }),
    )
      .pipe(
        map((value) => {
          if (value.error !== undefined) {
            throw value.error;
          }

          return value;
        }),
        filter(isResolvedQueryResult),
        take(1),
      )
      .toPromise();

    if (fetchNextData !== undefined) {
      await fetchNextData(appContextIn, result);
    }
  }

  const appContext = React.useContext(WithAppContextBase);

  return {
    queryResult: useQueryBase<TData, TVariables>({
      query,
      appContext,
      notifyOnNetworkStatusChange,
      variables,
    }),
    fetchData,
  };
};
