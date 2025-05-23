import { expect, test } from 'vitest'

import { filterByName } from '../helpers';
import patients from './__mocks__/patients.json';
import patientResponse from './__mocks__/patient_response.json';

test('filter by partial lowercase query string finds full capitalized name', () => {
  const queryString = 'coll'
  expect(filterByName(queryString, patients)).toEqual(patientResponse)
})
