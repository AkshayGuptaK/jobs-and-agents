# jobs-and-agents

A problem involving assigning jobs to differently skilled agents using a job queue.

A _job_ is any task that needs to get done. It has a unique id, a type which denotes the category of that job, and an urgency (boolean) flag indicating whether that job has a high priority.

An _agent_ is someone that performs a job. They also have a unique id and two disjoint skill sets: primary and secondary. Skill sets are a simple list of job types that an agent is allowed to perform.

The core operation of the job queue is the dequeue function, which, given a pool of jobs to be done and agent's job request, and a set of priority rules, returns the fittest job to be performed by that agent. The dequeue function abides to these rules:

- The list of jobs passed in is ordered by the time the they have entered the system.
- Jobs that arrived first are assigned first, unless it has a "urgent" flag, in which case it has a higher priority.
- A job is not assigned to more than one agent at a time.
- An agent is not handed a job whose type is not among its skill sets.
- An agent only receives a job whose type is contained among its secondary skill set if no job from its primary skill set is available.

A job is considered to be done when the agent it was assigned to requests a new job.

An input.json is read in via stdin and the results are produced to output.json
