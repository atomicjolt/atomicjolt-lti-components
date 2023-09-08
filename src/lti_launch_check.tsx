import React, { useEffect, useState } from 'react';
import { ltiLaunch } from '@atomicjolt/lti-client';
import type { LaunchSettings } from '@atomicjolt/lti-client/types';

type LtiLaunchCheckProps = {
  children: React.ReactNode;
  stateValidation: LaunchSettings
};

const LtiLaunchCheck: React.FC<LtiLaunchCheckProps> = (props) => {
  const { children, stateValidation } = props;
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { stateVerified } = stateValidation;

  useEffect(() => {
    const launch = async () => {
      const v = await ltiLaunch(stateValidation);
      setIsValid(v);
    };
    if (stateVerified !== true) {
      launch();
    }
  }, [stateValidation]);

  if (isValid === true || stateVerified === true) {
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
