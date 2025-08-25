#include <iostream>
#include <vector>
#include <stdlib.h>

struct direction_t {
    int r;
    int c;
};


int find_longest_streak (const std::vector<bool>& grid, int r_max, int c_max) {
    int max_distance = 0;
    std::vector<direction_t> directions = {
        {0, 1},     //move right
        {0, -1},    //move left
        {-1, 0},    //top
        {1, 0},     //bottom
        {-1, -1},   //diagonal, top & left
        {1, 1},     //diagonal, bottom & right
        {-1, 1},    //diagonal, top & right
        {1, -1}     //diagonal, bottom & left
    };
    int rr = 0;
    int cc = 0;
    for (int r = 0; r < r_max; r++) {
        for (int c = 0; c < c_max; c++) {
            for (int dir = 0; dir < directions.size(); dir++) {
                direction_t move = directions[dir];
                rr = r;
                cc = c;
                int local_max_distance = 0;
                while (grid[rr * c_max + cc]) {
                    local_max_distance++;
                    rr += move.r;
                    cc += move.c;
                    if ((rr < 0) ||(cc < 0) || (rr >= r_max) || (cc >= c_max)) {
                        break;
                    };
                };
                if (local_max_distance > max_distance) {
                    max_distance = local_max_distance;
                };
            };
            
        };
    };

    return max_distance;
};

void print_grid (const std::vector<bool>& grid, int r_max, int c_max) {
    for(int r = 0; r < r_max; r++) {
        for(int c = 0; c < c_max; c++) {
            std::cout << (grid[r * c_max + c]? "1" : "0") << "\t";
        };
        std::cout << "\n";
    };
};

int main () {
    int r_max = 10;
    int c_max = 10;
    std::vector<bool> grid0 = {
        false, false, true,  true,  false, true, true, true, false, true,
        false, false, false, true,  false, true, false, true, false, false,
        false, false, true,  true,  false, false, false, false, false, false,
        false, false, true,  false, false, true, false, true, false, true,
        false, false, true,  true,  false, false, true, false, false, false,
        false, false, false, false, false, true, false, true, false, true,
        false, false, true,  true,  false, true, true, true, false, false,
        false, false, true,  false, false, false, false, true, false, true,
        false, false, true,  false, false, true, false, true, false, false,
        false, false, true,  true,  false, true, false, false, false, false,
    };
    std::vector<bool> grid1 = {
        false, false, true, true, false, true, true, true, false, true,
        false, false, false, true, false, true, false, true, false, false,
        false, false, true, true, false, false, false, false, false, false,
        false, false, true, false, false, true, false, true, false, true,
        false, false, true, true, false, false, true, false, false, false,
        false, true, false, false, false, true, false, true, false, true,
        false, false, true, true, false, true, true, false, false, false,
        false, false, false, false, false, false, false, true, false, true,
        false, false, true, false, false, true, false, true, false, false,
        false, false, false, true, false, true, false, false, false, false,
    };
    std::vector<bool> diagonal = {
        false, false, true, true, false, true, true, true, false, true,
        false, false, false, true, false, true, false, true, false, false,
        false, false, true, true, false, false, false, false, false, false,
        false, false, true, false, false, true, false, true, false, true,
        false, false, true, true, false, false, true, false, false, false,
        false, true, false, false, false, true, false, true, false, true,
        false, false, true, true, true, true, true, false, false, false,
        false, false, false, true, false, false, false, true, false, true,
        false, false, true, false, false, true, false, true, false, false,
        false, false, false, true, false, true, false, false, false, false,
    };
    std::vector<bool> top2Bottom = {
        false, false, true, true, false, true, true, true, false, true,
        false, false, false, true, false, true, false, true, false, true,
        false, false, true, true, false, false, false, false, false, true,
        false, false, true, false, false, true, false, true, false, true,
        false, false, true, true, false, false, true, false, false, true,
        false, true, false, false, false, true, false, true, false, true,
        false, false, true, true, true, true, true, false, false, true,
        false, false, false, true, false, false, false, true, false, true,
        false, false, true, false, false, true, false, true, false, true,
        false, false, false, true, false, true, false, false, false, true,
    };
    std::vector<bool> left2RightDiagonal = {
        false, false, true,  true,  false, true, true, true, false, true,
        false, false, false, true,  false, true, false, true, false, false,
        false, false, true,  true,  false, false, false, false, false, false,
        false, false, true,  false, false, true, false, true, false, true,
        false, false, true,  true,  false, false, true, false, false, false,
        false, false, false, false, true, true, false, true, false, true,
        false, false, true,  true,  false, true, true, true, false, false,
        false, false, true,  false, false, false, true, true, false, true,
        false, false, true,  false, false, true, false, true, false, false,
        false, false, true,  true,  false, true, false, false, false, false,
    };
    
    std::cout << "Longest continuous distance (grid0) {" << find_longest_streak(grid0, r_max, c_max) << "}\n";
    print_grid (grid0, r_max, c_max);

    std::cout << "Longest continuous distance (grid1) {" << find_longest_streak(grid1, r_max, c_max) << "}\n";
    print_grid (grid1, r_max, c_max);

    std::cout << "Longest continuous distance (diagonal) {" << find_longest_streak(diagonal, r_max, c_max) << "}\n";
    print_grid (diagonal, r_max, c_max);

    std::cout << "Longest continuous distance (top2Bottom) {" << find_longest_streak(top2Bottom, r_max, c_max) << "}\n";
    print_grid (top2Bottom, r_max, c_max);

    std::cout << "Longest continuous distance (left2RightDiagonal) {" << find_longest_streak(left2RightDiagonal, r_max, c_max) << "}\n";
    print_grid (left2RightDiagonal, r_max, c_max);

    return  0;
};