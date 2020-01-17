const github = require('@actions/github');
const core = require('@actions/core');
const {hasGif} = require('./utils');

async function run() {
	const githubToken = core.getInput('github_token', {required: true});
	const rejectedLabel = core.getInput('label', {required: true});
	const strictMode = core.getInput('strictMode') === 'true';

	const octokit = new github.GitHub(githubToken);
	const {pull_request: pr} = github.context.payload;

	if (!pr) {
		throw new Error('Missing Pull Request event data');
	}

	const existingLabels = pr.labels.map(label => label.name);
	const hasGifInBody = hasGif(pr.body);

	if (hasGifInBody && !existingLabels.includes(rejectedLabel)) {
		core.info('Pull Request body has gif, all is well');
		return;
	}

	const newLabels = hasGifInBody ?
		existingLabels.filter(label => label !== rejectedLabel) :
		existingLabels.concat(rejectedLabel);

	const message = hasGifInBody ?
		'Removing rejected label from Pull Request' :
		'Updating Pull Request with rejected label';

	core.info(message);
	const params = {
		owner: github.context.repo.owner,
		repo: github.context.repo.repo,
		// eslint-disable-next-line camelcase
		issue_number: pr.number,
		labels: newLabels
	};

	await octokit.issues.update(params);

	if (!hasGifInBody && strictMode) {
		core.setFailed('Pull Request body does not contain a gif');
	}
}

run();
