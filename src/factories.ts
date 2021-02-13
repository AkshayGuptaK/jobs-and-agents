import { v4 as uuid } from 'uuid';
import { Agent, Job, JobRequest } from './types';

export function createJob(type: string, urgent = false): Job {
  return {
    id: uuid(),
    type,
    urgent,
  };
}

export function createAgent(
  name = '',
  primary_skillset: string[] = [],
  secondary_skillset: string[] = []
): Agent {
  return {
    id: uuid(),
    name,
    primary_skillset,
    secondary_skillset,
  };
}

export function createJobRequest(agent: Agent): JobRequest {
  return {
    agent_id: agent.id,
  };
}
