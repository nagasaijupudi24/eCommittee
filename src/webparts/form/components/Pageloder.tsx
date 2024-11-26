import * as React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';


import styles from './Form.module.scss';

const PageLoader: React.FunctionComponent = () => {


  return (
    // <Stack tokens={stackTokens}>
     

      <div className={styles.pageLoader}>
        
        <Spinner label="still loading..." ariaLive="assertive"  size={SpinnerSize.large} />
      </div>
    // </Stack>
  );
};
export default PageLoader;
