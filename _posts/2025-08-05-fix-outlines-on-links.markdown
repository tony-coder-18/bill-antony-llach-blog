---
layout: single
title:  "Why Outlines in links are not showing up when tabbing to it"
date:   2025-08-05
categories: "web-development"
---
Having outlines when the user tabs to an interactive element is very important to make websites #a11y (accessible).

This especially important for links.

At work, I had this task where I needed to add focus outlines on a link block (card).

It was a strange situation because the outlines were actually set in the element.

```
a:focus-visible {
    outline: 2px solid Highlight;
}
```

Still, the outlines didn't show up when focusing by keyboard.

After inspecting and googling, I discovered the issue.

Parent element with `overflow: hidden`.

## How to solve

Simply do

`overflow: visible` 

on THAT parent element ✅