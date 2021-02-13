import { v4 as uuid } from 'uuid';
import { Agent, Job, JobSpecification } from './types';

export function createJob(type: string, urgent = false): Job {
  return {
    id: uuid(),
    type,
    urgent,
  };
}

export function createAgent(skills: JobSpecification, name = ''): Agent {
  return {
    id: uuid(),
    name,
    ...skills,
  };
}
