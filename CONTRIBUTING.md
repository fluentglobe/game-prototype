## Discussions and Workstream
When working on the libraries keep all discussions in the issue tracker under the relevant issue.

If you need Henrik to clarify or resolve something put `Decision Needed` tag on the issue or pull request.

To decide what to work on next look for issues with tags `Ready for Implementation` in the
[Fluent issue tracker](https://github.com/fluentglobe/fluent-play/issues).

### Installation Dependencies
Before you can contribute to Fluent Play, you'll need to install or configure the following dependencies on your machine:

* Git - control version system ([GitHub installing guide](http://help.github.com/mac-git-installation))
* [Node.js](http://nodejs.org/), usually we use the latest version of Node.js, but it's always better to check the current version in the [package.json](https://github.com/fluentglobe/fluent-play/blob/master/package.json).
* Install GitFlow

### Working with source code

* Clone the main [Fluent Play repository](https://github.com/fluentglobe/fluent-play.git)

```
git clone git@github.com:fluentglobe/fluent-play.git
```

* Go to project repository
```
cd fluent-play
```

* Enable [GitFlow](http://danielkummer.github.io/git-flow-cheatsheet/) for the repository (just first time) 
```
 git flow init
```

* Make a feature branch for your changes named with issue number and topic
```
 git flow feature start 105-labyrinth-navigation
```


* Install ```npm``` dependencies
```
npm install
```

* Make some code changes and run the tests to make sure your code passed required tests:
```
npm test
```

### Submitting Your Changes


* Make sure your changes passed the tests:
```
npm test
npm run cover-test
```

* Commit your changes with a descriptive commit message, please describe what you have done as detailed as possible
```
git add -A
git commit
```

* Push your branch to Github:
```
git push origin feature/105-labyrinth-navigation
```

* Create a [pull request](https://help.github.com/articles/creating-a-pull-request)

* Once your patch is reviewed and merged, please delete your branch and pull both yours and master's changes from the main (upstream - [Fluent Play](https://github.com/fluentglobe/fluent-play.git)) repository:

## Git Commit Guidelines

These rules are adopted from the [AngularJS commit conventions][commit-message-format].

Git commit messages will need to be formatted in a certain format.  This is so
that we can generate a changelog from the git commit messages.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Examples:
```
feat(http): add `connect.compress()` middleware to the stack
```
```
docs(docs): typo fix
```
```
feat(websockets): add transport `engineio`

More efficient engine.io replced socket.io
```
```
fix(http): use blue ink instead of red ink

BREAKING CHANGE: `http` now uses blue ink instead of red.

To migrate, change your code from the following:

`http.start('blue')`

To:

`http.start('red')`
```

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on github as well as in various git tools.

### Type
Is recommended to be one of these (only **feat** and **fix** show up in the `CHANGELOG.md`):

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug or adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

### Scope
The scope could be anything specifying the place of the commit change. For example `cli`,
`http`, `publish`, `session`, `websocket`, `request` etc...

### Subject
The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

###Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes"
The body should include the motivation for the change and contrast this with previous behavior.

###Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.


A detailed explanation can be found in this [AngularJS commit conventions document][commit-message-format].
