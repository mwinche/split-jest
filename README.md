This project was made to repoduce an issue I'm seeing with
using the Split.io JavaScript client inside the Jest testing
environment.

This repo was made from the latest create-react-app and if you
check the history you will see I have done nothing other than
bring in the Split library and set it up to have multiple clients
(one for each traffic type).

If (after cloning the repo and running `yarn`) you run
`yarn start` you will see the library running as expected in localhost
mode in your browser, returning `control` treatments.

However, if you run `yarn test` (and then hit `a` to run all tests)
you will see the error `Shared Client not supported by the storage mechanism. Create isolated instances instead.`

This error occurs when the Split storage instance lacks a `shared`
method
(https://github.com/splitio/javascript-client/blob/2193c1c717f4c2e1089fddb2dfbe1e264c796c79/src/index.js#L74)
which it does have in the browser environment but not in node.

Essentially (as far as I can tell) this error happens because Jest
doesn't run an actual browser but rather simulates one (via js-dom),
which Split identifies as node.

Given that Jest is a very popular testing tool for React development
it would seem prudent for the Split library to be flexible in handling
such a situation and allow browser SDK to be run inside the Jest
environment.

However, the issue is further complicated because it could also be very
desirable to use Jest for testing NodeJS applications (which may or may
not use React) that leverage Split. In these cases, the current behavior
is correct.

It is my belief that the key to getting this right is to key off of
Jest's `testEnvironment` setting
(https://jestjs.io/docs/en/configuration#testenvironment-string)
in order to determine where the Split JavaScript SDK should behave
like a browser SDK or a node SDK. In the case where it is set to
`js-dom` it ought to serve the browser SDK, otherwise it should serve the node SDK. That said, in all honesty, I'm not
exactly sure how this would be done.
