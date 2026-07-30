import * as React from '@types/react';

declare module 'react' {
  interface FunctionComponent<P = {}> {
    // force add children (removed on React 18)
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}