import { Agent, Job, JobRequest } from './types';

export default class JobQueue {
  private jobs: Job[] = [];
  private urgentJobs: Job[] = [];
  private agents: Record<Agent['id'], Agent> = {};

  public addJob(job: Job): void {
    job.urgent ? this.urgentJobs.push(job) : this.jobs.push(job);
  }

  public addAgent(agent: Agent): void {
    this.agents[agent.id] = agent;
  }

  private searchJobList(skillSet: string[], jobList: Job[]): Job | null {
    const jobIndex = jobList.findIndex((job) => skillSet.includes(job.type));
    if (jobIndex >= 0) {
      return jobList.splice(jobIndex, 1)[0];
    }
    return null;
  }

  public getJob(request: JobRequest): Job | null {
    const agent = this.agents[request.agent_id];
    if (agent == null) return null;
    return (
      this.searchJobList(agent.primary_skillset, this.urgentJobs) ||
      this.searchJobList(agent.primary_skillset, this.jobs) ||
      this.searchJobList(agent.secondary_skillset, this.urgentJobs) ||
      this.searchJobList(agent.secondary_skillset, this.jobs)
    );
  }
}
