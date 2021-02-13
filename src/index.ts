import JobQueue from './job-queue';
import fs from 'fs';
import { Command, FulfilledJobRequest } from './types';

const queue = new JobQueue();

function executeCommand(command: Command): FulfilledJobRequest | null {
  const [task, data] = Object.entries(command)[0];
  switch (task) {
    case 'new_agent':
      queue.addAgent(data);
      return null;
    case 'new_job':
      queue.addJob(data);
      return null;
    case 'job_request':
      const job = queue.getJob(data);
      return job ? { job_assigned: { job_id: job.id, ...data } } : null;
    default:
      return null;
  }
}

const commands = JSON.parse(
  fs.readFileSync('data/input.json').toString()
) as Command[];
const result = commands.map(executeCommand).filter((val) => val != null);
fs.writeFileSync('data/output.json', JSON.stringify(result));
