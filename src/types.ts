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

interface JobAssignment extends JobRequest {
  readonly job_id: Job['id'];
}

export interface FulfilledJobRequest {
  job_assigned: JobAssignment;
}

interface newAgentCommand {
  new_agent: Agent;
}

interface newJobCommand {
  new_job: Job;
}

interface newJobRequestCommand {
  job_request: JobRequest;
}

export type Command = newAgentCommand | newJobCommand | newJobRequestCommand;
