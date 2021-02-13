export interface Job {
  readonly id: string;
  readonly type: string;
  readonly urgent: boolean;
}

export interface Agent {
  readonly id: string;
  readonly name: string;
  primary_skillset: string[];
  secondary_skillset: string[];
}

export interface JobRequest {
  readonly agent_id: Agent['id'];
}

export interface FulfilledJobRequest extends JobRequest {
  readonly job_id: Job['id'];
}
