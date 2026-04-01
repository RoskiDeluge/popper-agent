# Design

## Intent

The purpose of this change is to lock the initial `pppr` effort to a disciplined scope. The design question is not "how much of `pi` can be kept?" The design question is "what is the smallest durable agent harness we can define while preserving the ideas that made `pi` compelling?"

## Core stance

`pppr` should selectively reuse `pi` internals and should not inherit `pi`'s broader product surface by default.

That means the spec should bias toward:

- preserving narrow interfaces
- preserving user-visible behavior
- preserving observability

And it should resist:

- carrying over optional UX/product layers just because they already exist
- introducing abstractions motivated primarily by future host runtimes
- treating compatibility with every current `pi` feature as success criteria

## Minimal architecture boundary

The spec should define `pppr` as two closely related layers:

- a harness core responsible for model interaction, tool execution, context loading, and session/event state
- a CLI surface responsible for user interaction and streaming output

This keeps the design simple while leaving a clean seam for future embedding in other operator-controlled runtimes.

## Why CLI-first matters

The CLI is not just one delivery channel among many. For `pppr`, it is the primary operational environment and the place where the simplicity thesis is easiest to preserve.

CLI-first implies:

- the terminal remains the native environment rather than something to abstract away
- shell outputs stay visible
- long-running or advanced workflows should prefer external host tools like `tmux` over built-in process orchestration

## Why future runtimes are deferred

The custom Rust shell and Tauri terminal matter strategically, but making them central in v1 would create premature architectural pressure:

- transport abstractions may become more general than needed
- event models may become overdesigned before the core is proven
- product decisions may optimize for embedding before the standalone harness is coherent

The better constraint is simpler: build a stable core and CLI now, then let future runtimes adapt to that seam.
