#include <SDL.h>
#include "graphics.h"

SDL_Window* window = NULL;
SDL_Renderer* renderer = NULL;

void setcolor(int color){

    switch(color){

        case WHITE:
            SDL_SetRenderDrawColor(renderer,255,255,255,255);
            break;

        case RED:
            SDL_SetRenderDrawColor(renderer,255,0,0,255);
            break;

        case GREEN:
            SDL_SetRenderDrawColor(renderer,0,255,0,255);
            break;

        case YELLOW:
            SDL_SetRenderDrawColor(renderer,255,255,0,255);
            break;

        default:
            SDL_SetRenderDrawColor(renderer,255,255,255,255);
    }
}

void initgraph(){

    SDL_Init(SDL_INIT_VIDEO);

    window = SDL_CreateWindow(
        "Mini Turbo C",
        SDL_WINDOWPOS_CENTERED,
        SDL_WINDOWPOS_CENTERED,
        800,
        600,
        0
    );

    renderer = SDL_CreateRenderer(window,-1,0);

    SDL_SetRenderDrawColor(renderer,0,0,0,255);

    SDL_RenderClear(renderer);

    SDL_RenderPresent(renderer);
}

void line(int x1,int y1,int x2,int y2){

    SDL_RenderDrawLine(renderer,x1,y1,x2,y2);

    SDL_RenderPresent(renderer);
}

void rectangle(int x1,int y1,int x2,int y2){

    SDL_Rect rect;

    rect.x = x1;
    rect.y = y1;
    rect.w = x2 - x1;
    rect.h = y2 - y1;

    SDL_RenderDrawRect(renderer,&rect);

    SDL_RenderPresent(renderer);
}

void circle(int cx,int cy,int r){

    for(int angle=0; angle<360; angle++){

        double rad = angle * 3.14159 / 180;

        int x = cx + r*cos(rad);
        int y = cy + r*sin(rad);

        SDL_RenderDrawPoint(renderer,x,y);
    }

    SDL_RenderPresent(renderer);
}

void closegraph(){

    SDL_Delay(10000);

    SDL_DestroyRenderer(renderer);

    SDL_DestroyWindow(window);

    SDL_Quit();
}