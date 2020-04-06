import * as React from 'react';
import { Observable, Subscription } from 'rxjs';

const initialValue = Symbol.for('initialValue');

/**
 * Returns a stream of `Observable` data.
 *
 * The `props$` `Observable` is immediately subscribed on mount so the first render will include any data the observable immediately resolves with. This can be used to render a loading state in combination with `concat` and `of`. See example below.
 *
 * @example
 * import { concat, defer, of as _of } from 'rxjs';
 *
 * const data = useStream(concat(
 *  _of(undefined),
 *  defer(async () => loadData()),
 * ));
 *
 * return data === undefined ? <Loading /> : <Component data={data} />
 */
export function useStream<T>(props$: Observable<T>) {
  let mutableSubscription: Subscription | undefined;
  let mutableMounted = false;
  const [value, setValue] = React.useState<T | typeof initialValue>(initialValue);

  // Cleanup by unsubscribing when unmounted. Runs on mount and unmount only
  React.useEffect(() => {
    if (!mutableMounted) {
      subscribe();
      mutableMounted = true;
    } else {
      unsubscribe();
      mutableMounted = false;
    }
  }, []);

  // Subscribe after props$ updates (same as componentDidUpdate)
  React.useEffect(() => {
    subscribe();
  }, [props$]);

  function subscribe() {
    unsubscribe();
    let stateSet = false;
    mutableSubscription = props$.subscribe({
      next: (nextValue) => {
        stateSet = true;
        setValue(nextValue);
      },
    });

    if (!stateSet) {
      setValue(initialValue);
    }
  }
  function unsubscribe() {
    if (mutableSubscription !== undefined) {
      mutableSubscription.unsubscribe();
      mutableSubscription = undefined;
    }
  }

  return value === initialValue ? undefined : value;
}
