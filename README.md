# cgpt_scale-weights-and-measures
React app with OpenAI REST endpoints

#### Weights and Measures scaling using OpenAI API using a React UI popup component - Demo

Caution - this is just a demo - there is practically no error checking ! Some of the config is hardcoded (I will get to it sometine !).

This is a simple/toy REST service in Node.js and Express using OpenAI API for converting and scaling weights and measures (it can be used for other purposes with a few changes). It is rendered using a React UI compoment.

You will need Node.js and npm

Get OpenAI API key (check References towards the end). Copy `.env.example` to `.env` and add the API key there.

Do an `npm install` and run with `npm start`. This will start a local REST service on port 4000 and a react web UI on port 3000.

The React web UI can be accessed on a browser by going to `http://localhost:3000`.

It should be possible to test some weights and measures scaling REST endpoint with something like:

`http://localhost:4000/scaleWeightsAndMeasures?quantity=20&fromUnit=ounces&toUnit=milliliters&scaleFactor=2`

from a browser. 

OR

`curl 'http://localhost:4000/scaleWeightsAndMeasures?quantity=20&fromUnit=ounces&toUnit=milliliters&scaleFactor=2'`

from commandline.

It will comeup with an answer like:

`{"scaledValue":"Answer: 40 ounces is equal to 1136.5225 milliliters"}`

Experiment with training data and question !

---
#### References
1. [OpenAI quickstart](https://platform.openai.com/docs/quickstart)
2. [Express Node introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)
3. [Imperial units](https://en.wikipedia.org/wiki/Imperial_units)
4. [React tutorial](https://reactjs.org/tutorial/tutorial.html)

