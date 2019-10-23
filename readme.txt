Andrew Whelan
10/21/2019

URL Shortener
1.	A user should be able to load the index page of your site and be presented with an input field where they can enter a URL.
2.	Upon entering the URL, a "shortened" version of that url is created and shown to the user as a URL to the site you're building.
3.	When visiting that "shortened" version of the URL, the user is redirected to the original URL.
4.	Additionally, if a URL has already been shortened by the system, and it is entered a second time, the first shortened URL should be given back to the user.

Notes: I wrote this program using React with Webpack and Babel extensions. I attempted to write a program that would help skip the server requirements of URL shortening to complete it on my end. This did not get finished (I left the code in comments for looking at). I replaced this function with a call to TinyURL; another application I acquired through nodeJS. 

After user input, the program will first verify that it is in the proper format for a URL. Then it will make a simple get call to verify that the it is a valid address. On a status rating of 200, the program will call TinyURL to receive a shortened address. This address will be displayed on the UI as an active link. It will open to the original page address in a new window.


Direction:
- Enter a URL into the textfield (either type or copy/paste)
- Click on the "Shorten" button
- A shortened URL will appear that you can click on.

Test Cases:
I wrote 3 test cases: 
    - The first is normally strutured domain name.   
	- The second is a URL missing the HTTP (the program will replace it and run the program).
	- The third is missing the top-level domain name and will not continue the program.


* You may run across CORS on some sites. *

10/22/2019 6:00PM - rewrote validation checks. Added routing for short url.

10/22/2019 3:00 PM - Added a local server code for handling shortening (added to folder "server"). Removes the need for TinyURL.

10/21/2019 5:10 PM - Reverting to TinyUrl because jsonstore.io is too unstable.

10/21/2019 4:40 PM - Remove TinyUrl and build my own shortened generator using https://www.jsonstore.io/ as a temporary server.

10/21/2019 3:30 PM - Adding axios (https://www.npmjs.com/package/axios) to improve AJAX calls.

10/21/2019 2:55 PM -- Installed TinyURL (https://www.npmjs.com/package/tinyurl) to help set up the shortened URL system.

10/21/2019 12:05 PM -- This project will run with a React/Babel/Webpack environment. So just use "npm install" in your command line before you run this.


