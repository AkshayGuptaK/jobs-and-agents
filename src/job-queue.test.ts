import JobQueue from './job-queue';
import { createJob } from './factories';
import { JobSpecification } from './types';

const emptySpecification: JobSpecification = {
  primarySkillset: [],
  secondarySkillset: [],
};

const unskilledSpecification: JobSpecification = {
  primarySkillset: ['bills-question'],
  secondarySkillset: [],
};

const skilledSpecification: JobSpecification = {
  primarySkillset: ['rewards-question', 'trivia-question'],
  secondarySkillset: ['bills-question'],
};

describe('Job Queue', () => {
  it('should return null if no job is available', () => {
    const queue = new JobQueue();
    expect(queue.assignJob(unskilledSpecification)).toBeNull();
  });

  it('should return null if specification contains no skillsets', () => {
    const queue = new JobQueue();
    queue.add(createJob('bills-question'));
    expect(queue.assignJob(emptySpecification)).toBeNull();
  });

  it('should return null if no job matching specification is available', () => {
    const queue = new JobQueue();
    queue.add(createJob('rewards-question'));
    expect(queue.assignJob(unskilledSpecification)).toBeNull();
  });

  it('should return the earlier queued job first', () => {
    const queue = new JobQueue();
    queue.add(createJob('rewards-question'));
    queue.add(createJob('trivia-question'));
    expect(queue.assignJob(skilledSpecification)?.type).toEqual(
      'rewards-question'
    );
  });

  it('should return the urgent job first', () => {
    const queue = new JobQueue();
    queue.add(createJob('rewards-question'));
    queue.add(createJob('trivia-question', true));
    expect(queue.assignJob(skilledSpecification)?.type).toEqual(
      'trivia-question'
    );
  });

  it('should return the job matching primary skillset first', () => {
    const queue = new JobQueue();
    queue.add(createJob('bills-question', true));
    queue.add(createJob('rewards-question'));
    expect(queue.assignJob(skilledSpecification)?.type).toEqual(
      'rewards-question'
    );
  });
});
