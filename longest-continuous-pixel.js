

function printGrid (grid) {
    if (!grid) return;
    for(const row of grid) {
        for(const col of row) {
            const value = col? 1 : 0;
            process.stdout.write(value + "\t");
        };
        process.stdout.write("\n");
    };
};

function longestStreak (grid) {
    if (!grid) return 0;

    const rows = grid.length;
    const cols = grid[0].length;

    const directions = [
        [0, 1],     //right
        // [0, -1],    //left --- this may be redundant as the forward movement would have taken care of this
        // [-1, 0],    //top --- here too
        [1, 0],     //bottom
        // [-1, -1],   //diagonal, top & left --- and here
        [1, 1],     //diagonal, bottom & right
        // [-1, 1],    //diagonal, top & right -- here too
        [1, -1]     //diagonal, bottom & left
    ];

    const allDistances = [];
    let oldMax = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // console.log ("[%i, %i]", r, c, grid[r][c]);
            for (const move of directions) {
                let maxDistance = 0;
                let rr = r;
                let cc = c;
                while (grid[rr][cc] === true) {
                    maxDistance++;
                    rr = rr + move[0];
                    cc = cc + move[1];
                    if ((rr < 0) ||(cc < 0) || (rr >= rows) || (cc >= cols)) {
                        break;
                    };
                };

                if (maxDistance > oldMax) oldMax = maxDistance;
                if (maxDistance) {
                    allDistances.push ({ r, c, move, maxDistance});
                };
            };
            
        };
    };
    console.log ("allDistances > 0 is", allDistances.length);
    return oldMax;
};

(function main () {
    const grid0 = [
        [false, false, true,  true,  false, true, true, true, false, true],
        [false, false, false, true,  false, true, false, true, false, false],
        [false, false, true,  true,  false, false, false, false, false, false],
        [false, false, true,  false, false, true, false, true, false, true],
        [false, false, true,  true,  false, false, true, false, false, false],
        [false, false, false, false, false, true, false, true, false, true],
        [false, false, true,  true,  false, true, true, true, false, false],
        [false, false, true,  false, false, false, false, true, false, true],
        [false, false, true,  false, false, true, false, true, false, false],
        [false, false, true,  true,  false, true, false, false, false, false],
    ];
    const grid1 = [
        [false, false, true, true, false, true, true, true, false, true],
        [false, false, false, true, false, true, false, true, false, false],
        [false, false, true, true, false, false, false, false, false, false],
        [false, false, true, false, false, true, false, true, false, true],
        [false, false, true, true, false, false, true, false, false, false],
        [false, true, false, false, false, true, false, true, false, true],
        [false, false, true, true, false, true, true, false, false, false],
        [false, false, false, false, false, false, false, true, false, true],
        [false, false, true, false, false, true, false, true, false, false],
        [false, false, false, true, false, true, false, false, false, false],
    ];
    const diagonal = [
        [false, false, true, true, false, true, true, true, false, true],
        [false, false, false, true, false, true, false, true, false, false],
        [false, false, true, true, false, false, false, false, false, false],
        [false, false, true, false, false, true, false, true, false, true],
        [false, false, true, true, false, false, true, false, false, false],
        [false, true, false, false, false, true, false, true, false, true],
        [false, false, true, true, true, true, true, false, false, false],
        [false, false, false, true, false, false, false, true, false, true],
        [false, false, true, false, false, true, false, true, false, false],
        [false, false, false, true, false, true, false, false, false, false],
    ];
    const top2Bottom = [
        [false, false, true, true, false, true, true, true, false, true],
        [false, false, false, true, false, true, false, true, false, true],
        [false, false, true, true, false, false, false, false, false, true],
        [false, false, true, false, false, true, false, true, false, true],
        [false, false, true, true, false, false, true, false, false, true],
        [false, true, false, false, false, true, false, true, false, true],
        [false, false, true, true, true, true, true, false, false, true],
        [false, false, false, true, false, false, false, true, false, true],
        [false, false, true, false, false, true, false, true, false, true],
        [false, false, false, true, false, true, false, false, false, true],
    ];
    const left2RightDiagonal = [
        [false, false, true,  true,  false, true, true, true, false, true],
        [false, false, false, true,  false, true, false, true, false, false],
        [false, false, true,  true,  false, false, false, false, false, false],
        [false, false, true,  false, false, true, false, true, false, true],
        [false, false, true,  true,  false, false, true, false, false, false],
        [false, false, false, false, true, true, false, true, false, true],
        [false, false, true,  true,  false, true, true, true, false, false],
        [false, false, true,  false, false, false, true, true, false, true],
        [false, false, true,  false, false, true, false, true, false, false],
        [false, false, true,  true,  false, true, false, false, false, false],
    ];

    console.log ("Longest streak for this grid is: ", longestStreak (grid0));
    printGrid (grid0);

    console.log ("Longest streak for this grid is: ", longestStreak (grid1));
    printGrid (grid1);

    console.log ("Longest streak for this grid is: ", longestStreak (diagonal));
    printGrid (diagonal);

    console.log ("Longest streak for this grid is: ", longestStreak (top2Bottom));
    printGrid (top2Bottom);

    console.log ("Longest streak for this grid is: ", longestStreak (left2RightDiagonal));
    printGrid (left2RightDiagonal);
})();