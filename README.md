[![Build Status](https://travis-ci.org/mickelindahl/model_ui_component.svg?branch=master)](https://travis-ci.org/mickelindahl/model_ui_component)
[![Coverage Status](https://coveralls.io/repos/github/mickelindahl/model_ui_component/badge.svg?branch=master)](https://coveralls.io/github/mickelindahl/model_ui_component?branch=master)

# Model ui component
Simple library for working with models in the client, syncing with backend and
viewing

## Methods

<a name="Model"></a>

## Model
**Kind**: global class  

* [Model](#Model)
    * [new Model()](#new_Model_new)
    * [.row()](#Model+row) ⇒ <code>object</code>

<a name="new_Model_new"></a>

### new Model()
Model that holds data from a single row in a database table. It knowshow to create, update, fetch and delete it self. With painters objectsone can defined how a each element in a row should be rendered- `options`  - `id` {string} Model identifier  - `data` {string} Model data  - `url` {url} Model url for POST, PUT, GET and DELETE  - `painters` {object} Three types of painters    - `callback` {array}      - `[].name` {string} Store output under this key      - `[].value(data)` {callback} Function to render painter output        - `data` {object} model data object    - `plain` {array}      - `[]` {string} Data key to use, stored under same name    - `template` {array]      - `[].name` {string} Store output under this key      - `[].value` {string} Template for handlebars where `data` will be input params at compilation

<a name="Model+row"></a>

### model.row() ⇒ <code>object</code>
Crate and object with data as it should should be displayed in html.The composition of the object is set py a set of painters objects actingupon the model data

**Kind**: instance method of <code>[Model](#Model)</code>  
## Test
`npm run-script test-local`

For manual test run
```
node lib/test/manual/index.js
```
Then open `lib/test/manual/html/index.html` in a browser

## Contributing
In lieu of a formal styleguide, take care to maintain the
existing coding style. Add unit tests for any new or changed
functionality. Lint and test your code.

## Release History