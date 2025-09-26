import { Job, Rating } from "../generated/schema";
import { JobFunded, JobReleased, JobRefunded } from "../generated/Escrow/Escrow";
import { RatingGiven } from "../generated/Reputation/Reputation";

export function handleJobFunded(event: JobFunded): void {
  const id = event.params.jobId.toString();
  let job = new Job(id);
  job.client = event.params.client;
  job.freelancer = event.params.freelancer;
  job.amount = event.params.amount;
  job.status = "Funded";
  job.save();
}

export function handleJobReleased(event: JobReleased): void {
  const id = event.params.jobId.toString();
  let job = Job.load(id);
  if (job) {
    job.status = "Released";
    job.save();
  }
}

export function handleJobRefunded(event: JobRefunded): void {
  const id = event.params.jobId.toString();
  let job = Job.load(id);
  if (job) {
    job.status = "Refunded";
    job.save();
  }
}

export function handleRatingGiven(event: RatingGiven): void {
  const id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let r = new Rating(id);
  r.from = event.params.from;
  r.to = event.params.to;
  r.score = event.params.score;
  r.comment = event.params.comment;
  r.txHash = event.transaction.hash;
  r.save();
}
