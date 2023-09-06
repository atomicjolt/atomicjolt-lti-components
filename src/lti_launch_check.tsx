import React, { useEffect, useState } from 'react';
import { ltiLaunch } from '@atomicjolt/lti-client';
import type { LaunchSettings } from '@atomicjolt/lti-client';

type LtiLaunchCheckProps = {
  children: React.ReactNode;
  stateValidation: LaunchSettings
};

const LtiLaunchCheck: React.FC<LtiLaunchCheckProps> = (props) => {
  const { children, stateValidation } = props;
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    console.log('in use effect');
    const launch = async () => {
      const v = await ltiLaunch(stateValidation);
      console.log('setting valid to ', v);
      setIsValid(v);
    };
    launch();
  }, [stateValidation]);

  console.log('stateValidation', stateValidation);
  console.log('isValid', isValid);

  if (isValid === true) {
    return <>{children}</>;
  }

  if (isValid === false) {
    return (
      <div>
        Invalid request. Please reload the page.
      </div>
    );
  }

  return null;
};

export default LtiLaunchCheck;
