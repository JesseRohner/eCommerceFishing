<div align="center">
  <img src="public/logo.png" alt="logo" width="300" height="auto" />

  <h1>PF Nexus Client</h1>
  
  <p>
    A platform that connects developers, advisors, investors and lenders in renewable energy & sustainable infrastructure
  </p>
  <!-- Badges -->
  <p>
    <a href="http://commitizen.github.io/cz-cli/">
      <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" />
    </a>
    <a href="https://www.cypress.io/">
      <img src="https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg" />
    </a>
    <a href="https://github.com/prettier/prettier/">
      <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat" />
    </a>
    <a href="http://storybook.js.org/">
      <img src="https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white&style=flat" />
    </a>

  </p>

  <h4>
    <a href="">View Demo</a>
    <span> · </span>
    <a href="">View Staging</a>
    <span> · </span>
    <a href="https://www.notion.so/pfnexus/Engineering-Wiki-23060bec3a854cf4b2cfd8afbfe620cd">View Engineering Notion Page</a>
    <span> · </span>
    <a href="https://www.notion.so/pfnexus/Engineering-How-To-s-820b42b7fe184b34b1e92e22b5d91bf6">Read Engineering How-to's</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->

## Table of Contents <!-- omit in toc -->

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Run Locally](#run-locally)
- [Running Tests](#running-tests)
- [Storybook](#storybook)
- [Git workflow](#git-workflow)
  - [Branching strategy](#branching-strategy)
  - [Git flow and GitHub PR's](#git-flow-and-github-prs)
  - [Commit message rules](#commit-message-rules)

<!-- TechStack -->

## Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://nextjs.org/">Next.js</a></li>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://react-query.tanstack.com/">react-query</a></li>
    <li><a href="https://formatjs.io/">react-intl</a></li>
    <li><a href="https://react-hook-form.com/">react-hook-form</a></li>
    <li><a href="http://zod.dev/">zod</a></li>
    <li><a href="http://storybook.js.org/">Storybook</a></li>
    <li><a href="https://tailwindcss.com/">TailwindCSS</a></li>
    <li><a href="http://jestjs.io/">Jest</a></li>
    <li><a href="http://cypress.io/">Cypress</a></li>
  </ul>
</details>

<details>
<summary>DevOps</summary>
  <ul>
    <li><a href="https://typicode.github.io/husky/">Husky</a></li>
    <li><a href="https://commitizen.github.io/cz-cli/">Commitlint</a></li>
    <li><a href="http://commitlint.js.org/">Commitizen</a></li>
  </ul>
</details>

<!-- Env Variables

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY` -->

<!-- Prerequisites -->

## Prerequisites

This project uses Yarn (< version 2) as package manager. If you try to run it with NPM it will throw a warning.

```bash
 npm install --global yarn
```

<!-- Run Locally -->

## Run Locally

Clone the project

```bash
  git clone https://github.com/pf-nexus/client
```

Go to the project directory

```bash
  cd ./client
```

Install dependencies

```bash
  yarn install
```

To start the dev (on [http://localhost:3000](http://localhost:3000)) server run:

```bash
  yarn dev
```

<!-- Running Tests -->

## Running Tests

To run unit tests, run the following command

```bash
  yarn test
```

To collect test coverage run

```bash
  yarn test:coverage
```

For Cypress end to end tests, run

```bash
  yarn test:e2e
```

<!-- Storybook -->

## Storybook

You can run Storybook locally with:

```bash
  yarn storybook
```

If you need to deploy Storybook to Chromatic, run the command

```bash
  yarn storybook:publish
```

<!-- Deployment -->

## Git workflow

### Branching strategy

This repo follows the git flow branching model, if you are new to it, below are 2 great introductory resources:

- [https://nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/)
- [https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

### Git flow and GitHub PR's

[gitflow](https://github.com/nvie/gitflow) is a great `git` utility that automates a good part of the commands you need to run when working in a git flow branching model repo. It is recommended but not required as its usage is limited and you can acheive the same goals with a couple of `git` commands.

One thing to keep in mind when using `git flow` commands - you should **never** run:

```bash
  git flow [feature/release/hotfix/support] end [branch name]
```

While this command follows perfectly the git flow workflow, it will automatically merge your branch into develop without opening a PR on GitHub for your changes to be reviewed. When you've finished your work, run `git push ...` to push to the main repository and open a PR.

### Commit message rules

We are using [commitlint](http://commitlint.js.org) and [commitizen](https://commitizen.github.io/cz-cli/) to keep our commit messages tidy and following a standard structure. These tools will be installed automatically as they are dev dependencies for this project.

To commit your changes with `commitizen` you need to run:

```bash
  yarn commit
```

You can also use the default `git commit -m ...` if you remember to follow the rules from the default config of `commitizen`. If the commit message does not meet the requirements from `commitizen`, it will throw an error and you won't be able to commit.
