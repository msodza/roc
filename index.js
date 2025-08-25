(function(){

    function *longestStreakAsAGenerator (grid, avoidRedundantPaths) {
        if (!grid) return [0, []];

        const rows = grid.length;
        const cols = grid[0].length;

        const directions = [
            [0, 1],     //right
            [1, 0],     //bottom
            [1, 1],     //diagonal, bottom & right
            [1, -1]     //diagonal, bottom & left
        ];
        const redundantPaths = [
            [0, -1],    //left --- this may be redundant as the forward movement would have taken care of this
            [-1, 0],    //top --- here too
            [-1, -1],   //diagonal, top & left --- and here
            [-1, 1],    //diagonal, top & right -- here too
        ];
        if (!avoidRedundantPaths) {
            directions.push (...redundantPaths);
        };
        console.log ("directions...", directions);

        let oldMax = 0;
        let longestPath = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                // console.log ("[%i, %i]", r, c, grid[r][c]);
                for (const move of directions) {
                    let maxDistance = 0;
                    let rr = r;
                    let cc = c;
                    const localPath = [{r, c}];
                    while (grid[rr][cc] === true) {
                        localPath.push ({r: rr, c: cc});
                        maxDistance++;
                        rr = rr + move[0];
                        cc = cc + move[1];
                        if ((rr < 0) ||(cc < 0) || (rr >= rows) || (cc >= cols)) {
                            break;
                        };
                        yield {r, c, rr, cc, maxDistance};
                    };

                    if (maxDistance > oldMax) {
                        oldMax = maxDistance;
                        longestPath = localPath;
                    };
        
                };
                
            };
        };

        return [oldMax, longestPath];
    };



    const onColor = "#fa0";
    const offColor = "aliceblue";
    const currentColor = "#a0f";

    function createKey (r, c) {
        return [r, c].join("-");
    };
    function createLabel (idx, cellSize) {
        const label = document.createElement("div");
        label.classList.add("grid-label");
        label.style.width =`${cellSize}px`;
        label.style.height =`${cellSize}px`;
        label.appendChild(document.createTextNode(""+idx));
        return label;
    }
    function buildGrid (grid, rows = 10, cols = 10, cellSize = 30) {
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        };

        // top label //
        const layer = document.createElement("div");
        layer.classList.add ("layer");
        grid.appendChild (layer);
        const empty = createLabel("-", cellSize);
        layer.appendChild (empty);
        new Array (cols).fill(0).forEach((_, idx)=>{
            const label = createLabel (idx, cellSize);
            layer.appendChild (label);
        });

        const cells = new Map();
        const cellValues = [];
        for (let r = 0; r < rows; r++) {
            const layer = document.createElement("div");
            layer.classList.add ("layer");
            const label = createLabel (r, cellSize);
            layer.appendChild (label);

            cellValues[r] = [];
            for (let c = 0; c < cols; c++) {
                const key = createKey (r, c);
                const cell = document.createElement("span");
                const value = cell.value = Math.random() >= 0.5? true : false;
                cell.style.width = `${cellSize}px`;
                cell.style.height= `${cellSize}px`;
                cell.classList.add ("cell");
                if (value) {
                    cell.style.backgroundColor = onColor;
                };
                cells.set (key, cell);
                cell.appendChild(document.createTextNode(value? "1" : "0"));
                layer.appendChild (cell);
                cellValues[r].push (value);
            };
            grid.appendChild(layer);
        };
        return [cells, cellValues];
    };

    window.addEventListener("DOMContentLoaded", function(){
        let generator;
        let running;
        const grid = document.getElementById("grid");
        const display = document.getElementById("console");
        const avoidRedundantSelector = document.getElementById("avoid-redundant");
        const speedSelector = document.getElementById("speed");
        const gridSelector = document.getElementById("grid-size");
        const output = document.getElementById("output");
        const play = document.getElementById("play");
        let [cells, cellValues] = buildGrid (grid);
        let speed = parseInt(speedSelector.value, 10);

        function draw () {
            const gridSize = parseInt(gridSelector.value, 10);
            [cells, cellValues] = buildGrid (grid, gridSize, gridSize);
            console.log ("drawing...", gridSize, typeof gridSize);
        };

        function clearAll () {
            cells.forEach(function(cell){
                cell.style.backgroundColor = cell.value? onColor : offColor;
                cell.style.border = "1px dotted #ddd";
            });
        };

        function applyHighlight (r, c, rr, cc) {
            clearAll ();
       
            const key = createKey (r, c);
            if (cells.has(key)) {
                cells.get(key).style.backgroundColor = currentColor;
            };
            
            const subKey = createKey (rr, cc);
            if (cells.has(subKey)) {
                cells.get(subKey).style.border = `1px solid ${currentColor}`;
            };
        };

        function applyMaxDistance (maxDistance, maxDistanceCells){
            clearAll ();
            output.innerText = `Max Distance is: ${maxDistance}`;
            maxDistanceCells.forEach(({r, c})=>{
                const key = createKey(r, c);
                if (cells.has(key)) {
                    cells.get(key).style.backgroundColor = currentColor;
                };
            });
            return setTimeout(function(){
                alert (`Max distance is ${maxDistance}`);
            }, 500);
        };

        function writeConsole (r, c, rr, cc, maxDistance) {
            const line = document.createElement("div");
            line.classList.add("line");
            const orientation = document.createElement("span");
            orientation.classList.add("command");
            orientation.appendChild(document.createTextNode("Command"));
            line.appendChild(orientation);
            const comment = document.createElement("span");
            comment.appendChild(document.createTextNode([
                "cell={" + r + "," + c + "}",
                "-->target={", + rr + "," + cc + "}",
                "distance={" + maxDistance + "}"
            ].join(" ")));
            line.appendChild(comment);
            display.appendChild(line);
            line.scrollIntoView({ block: "center", inline: "start"});
        };

        function callAndWait (generator) {
            const iterator = generator.next ();
            console.log ("iterator...:", iterator, speed);
            if (!iterator) {
                running = false;
                toggleAll (running);
                return;
            }
            if (!iterator.value) {
                running = false;
                toggleAll (running);
                return;
            }
            if (iterator.done) {
                running = false;
                toggleAll (running);
                const [maxDistance, maxDistanceCells] = iterator.value;
                return applyMaxDistance (maxDistance, maxDistanceCells);
            };

            running = true;
            const { r, c, rr, cc, maxDistance } = iterator.value;
            toggleAll (running);
            applyHighlight (r, c, rr, cc);
            writeConsole (r, c, rr, cc, maxDistance);
            return setTimeout(function(){
                callAndWait (generator);
            }, speed);
        };

        function toggleAll (running) {
            play.innerText = running? "Stop" : "Click to visualize";
            output.innerText = running? "Running..." : "";
            gridSelector.disabled = running;
            speedSelector.disabled = running;
            avoidRedundantSelector.disabled = running;
        };

        gridSelector.addEventListener("change", function(evt){
            draw ();
        });

        speedSelector.addEventListener("change", function(evt){
            speed = parseInt(speedSelector.value, 10);
        });

        play.addEventListener("click", function (evt){
            if (running) {
                clearAll ();
                toggleAll (false);
                return generator.return ();
            };

            console.log ("cellValues..:", cellValues);
            display.innerHTML = "";
            output.innerText = "";
            const avoidRedundant = Boolean(avoidRedundantSelector.checked);
            generator = longestStreakAsAGenerator (cellValues, avoidRedundant);
            callAndWait(generator);
        });

        draw ();
    });
})();