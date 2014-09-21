ownCloud Photo Upload App
======
The ownCloud Photo Upload app is an application for Firefox OS. Like other FxOS apps, it’s essentially a JavaScript web app.The app uses Angular to handle routing and data binding.

What it does
---
The app currently allows you to input a username, a password, and an installation location (e.g.`http://myservername.com/owncloud`). This information is saved locally in IndexedDB, but it may be cleared by clearing browser storage or reloading the application in the simulator or WebIDE.

If login information has been entered, pressing “upload” will send all of the marked photos to the specified ownCloud server.

What it doesn’t do
---
The app does not currently include video or other media besides common picture types, and it does not upload automatically when new photographs are taken. There is currently an *upload* branch for developing automatic uploads.

Setup
---
To work on the project, you will need to have a development environment for Firefox OS set up. You might wish to use the [App Manager](https://developer.mozilla.org/en-US/Firefox_OS/Using_the_App_Manager).

Configuration
---
For testing purposes, you will need to create a local directory called "gaia" for the Firefox OS to read from. (This is a temporary workaround to avoid the app cycling through every photograph in your local Pictures directory.)

* **If testing on an FxOS mobile device:** create a “gaia”directory within the phone or tablet’s photo storage area.
* **If using the simulator on a computer:** create the “gaia” directory inside your default photo directory. 

You will also need to create a "gaia" folder in the ownCloud server's "photos" directory to "catch" the uploaded photos.

WebDAV
--
The app currently uses custom-built code to handle WebDAV requests,creating low-level requests with XMLHttpRequest to send and retrieve data. The WebDAV services included in this project make extensive use of $q, Angular’s promises service, but could be easily (I hope!) adapted to use any other library that complies with the Promises/A+ specification.

Tests
--
The app currently uses Karma and Jasmine for unit tests. The unit test coverage isn't great, and some of the tests are probably are frivolous. I'd like to improve unit test coverage in addition to adding E2E testing.

Contact
--
I (Lyndsey) started this project as part of my internship with GNOME's Outreach Program for Women. Feel free to get in touch if you have any questions!
* [Lyndsey Jane Moulds](lyndseyjane.com)
* [apophenia on Github](https://www.github.com/apophenia)
* [lyyyndseyyy on twitter](twitter.com/lyyyndseyyy)

Thanks
--
Thanks to [Alessandro](https://www.github.com/cosenal), [Jan](https://www.github.com/jancborchardt), [Joshua](https://www.github.com/joshua-s), and [Bernhard](https://www.github.com/raydiation) for their guidance!
