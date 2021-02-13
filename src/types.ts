export interface Job {
  id: string;
  type: string;
  urgent: boolean;
}

export interface Agent {
  id: string;
  name: string;
  primary_skillset: string[];
  secondary_skillset: string[];
}

export interface JobRequest {
  agent_id: Agent['id'];
}

export interface FulfilledJobRequest extends JobRequest {
  job_id: Job['id'];
}

export interface Comparable<T> {
  isBefore(item: T): boolean;
}
