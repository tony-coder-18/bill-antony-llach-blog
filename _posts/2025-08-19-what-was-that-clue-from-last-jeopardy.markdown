---
layout: single
title:  "What was that clue from last Jeopardy!"
date:   2025-09-26
categories: "projects"
---

Link to check the project live:
[What was that clue from last Jeopardy! Live Site](https://jeopardy-clue-finder.vercel.app)

## Problem to Solve
When I started working at my current company, it was the first time I was in the US.

However, as a kid born in the western world, I “knew” about American culture from TV, movies, songs, and the closest-to-true source: the Web.

But as I started working at the company, I began to understand a lot of things about American culture that I’d never seen before, one of the most relevant being Jeopardy!.

I came to know about Jeopardy! one day between November and December of 2023, due to a very cool – if not the coolest – person I used to work with. She was right next to me, although being from another department (we have an open office type of office in our company), and one of those days of autumn she asked me something about Jeopardy! or made a reference to it, I don't quite remember. Anyways, after hearing that word, I was utterly confused.

Then I asked her what “Jeopardy!” was, and she kindly pointed out it was a TV show about people answering questions!?!?. Obviously, I was more confused than certain.

I went to Google immediately and started looking for information about it, and then it turned out it’s one of the most popular shows in the history of television in the States! 
“How did I not know about this before?” I asked myself, and probably she (but she was too kind to point it out aloud).

All of this to say that I got obsessed with Jeopardy! and started to watch it most of my evenings on the LIRR (Long Island Railroad) as my commute was ridiculously lengthy – a story for another post.

We started talking about Jeopardy! with this coworker almost every morning, we talked about last night’s answers and questions, about our favorite participants, about the participants with the most annoying voice, etc.

But there was this weird issue that kept happening to me again and again which was that sometimes I wanted to ask her about a question but I didn’t remember exactly how it went, so for the most of the time I was rambling about it so that she could know what I was talking about.

For most of the time, she (after a minute or two) knew what question I was talking about, but this was a pain in my opinion.

Time passed by and the coworker left the company, but I still was very fond of Jeopardy!, so I kept thinking about this and decided to do something about it (although I didn’t have anyone to talk about Jeopardy! anymore lol).

## The Solution

I decided to build and app where I could input whatever I remembered about the question I was thinking about from last Jeopardy (and only the last one) and the app will output the actual question so I can talk about it.

This app has very simple functionality:

Input: Things in natural language about the Jeopardy question -> Output: The actual Jeopardy question

## The Stack (Nerd Stuff)

I decided to use a very simple and already familiar stack:
- Frontend
  - React JS
  - Next JS
  - Tailwind CSS
- Backend
  - Node JS
  - Express JS
  - Google Gemini API

I decided for Next JS on the frontend just for the sake of getting experience in it, this could have been done with vainilla Javascript.

I decided for Node and Express because I already worked on projects with this and I was familiar with it.

I decided on Google's Gemini API (instead of ChatGPTs) because it was the easier to integrate. I tried doing it with Chat GPT's API but it was being very difficult to work with for me.

## The Development

You can check all the code in the Github repo: 
[Jeopardy App Github Repo](https://github.com/tony-coder-18/What-was-that-Jeopardy-clue-from-last-night)

And again, to check it live: 
[What was that clue from last Jeopardy! Live Site](https://jeopardy-clue-finder.vercel.app)

--- 

Dedicated to my cool work neighbor and all [Jeopardy](https://www.jeopardy.com/watch) fans out there.

S.D.G.