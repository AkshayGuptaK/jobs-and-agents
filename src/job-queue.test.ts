import JobQueue from './job-queue';
import { createAgent, createJob, createJobRequest } from './factories';

const agentNoSkill = createAgent('dumbo');
const agentSomeSkill = createAgent('dave', ['bills-question']);
const agentSuperSkill = createAgent(
  'bond',
  ['rewards-question', 'trivia-question'],
  ['bills-question']
);

describe('Job Queue', () => {
  it('should return null if no job is available', () => {
    const queue = new JobQueue();
    queue.addAgent(agentSomeSkill);
    expect(queue.getJob(createJobRequest(agentSomeSkill))).toBeNull();
  });

  it('should return null if no agent has been added', () => {
    const queue = new JobQueue();
    queue.addJob(createJob('bills-question'));
    expect(queue.getJob(createJobRequest(agentSomeSkill))).toBeNull();
  });

  it('should return null if agent has no skillsets', () => {
    const queue = new JobQueue();
    queue.addAgent(agentNoSkill);
    queue.addJob(createJob('bills-question'));
    expect(queue.getJob(createJobRequest(agentNoSkill))).toBeNull();
  });

  it('should return null if no job matching agent skillsets is available', () => {
    const queue = new JobQueue();
    queue.addAgent(agentSomeSkill);
    queue.addJob(createJob('rewards-question'));
    expect(queue.getJob(createJobRequest(agentSomeSkill))).toBeNull();
  });

  it('should return the earlier queued job first', () => {
    const queue = new JobQueue();
    queue.addAgent(agentSuperSkill);
    queue.addJob(createJob('rewards-question'));
    queue.addJob(createJob('trivia-question'));
    expect(queue.getJob(createJobRequest(agentSuperSkill))?.type).toEqual(
      'rewards-question'
    );
  });

  it('should return the urgent job first', () => {
    const queue = new JobQueue();
    queue.addAgent(agentSuperSkill);
    queue.addJob(createJob('rewards-question'));
    queue.addJob(createJob('trivia-question', true));
    expect(queue.getJob(createJobRequest(agentSuperSkill))?.type).toEqual(
      'trivia-question'
    );
  });

  it('should return the job matching agent primary skillset first', () => {
    const queue = new JobQueue();
    queue.addAgent(agentSuperSkill);
    queue.addJob(createJob('bills-question', true));
    queue.addJob(createJob('rewards-question'));
    expect(queue.getJob(createJobRequest(agentSuperSkill))?.type).toEqual(
      'rewards-question'
    );
  });

  it('should return the job matching agent secondary skillset if none match primary skillset', () => {
    const queue = new JobQueue();
    queue.addAgent(agentSuperSkill);
    queue.addJob(createJob('features-question', true));
    queue.addJob(createJob('bills-question'));
    expect(queue.getJob(createJobRequest(agentSuperSkill))?.type).toEqual(
      'bills-question'
    );
  });
});
