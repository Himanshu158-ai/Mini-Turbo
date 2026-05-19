#ifndef GRAPHICS_H
#define GRAPHICS_H

#define WHITE 1
#define RED 2
#define GREEN 3
#define YELLOW 4

void initgraph();
void closegraph();

void setcolor(int color);

void line(int x1,int y1,int x2,int y2);

void rectangle(int x1,int y1,int x2,int y2);

void circle(int x,int y,int r);

#endif