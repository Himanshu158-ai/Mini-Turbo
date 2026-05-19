#include <SDL.h>
#include "graphics.h"

SDL_Window* window = NULL;
SDL_Renderer* renderer = NULL;

void initgraph() {

    SDL_Init(SDL_INIT_VIDEO);

    window = SDL_CreateWindow(
        "Mini Turbo C",
        SDL_WINDOWPOS_CENTERED,
        SDL_WINDOWPOS_CENTERED,
        800,
        600,
        0
    );

    renderer = SDL_CreateRenderer(window, -1, 0);

    SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255);

    SDL_RenderClear(renderer);

    SDL_RenderPresent(renderer);
}

void putpixel(int x, int y, int color) {

    SDL_SetRenderDrawColor(renderer,255,255,255,255);

    SDL_RenderDrawPoint(renderer,x,y);

    SDL_RenderPresent(renderer);
}

void line(int x1, int y1, int x2, int y2) {

    SDL_SetRenderDrawColor(renderer,255,255,255,255);

    SDL_RenderDrawLine(renderer,x1,y1,x2,y2);

    SDL_RenderPresent(renderer);

    SDL_Delay(5000);
}
void closegraph() {

    SDL_Delay(5000);

    SDL_DestroyRenderer(renderer);

    SDL_DestroyWindow(window);

    SDL_Quit();
}