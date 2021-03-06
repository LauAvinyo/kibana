/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { useState, useEffect } from 'react';

import { Pipeline } from '../../../../../common/types';
import { useFormContext } from '../../../../shared_imports';
import { PipelineTestFlyout, PipelineTestFlyoutProps } from './pipeline_test_flyout';

type Props = Omit<PipelineTestFlyoutProps, 'pipeline' | 'isPipelineValid'>;

export const PipelineTestFlyoutProvider: React.FunctionComponent<Props> = ({ closeFlyout }) => {
  const form = useFormContext();
  const [formData, setFormData] = useState<Pipeline>({} as Pipeline);
  const [isFormDataValid, setIsFormDataValid] = useState<boolean>(false);

  useEffect(() => {
    const subscription = form.subscribe(async ({ isValid, validate, data }) => {
      const isFormValid = isValid ?? (await validate());
      if (isFormValid) {
        setFormData(data.format() as Pipeline);
      }
      setIsFormDataValid(isFormValid);
    });

    return subscription.unsubscribe;
  }, [form]);

  return (
    <PipelineTestFlyout
      pipeline={formData}
      closeFlyout={closeFlyout}
      isPipelineValid={isFormDataValid}
    />
  );
};
