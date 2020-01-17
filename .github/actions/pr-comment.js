// GITHUB_EVENT_PATH always exists when run by an Action,
// see https://git.io/JvUf7 for a full list
const eventPayload = require(process.env.GITHUB_EVENT_PATH);
const { Octokit } = require("@octokit/action");

createPrComment();

async function createPrComment() {
  const octokit = new Octokit();

  // See https://developer.github.com/v3/issues/comments/#create-a-comment
  const { data } = await octokit.request(
    "POST /repos/:repository/issues/:pr_number/comments",
    {
      repository: process.env.GITHUB_REPOSITORY,
      pr_number: eventPayload.pull_request.number,
      body: "Thank you for your pull request!"
    }
  );

  console.log("Comment created: %d", data.html_url);
}
