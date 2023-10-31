
export async function listJobs(req, res, next) {
  res.json([]);
}

export async function createJob(req, res, next) {
  res.send('ok');
}

export async function getJob(req, res, next) {
  res.send({ title: "a samle title", body: "this is a job" })
}

export async function updateJob(req, res, next) {
  res.send('ok');
}

export async function deleteJob(req, res, next) {
  res.send('ok');
}

