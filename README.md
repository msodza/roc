## Finding the Longest Continuous Distance from a Pixel in a Grid

Over the weekend, I revisited the problem we discussed on Friday and worked out a more complete solution. Since I no longer had access to the original link, I reconstructed the problem from memory and added a few improvements:

- **Movement directions**: Defined a container holding all possible moves (up, down, left, right, and diagonals if applicable) from any pixel.
- **Bounds checking**: Ensured each computed pixel position is valid before attempting access.
- **Iteration over steps**: Iterated through possible durations/steps in a given direction.
- **Directional traversal**: Continued iterating in a chosen direction until no further "on" pixels were found.

### C++ Implementation  

To build and execute the C++ version on Linux, ensure `g++` is installed, then run:

```bash
g++ -o main longest-continuous-pixel.cc && ./main
```  

### JavaScript Implementation with Visualization  

A JavaScript version is also provided with a simple visualization. To run it:  

1. Open the included [index.html](index.html) file in any modern browser.  
2. Refresh the page to regenerate a new grid and re-run the visualization.  

![Visualization](./images/Screenshot-1.png "Screenshot")

![Visualization](./images/Screencast-1.webm "Screencast")
<iframe width="560" height="315" src="./images/Screencast-0.webm" frameborder="0" allowfullscreen/>

<video width="320" height="240" controls>
  <source src="./images/Screencast-0.webm" type="video/webm">
</video>

[![alt text](./images/Screenshot-1.png)](./images/Screencast-0.webm)