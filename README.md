<!-- #Top -->
# Project #2: Flashcard - MERN Stack
Simple flashcard web application. My first MERN stack project.

## Table of Contents
- [Project Background](#project-background)
- [Status](#status)
- [Built with](#built-with)
- [Features](#project-background)
- [Known Issues and Bugs](#known-issues-and-bugs)
- [Points for improvement](#points-for-improvement)
- [License](#License)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)
- [What I learned](#what-i-learned)



## Project Background

**Problem:**

The problem I aimed to address with this project was my lack of practical experience in developing MERN stack applications. Also, although I had completed some coding tutorials and had the basic knowledge of the technology, I felt that I needed to reinforce my understanding of it by creating a functional app that I could use myself.

 **Objectives:**
 
To tackle these problems, I decided to build a flashcard web application using the MERN stack to not only test my skills but also provide a useful tool for my own learning.

<p align="right">(<a href="#top">Back to top</a>)</p>


## Status
The project has been deployed. View [the live site](https://qramming.netlify.app/).

Note: The registration function has been disabled as this flashcard app is built for my personal use. However, if you're interested in viewing it, please contact me (Sho) at coding.zamurai@gmail.com. I can give you temporary login information for demo purposes.


<p align="right">(<a href="#top">Back to top</a>)</p>

## Built with
**Runtime:**
- Node.js: 16.13.0

**Frontend:**
- Axios: 1.2.1
- React: 18.2.0
- React Icons: 4.6.0
- React Redux: 8.0.5
- React Toastify: 9.1.1
- Redux Toolkit: 1.9.1
 
**Backend:**
- Bcrypt: 5.1.0
- Body Parser: 1.20.0
- Cors: 2.8.5
- Dotenv: 6.0.2
- Express: 4.18.1
- JSON Web Token: 8.5.1
- Mongoose: 6.6.1

<p align="right">(<a href="#top">Back to top</a>)</p>

## Features
- Full CRUD operations 
- User registration 
- Log in to view the user-specific protected routes
- Two dropdown lists to filter cards
- Card flip animation
- The Card is displayed at random
- Responsive layouts

- Inspirational quotes before login

<p align="right">(<a href="#top">Back to top</a>)</p>

## Known Issues and Bugs

None at the moment.


<p align="right">(<a href="#top">Back to top</a>)</p>

## Points for improvement
- [ ] Refactoring/Make the code DRY.
- [ ] The Flashcard component currently re-renders twice when new card data arrives. Reduce it to once.
- [ ] The app sometimes picks up the same card in a row as it depends on a randomly generated number.
- [ ] The dropdown lists, which are created with select and option tags, look different on Mac and Windows. It would be better if they are replaced with some custom ones.

<p align="right">(<a href="#top">Back to top</a>)</p>

## License
MIT License

Copyright (c) 2023 Sho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


<p align="right">(<a href="#top">Back to top</a>)</p>

## Contact
Sho at coding.zamurai@gmail.com

:octocat: [GitHub](https://github.com/User-Sho) | :bird: [Twitter](https://twitter.com/CodingZamurai)

<p align="right">(<a href="#top">Back to top</a>)</p>


## Acknowledgments
To complete this project, I referred to various online resources, such as the tutorials on Youtube, the experts on Stack Overflow, the web docs on W3Schools/MDN, and more.

Of all the resources, I'm most thankful for Traversy Media and Net Ninja for the tutorilas listed below:

1) [Learn The MERN Stack](https://www.youtube.com/playlist?list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm) by Traversy Media

2) [MERN Stack Crash Course Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE) by The Net Ninja

For the card flip animation, I referred to:
1) [How To Build A Flashcard Quiz With React](https://www.youtube.com/watch?v=hEtZ040fsD8) by Web Dev Simplified

Many thanks to all the other experts out there for helpful information and tutorials!

<p align="right">(<a href="#top">Back to top</a>)</p>


## What I learned
- How data generated by a user flow from the frontend to the backend, and vice versa.
- Basics of redux, axios, and JWT.
- How to protect user-specific routes.
- Folder structure when using redux.
- GET request with a query using axios.

<p align="right">(<a href="#top">Back to top</a>)</p>
