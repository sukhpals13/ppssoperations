# Ionic 4 Full App
The most advanced and complete Mobile & PWA starter app template

# Documentation
You can find the documentation in https://ionic-4-full-starter-app-docs.ionicthemes.com

## Install dependencies
Run `npm install` to install the project dependencies.

## Development Workflow
Run `ionic build` or `ionic build --prod` to build the project
Run `ionic serve` to start a live-reload dev server

## Android Platform
Run `ionic cordova prepare android` to add the iOS platform to the project
After this run `ionic cordova build android`
Read more in https://ionicframework.com/docs/building/android
For running the android app in Android device `https://www.kingoapp.com/root-tutorials/how-to-enable-usb-debugging-mode-on-android.htm`


## iOS Platform
Run `ionic cordova prepare ios` to add the iOS platform to the project
After this run `ionic cordova build ios`
Read more in https://ionicframework.com/docs/building/ios

## PWA
Run `ionic build --prod` to add the Android platform to the project
Read more in https://ionicframework.com/docs/publishing/progressive-web-app

## Support
Drop us a line to contact@ionicthemes.com

## Acknowledgements
This template uses some icons inspired in [Flaticon](https://www.flaticon.com/). If you want to use the original icons in your app, please make sure you grab a new license that fit your use case when modifying this template.
We currently use the `Free for commercial use WITH ATTRIBUTION` license in this template as a way to showcase and promote the awesome work and [designs by **catkuro** from Flaticon](https://www.flaticon.com/packs/home-decor).

### Committing code
To ensure code quality, we follow and enforce the [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)
These guidelines define a Commit Message Format and certain rules that will help teams achieve consistency with version control and source code management practices.

#### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples: (even more [samples](https://github.com/angular/angular/commits/master))

```
docs(changelog): update changelog to beta.5
```
```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

#### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

#### Type
Must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

#### Scope
The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages.

The following is the list of supported scopes:

* **walkthrough-page**
* **login-page**
* **preload-image-component**

There are currently a few exceptions:

* **packaging**: used for changes that change the npm package layout in all of our packages, e.g.
  public path changes, package.json changes done to all packages, d.ts file/format changes, changes
  to bundles, etc.
* **changelog**: used for updating the release notes in CHANGELOG.md
* none/empty string: useful for `style`, `test` and `refactor` changes that are done across all
  packages (e.g. `style: add missing semicolons`) and for docs changes that are not related to a
  specific package (e.g. `docs: fix typo in tutorial`).

#### Subject
The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

#### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.


## Troubleshooting
### See what dependencies and versions you have installed in your project
This is useful to track compilation ERRORS

- Run `npm ls` to list all installed packages
- To find the installed version of a specific package run `npm list package_name` (ex: `npm list @ionic/core`)
- To find out which packages need to be updated, you can use `npm outdated -g --depth=0`
- In particular, run `ng version` to output Angular CLI version and all Angular related installed packages and versions
