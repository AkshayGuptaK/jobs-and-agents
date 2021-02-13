export interface Job {
  id: string;
  type: string;
  urgent: boolean;
}

export interface Agent {
  id: string;
  name: string;
  primarySkillset: string[];
  secondarySkillset: string[];
}

export interface JobRequest {
  agentId: Agent['id'];
}

export interface FulfilledJobRequest extends JobRequest {
  jobId: Job['id'];
}
