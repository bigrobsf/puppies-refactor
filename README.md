## Refactoring to Best Practices

Since this server is among the first you've built, it's pretty unlikely that you've followed all the best practices. That's great news, because it gives us a chance to learn about best practices and *refactor* our application to follow them.

Not only that, but because we're "refactoring" not "adding features" or "changing functionality" the same tests can be used to ensure our code continues to work!

## Getting Started

We want to refactor this simple application to follow the Model View Controller pattern. For us this means plucking  pieces of functionality from `app.js` and spreading them across multiple files. Specifically we want files for the Models, Views, and Controllers (which we'll call routes).

This pattern is __very__ common. So common in fact there are tools to generate a skeleton application that follows these conventions. Do this:

```
npm install -g express-generator
cd ..
express puppies-refactor
cd puppies-refactor
atom .
```

Notice the file structure:

```
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade
```

The generator made one file we don't actually need, users.js. So let's fix that:

```
rm routes/users.js
```

This is almost complete, we're going to add one more folder for `models`.

```
mkdir models
touch models/puppy.js
```

### Model

Create a Puppy `class` in `puppy.js`. You can use either the ES6 `class` syntax, or the older `function Puppy()` tactic for creating the class.

Any time a Puppy is created, your code should create that object using `new Puppy(name, age)`. Furthermore, use `module.exports` and `require` to export this class anywhere that you need to use it.

In addition to the Puppy class, this file should create and export the array that holds all the puppies. Because this is a reference type, we can `require` the array anywhere it needs to be used.

### View

All of your `EJS` or `Jade/pug` files should live in the `views` folder. This is probably the part that requires the least amount of change in your app. It's very important though, that none of your HTML files live in the `public` directory.

### Controller

All of our "controllers" are going to be `express.Router` instances. We're going to have 2 such routers. index.js contain the routes for:

* `/`
* `/about`
* `/contact`

We're going to make a second controller (`touch routes/puppies.js`). In this file you'll need to create and export a new `express.Router` (look at `index.js` for an example). Then, in `app.js` you'll need to `require` and __register__ the routes. Again, look how `index.js` is handled in `app.js` for an example of this. Your puppies router should handle the routes for:

* `/puppies`
* `/puppies/new`
* `/puppies/:id`

Hopefully you noticed a pattern in these routes...

You can either create the new folder structure in a branch in the same folder -- or copy code from your existing puppies folder into the new folder we just created (`puppies-refactor`). I recommend the __first__ option, but if you choose the second option please make a new github repo so that you can submit the refactored solution.

Happy refactoring!
