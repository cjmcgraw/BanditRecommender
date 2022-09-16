# Bandit Multi Recommender

A Higher Order Component written in react, with a paired back end. This system is designed to allow quick
iterative AB testing over multiple different recommenders implemented in different ways.

## Why?

So at ATG we run into a common problem with our recommender systems. We come up with dozens, if not hundreds of
different types of recommenders. We want to always serve the recommender that is optimal, because it gives us the
highest profit boost. But determining what is optimal in a traditional AB test is difficult to say the least.

This repo is designed to allow multiple (dozens, hundreds, etc) of recommenders to be combined into a coherent
display for the user, track their interactions and update the weights of each recommender so that way we can
easily determine the most effective recommender in the shortest amount of time.

The architecture used is a bayesian AB testing strategy, treating each recommendation themself as a bandit, and
implementing the Multi-Armed bandits solution.
