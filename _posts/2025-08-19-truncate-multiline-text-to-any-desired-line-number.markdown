---
layout: single
title:  "How to Truncate a text to any line height with ellipsis"
date:   2025-08-19
categories: "web-development CSS"
---
## The problem
At my job, I needed to make sure a panel title didn't go over 3 lines of height, and if the text content was greater than that, it should have an ellipsis at the end (the "...").

## The solution
This can now be easily done with pure CSS, no JavaScript needed.

This is the CSS code template:

```
.truncated-text {
  --number-of-lines-wanted: 3;
    
  display: -webkit-box;
  -webkit-line-clamp: var(--number-of-lines-wanted);
  -webkit-box-orient: vertical;  
}
```

Hope you find it useful!

S.D.G.

## Further reference and sources to dive deep into this
- [Great article about it from CSS tricks](https://css-tricks.com/line-clampin/#aa-the-standardized-way)   