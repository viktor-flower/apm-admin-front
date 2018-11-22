import {ID, guid} from '@datorama/akita';

export interface Student {
  id: ID;
  name: string;
  sex: 'Male' | 'Female';
  standard: number;
  quarterlyScore: number;
  halfyearlyScore: number;
  annualScore: number;
}

export function createStudent({
  name = '',
  standard = null,
  sex = null,
  quarterlyScore = null,
  halfyearlyScore = null,
  annualScore = null
}: Partial<Student>): Student {
  return {
    halfyearlyScore,
    id: guid(),
    name,
    sex,
    standard,
    quarterlyScore,
    annualScore
  };
}
