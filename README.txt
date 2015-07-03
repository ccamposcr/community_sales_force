# amex.gcp-digitas SalesForce desktop website layouts
 
This project was built using npm, gulp and less. Desktop layouts only.

## npm: 
You can get npm from here: https://www.npmjs.com/
It will help you install gulp and less and all of their required components from the internet.
First, install npm on your workstation. Then install all components by opening a cmd window to the root of your project folder and typing 

"npm install".


## Less:
The Less compiler will convert the .less files into css and place the resulting files in "/styles/styles.css".
For more info about Less, please refer to: http://lesscss.org
This styles.css file is used in SalesForce to control the styles of all GCP layouts.


## Gulp: 
Gulp is used to automate the Less compiler, and also build a package of files for distribution, if necessary.
To auto-compile your less, open a cmd window to your project and enter the command 

"gulp watch".

To build a package of files, simple use the command:

"gulp dist" 

and all your files (excluding Less files) will be compiled and copied to a "dist" folder within your project folder.


## JavaScript Libraries

The following JS libraries are in use on this project:

* jQuery - industry standard library for manipulating HTML page elements 

* FlexSlider - a jQuery-based sliding carousel, used on the GCP homepage

* SlickSelect - a custom library for manipulating the visual look of drop-down menus. Stylable HTML elements are created to represent the (now hidden) <select> elements.  User input on these HTML elements causes SlickSelect to modify the state of the original, hidden <select> elements.

